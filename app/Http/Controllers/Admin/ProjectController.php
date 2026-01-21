<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
        $project->load(['users', 'feeds.comments.user']);

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
            'feeds' => [] 
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'status' => 'required|string',
            'progress' => 'required|integer|min:0|max:100',
        ]);

        $project->update($validated);

        return redirect()->back()->with('success', 'Project updated successfully');
    }
}