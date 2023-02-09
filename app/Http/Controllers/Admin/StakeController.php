<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\StakeResource;
use App\Models\Stake;
use App\Models\User;
use App\Models\WalletAccount;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class StakeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('permission:manage_stakes');
    }

    /**
     * Get paginated Stake
     *
     * @return AnonymousResourceCollection
     */
    public function paginate(Request $request)
    {
        $query = Stake::query()->latest();

        $this->applyFilters($query, $request);

        return StakeResource::collection($query->autoPaginate());
    }

    /**
     * Get statistics
     *
     * @return array
     */
    public function getStatistics()
    {
        $query = Stake::query();

        return [
            "holding"  => $query->clone()->whereStatus("holding")->count(),
            "redeemed" => $query->clone()->whereStatus("redeemed")->count(),
            "pending"  => $query->clone()->whereStatus("pending")->count(),
            "all"      => $query->clone()->count(),
        ];
    }

    /**
     * Redeem Stake
     *
     * @param Stake $stake
     * @return JsonResource
     */
    public function redeem(Stake $stake)
    {
        return $stake->acquireLockOrAbort(function (Stake $stake) {
            $this->authorize('redeem', $stake);

            $operator = $this->getOperator($stake->walletAccount->user);
            $operatorAccount = $stake->walletAccount->wallet->getAccount($operator);

            return $operatorAccount->acquireLockOrAbort(function (WalletAccount $operatorAccount) use ($stake) {
                $yield = $stake->getYieldObject();

                if ($operatorAccount->getAvailableObject()->lessThan($yield)) {
                    return abort(422, trans('wallet.insufficient_available'));
                }

                return DB::transaction(function () use ($operatorAccount, $stake, $yield) {
                    $stake->update(['status' => 'redeemed']);

                    $description = trans('wallet.stake_redemption');
                    $stake->walletAccount->credit($yield, $description);
                    $operatorAccount->debit($yield, $description);

                    return StakeResource::make($stake);
                });
            });
        });
    }

    /**
     * Get operator
     *
     * @param User $user
     * @return User
     */
    protected function getOperator(User $user)
    {
        return tap(User::stakingOperator(), function ($operator) use ($user) {
            if (!$operator instanceof User) {
                return abort(403, trans('common.operator_unavailable'));
            }

            if ($user->is($operator)) {
                return abort(403, trans('common.operator_cannot_trade'));
            }
        });
    }

    /**
     * Apply query filters
     *
     * @param $query
     * @param Request $request
     * @return void
     */
    protected function applyFilters($query, Request $request)
    {
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }
    }
}
