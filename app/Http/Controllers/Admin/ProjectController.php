<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
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
}