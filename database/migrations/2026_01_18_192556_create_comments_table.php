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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('feed_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Siapa yang komen
            $table->text('content');
        
        // Prioritas
            $table->string('sentiment')->nullable(); 
            $table->enum('priority', ['high', 'medium', 'low'])->default('low');
        
        // Status Admin
            $table->enum('reaction', ['acc', 'discuss'])->nullable(); 
            $table->boolean('is_read')->default(false);
        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
