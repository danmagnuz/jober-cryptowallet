<?php

namespace App\Http\Controllers;

use App\Http\Resources\StakeResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class StakeController extends Controller
{
    /**
     * Get paginated records
     *
     * @return AnonymousResourceCollection
     */
    public function paginate(Request $request)
    {
        $query = Auth::user()->stakes()->latest();

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
        $query = Auth::user()->stakes();

        return [
            "holding"  => $query->clone()->whereStatus("holding")->count(),
            "redeemed" => $query->clone()->whereStatus("redeemed")->count(),
            "pending"  => $query->clone()->whereStatus("pending")->count(),
            "all"      => $query->clone()->count(),
        ];
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
