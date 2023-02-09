<?php

namespace App\Models;

use App\Helpers\CoinFormatter;
use App\Models\Traits\Cache;
use App\Models\Traits\Lock;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Stake extends Model
{
    use HasFactory, Lock, Cache;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['status'];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['plan', 'walletAccount'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'redemption_date' => 'date',
        'days'            => 'float',
        'rate'            => 'float',
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'status' => 'holding',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['coin', 'annual_rate'];

    /**
     * Cast value as coin object
     *
     * @param $amount
     * @param bool $convert
     * @return CoinFormatter
     */
    protected function castCoin($amount, bool $convert = false): CoinFormatter
    {
        return coin($amount, $this->walletAccount->wallet->coin, $convert);
    }

    /**
     * Get value object
     *
     * @return CoinFormatter
     */
    public function getValueObject()
    {
        return $this->remember("value_object", function () {
            return $this->castCoin($this->getAttributeFromArray('value'));
        });
    }

    /**
     * Get value attribute
     *
     * @return Attribute
     */
    protected function value(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->getValueObject()->getValue(),
            set: fn(CoinFormatter $value) => $value->getAmount()
        );
    }

    /**
     * Get yield object
     *
     * @return CoinFormatter
     */
    public function getYieldObject()
    {
        return $this->remember("yield_object", function () {
            return $this->castCoin($this->getAttributeFromArray('yield'));
        });
    }

    /**
     * Get yield attribute
     *
     * @return Attribute
     */
    protected function yield(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->getYieldObject()->getValue(),
            set: fn(CoinFormatter $value) => $value->getAmount()
        );
    }

    /**
     * Get coin attribute
     *
     * @return Coin
     */
    protected function getCoinAttribute()
    {
        return $this->walletAccount->wallet->coin;
    }

    /**
     * Calculate annual rate
     *
     * @return Attribute
     */
    protected function annualRate(): Attribute
    {
        return Attribute::get(function ($value, $attributes) {
            return round(365 * $attributes['rate'] / $attributes['days'], 2);
        });
    }

    /**
     * Related WalletAccount
     *
     * @return BelongsTo
     */
    public function walletAccount()
    {
        return $this->belongsTo(WalletAccount::class, 'wallet_account_id', 'id');
    }

    /**
     * Related StakePlan
     *
     * @return BelongsTo
     */
    public function plan()
    {
        return $this->belongsTo(StakePlan::class, 'plan_id', 'id');
    }
}
