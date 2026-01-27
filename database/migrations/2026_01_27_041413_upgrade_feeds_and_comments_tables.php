<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('feeds', function (Blueprint $table) {
            if (!Schema::hasColumn('feeds', 'approval_status')) {
                $table->string('approval_status')->default('pending')->after('type'); 
            }
        });

        Schema::table('comments', function (Blueprint $table) {
            if (!Schema::hasColumn('comments', 'feed_id')) {
                $table->foreignId('feed_id')->after('id')->constrained('feeds')->onDelete('cascade');
            }
            if (!Schema::hasColumn('comments', 'media_path')) {
                $table->string('media_path')->nullable()->after('content');
            }
            if (!Schema::hasColumn('comments', 'user_id')) {
                $table->foreignId('user_id')->after('feed_id')->constrained('users')->onDelete('cascade');
            }
        });
    }

    public function down()
    {
        Schema::table('feeds', function (Blueprint $table) {
            $table->dropColumn('approval_status');
        });
        Schema::table('comments', function (Blueprint $table) {
            $table->dropColumn(['feed_id', 'media_path']); 
        });
    }   
};
