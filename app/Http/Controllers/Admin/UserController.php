<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $usersDB = User::with('projects')->latest()->get();

        $clients = $usersDB->map(function ($user) {
            $project = $user->projects->first();
            $hasProject = $user->projects->count() > 0;

            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'initials' => $user->initials ?? substr($user->name, 0, 2),
                'avatar' => $user->avatar, 
                'project' => $project ? $project->title : 'No Active Project',
                'status' => $hasProject ? 'Active Access' : 'Inactive',
            ];
        });

        return Inertia::render('Admin/UserManagement', [
            'clients' => $clients
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|in:admin,client',
        ]);
        $user->update(['role' => $validated['role']]);
        return redirect()->back()->with('success', 'User role updated successfully');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back()->with('success', 'User deleted successfully');
    }
}