<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(GridSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(SupportedCurrencySeeder::class);
        $this->call(FeatureLimitSeeder::class);
        $this->call(ModuleSeeder::class);
        $this->runTestSeeds();
    }

    /**
     * Seed the for local environment.
     *
     * @return void
     */
    protected function runTestSeeds()
    {
        if (config('database.enable_demo', false)) {
            $this->call(OperatingCountrySeeder::class);
            $this->call(UserSeeder::class);
        }
    }
}
