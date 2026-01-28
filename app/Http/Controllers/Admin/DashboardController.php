<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use App\Models\Feed;
use App\Models\Comment;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $latestFeeds = Feed::with(['project', 'user'])->latest()->take(5)->get();
        $latestComments = Comment::with(['feed.project', 'user'])->latest()->take(5)->get();

        $recentActivities = $latestFeeds->concat($latestComments)
            ->sortByDesc('created_at')
            ->take(5)
            ->map(function ($item) {
                $isComment = $item instanceof Comment;
                
                $userName = $item->user ? $item->user->name : 'System';
                $userAvatar = $item->user ? $item->user->avatar : null;
                
                $project = $isComment ? ($item->feed->project ?? null) : ($item->project ?? null);
                $projectTitle = $project ? $project->title : 'Deleted Project';
                $projectId = $project ? $project->id : null;

                $description = '';
                $actionType = '';
                $type = '';

                if ($isComment) {
                    $description = Str::limit($item->content, 60);
                    $actionType = 'New Comment';
                    $type = 'comment';
                } else {
                    if ($item->type === 'system') {
                        $cleanContent = strip_tags($item->content);
                        $description = str_replace('**', '', $cleanContent);
                        $actionType = 'System Update';
                    } elseif ($item->media_path && !$item->content) {
                        $description = 'Uploaded a file attachment';
                        $actionType = 'File Upload';
                    } else {
                        $description = Str::limit($item->content, 60);
                        $actionType = 'Developer Update';
                    }
                    $type = $item->type;
                }

                return [
                    'id' => $item->id,
                    'user_name' => $userName,
                    'user_avatar' => $userAvatar,
                    'project_title' => $projectTitle,
                    'project_id' => $projectId,
                    'description' => $description,
                    'action_type' => $actionType,
                    'type' => $type,
                    'time' => $item->created_at->diffForHumans(),
                ];
            })
            ->values();

        return Inertia::render('Admin/Dashboard', [
            'totalProjects' => Project::count(),
            'activeProjects' => Project::where('status', 'In Progress')->count(),
            'totalClients' => User::where('role', 'client')->count(),
            'recentActivities' => $recentActivities,
        ]);
    }
}