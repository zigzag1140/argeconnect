<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PriorityFeedController;
use App\Http\Controllers\Client\DashboardController as ClientDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        
        Route::controller(ProjectController::class)->group(function () {
            Route::get('/projects', 'index')->name('projects');
            Route::get('/projects/create', 'create')->name('projects.create');
            Route::post('/projects', 'store')->name('projects.store');
            Route::get('/projects/{project}', 'show')->name('projects.show');
            Route::patch('/projects/{project}', 'update')->name('projects.update');
            
            Route::post('/projects/{project}/feed', 'storeFeed')->name('projects.feed.store');
            Route::delete('/feeds/{feed}', 'destroyFeed')->name('feeds.destroy');
            Route::patch('/feeds/{feed}', 'updateFeed')->name('feeds.update');
        });

        Route::controller(PriorityFeedController::class)->group(function () {
            Route::get('/feed', 'index')->name('feed');
            Route::post('/feed/{id}/resolve', 'markResolved')->name('feed.resolve');
            Route::post('/feed/{commentId}/reply', 'storeReply')->name('feed.reply');
        });

        Route::controller(UserController::class)->group(function () {
            Route::get('/users', 'index')->name('users');
            Route::patch('/users/{user}', 'update')->name('users.update');
            Route::delete('/users/{user}', 'destroy')->name('users.destroy');
        });
    });

    Route::prefix('client')->name('client.')->controller(ClientDashboardController::class)->group(function () {
        Route::get('/dashboard', 'index')->name('dashboard');
        Route::post('/join', 'joinProject')->name('project.join');
        
        Route::post('/feed/{feed}/approve', 'approveFeed')->name('feed.approve');
        Route::post('/feed/{feed}/comment', 'storeComment')->name('feed.comment.store');
        
        Route::post('/comment/{comment}/update', 'updateComment')->name('comment.update');
        Route::delete('/comment/{comment}', 'destroyComment')->name('comment.destroy');
    });

    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'edit')->name('profile.edit');
        Route::patch('/profile', 'update')->name('profile.update');
        Route::delete('/profile', 'destroy')->name('profile.destroy');
    });
});

require __DIR__.'/auth.php';