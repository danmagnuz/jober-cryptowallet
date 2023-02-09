<?php

use App\Helpers\CoinFormatter;
use App\Helpers\Settings;
use App\Helpers\ValueStore;
use App\Models\Coin;
use App\Models\SupportedCurrency;
use App\Models\User;
use App\Rules\ValidateRecaptcha;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Relations\Relation;

if (!function_exists('valueStore')) {
    /**
     * Get the value store
     *
     * @param null $key
     * @param null $default
     * @return ValueStore|mixed
     */
    function valueStore($key = null, $default = null)
    {
        if ($key === null) {
            return app(ValueStore::class);
        }

        return app(ValueStore::class)->get($key, $default);
    }
}

if (!function_exists('studlyWords')) {
    /**
     * Convert to studly words
     *
     * @param $value
     * @return string
     */
    function studlyWords($value)
    {
        return ucwords(str_replace(['-', '_'], ' ', $value));
    }
}

if (!function_exists('getSmsChannel')) {
    /**
     * Get default sms channel
     *
     * @return mixed
     */
    function getSmsChannel()
    {
        $provider = config('notifications.defaults.sms');

        return config("notifications.drivers.sms.$provider.channel", 'vonage');
    }
}

if (!function_exists('settings')) {
    /**
     * Get the settings store
     *
     * @return Settings
     */
    function settings()
    {
        return app(Settings::class);
    }
}

if (!function_exists('defaultCurrency')) {
    /**
     * Get default currency
     *
     * @return string
     */
    function defaultCurrency()
    {
        return Cache::remember('system.defaultCurrency', 10, function () {
            $currency = SupportedCurrency::default()->first();

            return !$currency ? 'USD' : strtoupper($currency->code);
        });
    }
}

if (!function_exists('user')) {
    /**
     * Get the current authenticated user
     *
     * @return User|Authenticatable|null
     */
    function user()
    {
        return Auth::user();
    }
}

if (!function_exists('coin')) {
    /**
     * Instance of coin formatter class.
     *
     * @param $amount
     * @param Coin $coin
     * @param bool $convertToBase
     * @return CoinFormatter
     */
    function coin($amount, Coin $coin, bool $convertToBase = false)
    {
        return new CoinFormatter($amount, $coin, $convertToBase);
    }
}

if (!function_exists('getRecaptchaRules')) {
    /**
     * Get recaptcha rules
     *
     * @return mixed
     */
    function getRecaptchaRules(): array
    {
        return [
            Rule::requiredIf(function () {
                return (bool) config('services.recaptcha.enable');
            }),
            new ValidateRecaptcha,
        ];
    }
}

if (!function_exists('getLocales')) {
    /**
     * Get locales
     *
     * @return Collection
     */
    function getLocales(): Collection
    {
        return collect(config('locales'))
            ->map(function ($data, $locale) {
                [, $region] = explode('_', $data['regional']);

                return [
                    'name'   => $data['name'],
                    'region' => strtolower($region),
                    'native' => $data['native'],
                    'locale' => $locale,
                ];
            });
    }
}

if (!function_exists('sortByOrder')) {
    /**
     * Sort keys by order
     *
     * @param array $array
     * @param array $order
     * @return array
     */
    function sortByOrder(array $array, array $order)
    {
        return array_filter(array_replace(array_fill_keys($order, null), $array));
    }
}

if (!function_exists('parseDate')) {
    /**
     * Parse date from string
     *
     * @param $value
     * @return DateTime|false
     */
    function parseDate($value)
    {
        return DateTime::createFromFormat("Y-m-d\TH:i", $value);
    }
}

if (!function_exists('parseBool')) {
    /**
     * Parse boolean value
     *
     * @param $value
     * @return bool|mixed
     */
    function parseBool($value)
    {
        return in_array($value, ['true', 'false']) ? boolval($value) : $value;
    }
}

if (!function_exists('filterColumn')) {
    /**
     * Filter query by value
     *
     * @param $column
     * @param $operator
     * @param $value
     * @param Builder|Relation $query
     * @return Builder|Relation
     */
    function filterColumn($column, $operator, $value, $query)
    {
        if (!is_null($value)) {
            if (is_array($value)) {
                switch ($operator) {
                    case 'notIn':
                        return $query->whereNotIn($column, $value);
                    case 'in':
                        return $query->whereIn($column, $value);
                }
            }

            if (is_string($value)) {
                if ($date = parseDate($value)) {
                    switch ($operator) {
                        case 'is':
                            return $query->whereDate($column, '=', $date);
                        case 'not':
                            return $query->whereDate($column, '<>', $date);
                        case 'after':
                            return $query->whereDate($column, '>', $date);
                        case 'onOrAfter':
                            return $query->whereDate($column, '>=', $date);
                        case 'before':
                            return $query->whereDate($column, '<', $date);
                        case 'onOrBefore':
                            return $query->whereDate($column, '<=', $date);
                    }
                } else {
                    switch ($operator) {
                        case 'is':
                            return $query->where($column, '=', parseBool($value));
                        case 'not':
                            return $query->where($column, '<>', parseBool($value));
                    }

                    switch ($operator) {
                        case 'equals':
                            return $query->where($column, $value);
                        case 'contains':
                            return $query->where($column, 'like', "%$value%");
                        case 'startsWith':
                            return $query->where($column, 'like', "$value%");
                        case 'endsWith':
                            return $query->where($column, 'like', "%$value");
                    }

                    switch ($operator) {
                        case '=':
                        case '>=':
                        case '<=':
                        case '>':
                        case '<':
                            return $query->where($column, $operator, $value);
                        case '!=':
                            return $query->where($column, '<>', $value);
                    }
                }
            }
        }

        return $query;
    }
}

if (!function_exists('savePublicFile')) {
    /**
     * Save public file
     *
     * @param UploadedFile $file
     * @param string $path
     * @param string $name
     * @return string
     */
    function savePublicFile(UploadedFile $file, string $path, string $name): string
    {
        $location = $file->storePubliclyAs($path, $name, 'public');

        $hash = Str::random(5);

        if (!is_string($location)) {
            throw new RuntimeException('Cannot save file.');
        }

        return "storage/{$location}?id={$hash}";
    }
}

if (!function_exists('paginate')) {
    /**
     * Paginate query by request
     *
     * @param Builder|Relation $query
     * @param \Illuminate\Http\Request|null $request
     * @return LengthAwarePaginator
     */
    function paginate($query, \Illuminate\Http\Request $request = null)
    {
        $request = $request ?: Request::instance();
        $builder = $query->getConnection()->getSchemaBuilder();
        $table = $query->getModel()->getTable();
        $keyName = $query->getModel()->getKeyName();

        $validated = $request->validate([
            'search'             => 'nullable|array',
            'search.*'           => 'required|string',
            'filters'            => 'nullable|array',
            'filters.*'          => 'required|array',
            'filters.*.field'    => 'required|string',
            'filters.*.operator' => 'required|string',
            'filters.*.value'    => 'nullable',
            'sorters'            => 'nullable|array',
            'sorters.*'          => 'required|array',
            'sorters.*.field'    => 'required|string',
            'sorters.*.sort'     => 'required|string|in:asc,desc',
            'page'               => 'nullable|integer|min:0',
            'itemPerPage'        => 'nullable|integer|min:1',
        ]);

        $sorters = data_get($validated, 'sorters');
        $search = data_get($validated, 'search');
        $filters = data_get($validated, 'filters');
        $page = data_get($validated, 'page', 1);
        $itemPerPage = data_get($validated, 'itemPerPage', 20);

        if (is_array($search)) {
            foreach ($search as $column => $value) {
                if ($builder->hasColumn($table, $column)) {
                    $query->where($column, 'like', "%{$value}%");
                }
            }
        }

        if (is_array($filters)) {
            foreach ($filters as $filter) {
                $column = data_get($filter, 'field');
                $operator = data_get($filter, 'operator');
                $value = data_get($filter, 'value');

                if ($builder->hasColumn($table, $column)) {
                    filterColumn("$table.$column", $operator, $value, $query);
                }
            }
        }

        if (is_array($sorters)) {
            foreach ($sorters as $sorter) {
                $column = data_get($sorter, 'field');
                $order = data_get($sorter, 'sort');

                if ($builder->hasColumn($table, $column)) {
                    $query->orderBy("$table.$column", $order);
                }
            }

            if (count($sorters)) {
                $query->orderBy("$table.$keyName");
            }
        }

        return $query->paginate($itemPerPage, ['*'], 'page', $page);
    }
}
