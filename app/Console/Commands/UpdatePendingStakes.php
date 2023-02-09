<?php

namespace App\Console\Commands;

use App\Models\Stake;
use Illuminate\Console\Command;

class UpdatePendingStakes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stakes:update-pending';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update stake subscription to pending when due';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        Stake::whereStatus('holding')
            ->oldest()->lazyById()
            ->each(function (Stake $stake) {
                $this->process($stake);
            });
    }

    /**
     * Process Stake
     *
     * @param Stake $stake
     * @return void
     */
    protected function process(Stake $stake)
    {
        $stake->acquireLock(function (Stake $stake) {
            if ($stake->redemption_date->isBefore(now())) {
                $stake->update(['status' => 'pending']);
            }
        });
    }
}
