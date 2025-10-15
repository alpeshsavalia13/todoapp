<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('milk_expense', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Todo owner
            $table->string('month')->nullable();
            $table->double('total_ltr')->nullable();
            $table->decimal('per_ltr_price')->nullable();
            $table->decimal('total_amount')->nullable();
            $table->longText('day_wise_ltr')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('milk_expense');
    }
};
