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

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $project = $user->projects()
            ->with(['feeds' => function($query) {
                $query->latest()->with(['user', 'comments.user']); 
            }])
            ->latest()
            ->first();

        if ($project) {
            $feeds = $project->feeds->map(function ($feed) {
                return [
                    'id' => $feed->id,
                    'user_initials' => $feed->user ? substr($feed->user->name, 0, 2) : 'SY',
                    'user_name' => $feed->user ? $feed->user->name : 'System',
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
                            'content' => $comment->content,
                            'media' => $comment->media_path ? asset('storage/' . $comment->media_path) : null,
                            'is_own' => $comment->user_id === Auth::id(), // Cek pemilik komentar
                            'created_at' => $comment->created_at->diffForHumans(),
                        ];
                    }),
                ];
            });

            return Inertia::render('Client/Dashboard', [
                'hasProject' => true,
                'project' => $project,
                'feeds' => $feeds
            ]);
        }

        return Inertia::render('Client/Dashboard', ['hasProject' => false]);
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
    
    public function joinProject(Request $request) { /* ... */ }
}