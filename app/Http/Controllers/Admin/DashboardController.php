<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use App\Models\Feed;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'totalProjects' => Project::count(),
            
            'activeProjects' => Project::where('status', 'In Progress')->count(),
            
            'totalClients' => User::where('role', 'client')->count(),
            
            'recentActivities' => Feed::with(['project', 'user'])
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($feed) {
                    $description = '';
                    $actionType = '';

                    if ($feed->type === 'system') {
                        $cleanContent = strip_tags($feed->content);
                        $description = str_replace('**', '', $cleanContent);
                        $actionType = 'System Update';
                    } elseif ($feed->media_path && !$feed->content) {
                        $description = 'Uploaded a file attachment';
                        $actionType = 'File Upload';
                    } else {
                        $description = Str::limit($feed->content, 60);
                        $actionType = 'Commented';
                    }

                    return [
                        'id' => $feed->id,
                        'user_name' => $feed->user ? $feed->user->name : 'System',
                        'project_title' => $feed->project ? $feed->project->title : 'Deleted Project',
                        'project_id' => $feed->project_id, 
                        'description' => $description,
                        'action_type' => $actionType,
                        'type' => $feed->type,
                        'time' => $feed->created_at->diffForHumans(),
                    ];
                }),
        ]);
    }
}