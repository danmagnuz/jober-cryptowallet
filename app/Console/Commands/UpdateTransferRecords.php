<?php

namespace App\Console\Commands;

use App\CoinAdapters\Resources\Transaction;
use App\Models\TransferRecord;
use Exception;
use Illuminate\Console\Command;

class UpdateTransferRecords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transfer-records:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update transfer records confirmations';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return void
     * @throws Exception
     */
    public function handle()
    {
        TransferRecord::has('walletTransaction')
            ->unconfirmed()->lazyById()
            ->each(function (TransferRecord $record) {
                $this->process($record);
            });
    }

    /**
     * Process TransferRecord
     *
     * @param TransferRecord $record
     * @return void
     * @throws Exception
     */
    protected function process(TransferRecord $record)
    {
        $coin = $record->walletAccount->wallet->coin;
        $hash = $record->walletTransaction->hash;
        $resource = $record->walletAccount->wallet->resource;

        $transaction = rescue(function () use ($coin, $resource, $hash) {
            return $coin->adapter->getTransaction($resource, $hash);
        }, null, false);

        if ($transaction instanceof Transaction) {
            $coin->saveTransactionResource($transaction);
        }
    }
}
