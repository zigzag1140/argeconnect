<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('feeds', function (Blueprint $table) {
            if (!Schema::hasColumn('feeds', 'priority')) {
                if (Schema::hasColumn('feeds', 'priority_level')) {
                    $table->renameColumn('priority_level', 'priority');
                } else {
                    $table->string('priority')->default('Normal')->after('approval_status');
                }
            }
            
            if (!Schema::hasColumn('feeds', 'priority_score')) {
                $table->integer('priority_score')->nullable()->after('priority');
            }
            if (!Schema::hasColumn('feeds', 'analysis_summary')) {
                $table->text('analysis_summary')->nullable()->after('priority_score');
            }
        });

        Schema::table('comments', function (Blueprint $table) {
            if (!Schema::hasColumn('comments', 'priority')) {
                 if (Schema::hasColumn('comments', 'priority_level')) {
                    $table->renameColumn('priority_level', 'priority');
                } else {
                    $table->string('priority')->default('Normal')->after('content');
                }
            }

            if (!Schema::hasColumn('comments', 'priority_score')) {
                $table->integer('priority_score')->nullable()->after('priority');
            }
            if (!Schema::hasColumn('comments', 'analysis_summary')) {
                $table->text('analysis_summary')->nullable()->after('priority_score');
            }
        });
    }

    public function down()
    {
    }
};