<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\Feed;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index()
    {
        $projectsDB = Project::with('users')->latest()->get();

        $projects = $projectsDB->map(function ($project) {
            $client = $project->users->first(); 
            
            return [
                'id' => $project->id,
                'title' => $project->title,
                'client' => $client ? $client->name : 'Unassigned',
                'status' => $project->status,
                'progress' => $project->progress,
            ];
        });

        return Inertia::render('Admin/AllProjects', [
            'projects' => $projects
        ]);
    }

    public function create()
    {
        $clients = User::where('role', 'client')->get()->map(function($user) {
            return [
                'id' => $user->id,
                'name' => $user->name
            ];
        });

        return Inertia::render('Admin/CreateProject', [
            'clients' => $clients
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'client_id' => 'required|exists:users,id', 
            'description' => 'nullable|string',
            'status' => 'required|string',
            'progress' => 'required|integer|min:0|max:100',
        ]);

        $project = Project::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => $validated['status'],
            'progress' => $validated['progress'],
            'access_token' => Str::random(10), 
        ]);

        $project->users()->attach($validated['client_id']);

        return redirect()->route('admin.projects')->with('success', 'Project created successfully!');
    }

   public function show(Project $project)
    {
        $project->load(['users']);

        $feeds = $project->feeds()->with('user')->latest()->get()->map(function ($feed) {
            return [
                'id' => $feed->id,
                'user' => $feed->user ? [
                    'name' => $feed->user->name,
                    'initials' => substr($feed->user->name, 0, 2) ?? 'AD',
                    'role' => $feed->user->role === 'admin' ? 'Developer' : 'Client',
                ] : null,
                'content' => $feed->content,
                'media' => $feed->media_path ? asset('storage/' . $feed->media_path) : null,
                'type' => $feed->type,
                'created_at' => $feed->created_at->diffForHumans(),
            ];
        });

        return Inertia::render('Admin/ProjectDetails', [
            'project' => [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'status' => $project->status,
                'progress' => $project->progress,
                'client' => $project->users->first() ? $project->users->first() : null,
                'created_at' => $project->created_at->format('d M Y'),
            ],
            'feeds' => $feeds, 
        ]);
    }
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'status' => 'required|string',
            'progress' => 'required|integer|min:0|max:100',
        ]);

        $changes = [];
        if ($project->status !== $validated['status']) {
            $changes[] = "Status updated to **{$validated['status']}**";
        }
        if ($project->progress != $validated['progress']) {
            $changes[] = "Progress updated to **{$validated['progress']}%**";
        }

        $project->update($validated);

        if (!empty($changes)) {
            Feed::create([
                'project_id' => $project->id,
                'user_id' => Auth::id(), 
                'content' => implode(" and ", $changes),
                'type' => 'system', 
            ]);
        }

        return redirect()->back()->with('success', 'Project updated successfully');
    }

    public function storeFeed(Request $request, Project $project)
    {
        $request->validate([
            'content' => 'nullable|string',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,pdf,doc,docx|max:10240', 
        ]);

        if (!$request->content && !$request->hasFile('media')) {
            return redirect()->back()->with('error', 'Message or media cannot be empty.');
        }

        $mediaPath = null;
        if ($request->hasFile('media')) {
            $mediaPath = $request->file('media')->store('feeds', 'public');
        }

        Feed::create([
            'project_id' => $project->id,
            'user_id' => Auth::id(),
            'content' => $request->content,
            'media_path' => $mediaPath,
            'type' => 'message', 
        ]);

        return redirect()->back()->with('success', 'Update posted successfully');
    }
    
    public function destroyFeed(Feed $feed)
    {
        $feed->delete();
        return redirect()->back()->with('success', 'Update deleted successfully');
    }

    public function updateFeed(Request $request, Feed $feed)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $feed->update([
            'content' => $request->content
        ]);

        return redirect()->back()->with('success', 'Update edited successfully');
    }
}