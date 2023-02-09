<?php

namespace App\Policies;

use App\Models\Stake;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class StakePolicy
{
    use HandlesAuthorization;

    /**
     * Check if stake can be redeemed.
     *
     * @param User $user
     * @param Stake $stake
     * @return bool
     */
    public function redeem(User $user, Stake $stake): bool
    {
        return $stake->status === "pending";
    }
}
