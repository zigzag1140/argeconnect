<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $usersDB = User::where('role', 'client')->with('projects')->latest()->get();

        $clients = $usersDB->map(function ($user) {
            $project = $user->projects->first(); 
            
            return [
                'id' => $user->id,
                'name' => $user->name,
                'initials' => $user->initials ?? substr($user->name, 0, 2), 
                'project' => $project ? $project->title : 'No Active Project', 
                'status' => 'Active Access',
            ];
        });

        return Inertia::render('Admin/UserManagement', [
            'clients' => $clients
        ]);
    }
}