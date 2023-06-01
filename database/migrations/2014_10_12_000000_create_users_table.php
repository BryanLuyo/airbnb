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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->uuid('key');
            $table->integer('tipo_documento_id')->nullable();
            $table->string('nombre', 100)->nullable();
            $table->string('apellido', 150)->nullable();
            $table->string('numero_documento', 50)->nullable();
            $table->string('user')->nullable();
            $table->string('adjunto')->nullable();
            $table->string('adjunto_nombre')->nullable();
            $table->string('password_vista')->nullable();
            $table->string('password')->nullable();
            $table->char('user_type',1)->nullable()->comment('1-admin,2-portero o conserje, 3- entidad, 4- inquilino');
            $table->boolean('estado')->default(true);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
