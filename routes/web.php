<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\ProjectController;
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
    
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('/admin/projects', [ProjectController::class, 'index'])->name('admin.projects');
    // -------------------------------

    Route::get('/admin/feed', function () {
        return Inertia::render('Admin/AdminPriorityFeed'); 
    })->name('admin.feed');

    Route::get('/admin/users', function () {
        return Inertia::render('Admin/UserManagement');
    })->name('admin.users');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';