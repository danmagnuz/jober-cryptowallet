<?php

namespace App\Console\Commands;

use App\Models\PeerTrade;
use Illuminate\Console\Command;

class CancelPeerTrades extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'peer-trades:cancel';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cancel expired peer trades';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        PeerTrade::inProgress()
            ->whereNull('confirmed_at')->lazyById()
            ->each(function (PeerTrade $trade) {
                $this->process($trade);
            });
    }

    /**
     * Process action
     *
     * @param PeerTrade $trade
     * @return void
     */
    protected function process(PeerTrade $trade)
    {
        $trade->acquireLock(function (PeerTrade $trade) {
            if ($trade->shouldAutoCancel()) {
                return $trade->cancel();
            }
        });
    }
}
