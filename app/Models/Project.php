<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 
        'description', 
        'access_token', 
        'status', 
        'progress',
        'deadline',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'project_user');
    }

    public function feeds()
    {
        return $this->hasMany(Feed::class);
    }
}