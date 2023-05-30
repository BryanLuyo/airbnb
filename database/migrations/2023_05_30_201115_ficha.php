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

        /*
        Schema::create('ficha', function (Blueprint $table) {
            $table->id();
            $table->string('nombre',100);
            $table->string('apellido',150);

            $table->string('', 200);
            $table->boolean('estado')->default(true);
            $table->timestamps();
        });
        */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
