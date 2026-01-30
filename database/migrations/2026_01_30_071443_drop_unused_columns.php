<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('feeds', function (Blueprint $table) {
            if (Schema::hasColumn('feeds', 'sentiment')) {
                $table->dropColumn('sentiment');
            }
            if (Schema::hasColumn('feeds', 'analysis_summary')) {
                $table->dropColumn('analysis_summary');
            }
        });

        Schema::table('comments', function (Blueprint $table) {
            if (Schema::hasColumn('comments', 'sentiment')) {
                $table->dropColumn('sentiment');
            }
            if (Schema::hasColumn('comments', 'analysis_summary')) {
                $table->dropColumn('analysis_summary');
            }
        });
    }

    public function down()
    {
    }
};