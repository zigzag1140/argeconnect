<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use App\Models\Comment;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'totalProjects' => Project::count(),
            
            'activeProjects' => Project::where('status', 'In Progress')->count(),
            
            'totalClients' => User::where('role', 'client')->count(),
            
            'recentProjects' => Project::with('users')
                ->latest()
                ->take(3)
                ->get()
                ->map(function ($project) {
                    return [
                        'id' => $project->id,
                        'title' => $project->title,
                        'client' => $project->users->first()->name ?? 'Unassigned',
                        'status' => $project->status,
                        'date' => $project->created_at->diffForHumans(), 
                    ];
                }),
        ]);
    }
}