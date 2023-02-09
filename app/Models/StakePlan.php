<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StakePlan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title'];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['rates', 'wallet'];

    /**
     * Related StakeRate
     *
     * @return HasMany
     */
    public function rates()
    {
        return $this->hasMany(StakeRate::class, 'plan_id', 'id');
    }

    /**
     * Related Wallet
     *
     * @return BelongsTo
     */
    public function wallet()
    {
        return $this->belongsTo(Wallet::class, 'wallet_id', 'id');
    }

    /**
     * Related Stakes
     *
     * @return HasMany
     */
    public function stakes()
    {
        return $this->hasMany(Stake::class, 'plan_id', 'id');
    }
}
