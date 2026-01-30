<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Feed;
use App\Models\Comment; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        
        $myProjects = $user->projects()
            ->select('projects.id', 'projects.title', 'projects.created_at')
            ->latest('projects.created_at') 
            ->get();

        if ($myProjects->isEmpty()) {
            return Inertia::render('Client/Dashboard', ['hasProject' => false]);
        }

        $selectedId = $request->input('project_id');
        $project = null;

        if ($selectedId) {
            $project = $user->projects()
                ->where('projects.id', $selectedId)
                ->with(['feeds' => function($query) {
                    $query->latest()->with(['user', 'comments.user']); 
                }])
                ->first();
        }

        if (!$project) {
            $project = $user->projects()
                ->with(['feeds' => function($query) {
                    $query->latest()->with(['user', 'comments.user']); 
                }])
                ->latest('projects.created_at')
                ->first();
        }

        $feeds = $project->feeds->map(function ($feed) {
            return [
                'id' => $feed->id,
                'user_initials' => $feed->user ? substr($feed->user->name, 0, 2) : 'SY',
                'user_name' => $feed->user ? $feed->user->name : 'System',
                'user_avatar' => $feed->user ? $feed->user->avatar : null,
                'user_role' => $feed->user && $feed->user->role === 'admin' ? 'Developer' : 'Client',
                'content' => $feed->content,
                'media' => $feed->media_path ? asset('storage/' . $feed->media_path) : null,
                'type' => $feed->type,
                'approval_status' => $feed->approval_status, 
                'created_at_human' => $feed->created_at->diffForHumans(),
                'comments' => $feed->comments->map(function ($comment) {
                    return [
                        'id' => $comment->id,
                        'user_name' => $comment->user->name,
                        'user_initials' => substr($comment->user->name, 0, 2),
                        'user_avatar' => $comment->user->avatar,
                        'user_role' => $comment->user->role === 'admin' ? 'Developer' : 'Client',
                        'content' => $comment->content,
                        'media' => $comment->media_path ? asset('storage/' . $comment->media_path) : null,
                        'is_own' => $comment->user_id === Auth::id(),
                        'created_at' => $comment->created_at->diffForHumans(),
                    ];
                }),
            ];
        });

        $deadline = $project->deadline ? Carbon::parse($project->deadline) : null;
        $remaining = 'No Deadline';
        if ($deadline) {
            if ($deadline->isPast()) {
                $remaining = 'Overdue';
            } else {
                $remaining = $deadline->diffForHumans(null, true) . ' left';
            }
        }

        $projectData = array_merge($project->toArray(), [
            'remaining_time' => $remaining
        ]);

        return Inertia::render('Client/Dashboard', [
            'hasProject' => true,
            'project' => $projectData,
            'feeds' => $feeds,
            'myProjects' => $myProjects
        ]);
    }

    public function leaveProject(Project $project)
    {
        $project->users()->detach(Auth::id());
        return redirect()->route('client.dashboard')->with('success', 'You have left the project.');
    }

    public function approveFeed(Feed $feed)
    {
        $feed->update(['approval_status' => 'approved']);

        \App\Models\Feed::create([
            'project_id' => $feed->project_id,
            'user_id' => \Illuminate\Support\Facades\Auth::id(),
            'type' => 'system',
            'content' => '<strong>Approved</strong> an update report.',
            'approval_status' => 'approved'
        ]);
        return redirect()->back();
    }

    public function storeComment(Request $request, Feed $feed)
    {
        $request->validate(['content' => 'nullable|string', 'media' => 'nullable|image|max:2048']);

        $feed->update(['approval_status' => 'revision']);

        $path = null;
        if ($request->hasFile('media')) {
            $path = $request->file('media')->store('comments', 'public');
        }

        Comment::create([
            'feed_id' => $feed->id,
            'user_id' => Auth::id(),
            'content' => $request->content,
            'media_path' => $path
        ]);

        return redirect()->back();
    }

    public function destroyComment(Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) abort(403);
        $comment->delete();
        return redirect()->back();
    }

    public function updateComment(Request $request, Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) abort(403);
        
        $comment->update(['content' => $request->content]);
        return redirect()->back();
    }
    
    public function joinProject(Request $request) 
    { 
        $request->validate(['token' => 'required|string']);

        $project = Project::where('access_token', $request->token)->first();

        if (!$project) {
            return back()->withErrors(['token' => 'Invalid project token.']);
        }

        if ($project->users()->where('user_id', Auth::id())->exists()) {
            return back()->with('info', 'You are already in this project.');
        }

        $project->users()->attach(Auth::id());

        return redirect()->route('client.dashboard')->with('success', 'Project joined successfully!');
    }
}