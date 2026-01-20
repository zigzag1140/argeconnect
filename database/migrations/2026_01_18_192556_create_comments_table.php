<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('feed_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('content');
            
            $table->string('sentiment')->nullable(); 
            $table->string('priority')->default('Normal'); 
            $table->boolean('is_resolved')->default(false); 
            
            $table->enum('reaction', ['acc', 'discuss'])->nullable(); 
            $table->boolean('is_read')->default(false);
        
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};