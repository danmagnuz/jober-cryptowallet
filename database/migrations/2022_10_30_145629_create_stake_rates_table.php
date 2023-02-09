<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stake_rates', function (Blueprint $table) {
            $table->id();

            $table->decimal('days')->unsigned();
            $table->decimal('rate')->unsigned();

            $table->decimal('min_value', 36, 18)->unsigned();
            $table->decimal('max_value', 36, 18)->unsigned();

            $table->foreignId('plan_id')
                ->constrained('stake_plans')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stake_rates');
    }
};
