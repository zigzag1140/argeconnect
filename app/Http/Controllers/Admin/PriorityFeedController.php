<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class PriorityFeedController extends Controller
{
    public function index()
    {
        $unanalyzedComments = Comment::where('is_resolved', false)
            ->whereNull('priority_score') 
            ->whereHas('user', function($q) {
                $q->where('role', 'client'); 
            })
            ->latest()
            ->take(5)
            ->get();

        foreach ($unanalyzedComments as $comment) {
            $analysis = $this->analyzeSentiment($comment->content);
            
            $score = ($analysis['priority'] === 'High') ? 1 : 0;

            $comment->update([
                'priority' => $analysis['priority'],
                'priority_score' => $score
            ]);
        }

        $comments = Comment::with(['user', 'feed.project'])
            ->where('is_resolved', false)
            ->whereHas('user', function($q) {
                $q->where('role', 'client'); 
            })
            ->orderByDesc('priority_score') 
            ->latest()
            ->get();

        $feeds = $comments->map(function ($comment) {
            return [
                'id' => $comment->id,
                'user' => $comment->user->name,
                'user_avatar' => $comment->user->avatar,
                'initials' => substr($comment->user->name, 0, 2),
                'role' => 'Client',
                'project' => $comment->feed->project->title ?? 'Unknown Project',
                'project_id' => $comment->feed->project_id ?? null, 
                'priority' => $comment->priority, 
                'content' => $comment->content,
                'time' => $comment->created_at->diffForHumans(),
            ];
        });

        return Inertia::render('Admin/AdminPriorityFeed', [ 
            'feeds' => $feeds,
            'highPriorityCount' => $feeds->where('priority', 'High')->count()
        ]);
    }

    private function analyzeSentiment($text)
    {
        try {
            $response = Http::post('http://127.0.0.1:5000/predict', [
                'text' => $text
            ]);

            if ($response->successful()) {
                $result = $response->json();
                return ['priority' => $result['priority']];
            }
        } catch (\Exception $e) {
            return ['priority' => 'Normal'];
        }

        return ['priority' => 'Normal'];
    }

    public function markResolved($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->update(['is_resolved' => true]);

        return redirect()->back()->with('success', 'Issue marked as resolved.');
    }

    public function storeReply(Request $request, $commentId)
    {
        $request->validate([
            'content' => 'required|string',
            'media' => 'nullable|image|max:2048' 
        ]);

        $clientComment = Comment::findOrFail($commentId);

        $path = null;
        if ($request->hasFile('media')) {
            $path = $request->file('media')->store('comments', 'public');
        }

        Comment::create([
            'feed_id' => $clientComment->feed_id,
            'user_id' => Auth::id(),
            'content' => $request->content,
            'media_path' => $path, 
            'priority' => 'Normal',
            'priority_score' => 0,
        ]);

        return redirect()->back()->with('success', 'Reply sent successfully.');
    }
}