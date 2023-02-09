<?php

namespace App\Http\Resources;

use App\Models\Stake;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

/**
 * @mixin Stake
 */
class StakeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request)
    {
        if (is_null($this->resource)) {
            return parent::toArray($request);
        }

        return [
            'id'              => $this->id,
            'status'          => $this->status,
            'value'           => $this->value,
            'yield'           => $this->yield,
            'days'            => $this->days,
            'annual_rate'     => $this->annual_rate,
            'rate'            => $this->rate,
            'plan'            => StakePlanResource::make($this->whenLoaded('plan')),
            'wallet_account'  => WalletAccountResource::make($this->whenLoaded('walletAccount')),
            'coin'            => CoinResource::make($this->whenAppended('coin')),
            'redemption_date' => $this->redemption_date,
            'created_at'      => $this->created_at,
            'updated_at'      => $this->updated_at,
        ];
    }
}
