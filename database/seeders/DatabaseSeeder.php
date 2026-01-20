<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Feed;
use App\Models\Comment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str; // Penting untuk access_token

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Comment::truncate();
        Feed::truncate();
        DB::table('project_user')->truncate();
        Project::truncate();
        User::truncate();
        Schema::enableForeignKeyConstraints();

        // 1. Buat Admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@argeconnect.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'initials' => 'AD',
        ]);

        $this->command->info('✅ Admin User created!');

        // 2. Buat Data Klien
        $clientsData = [
            ['name' => 'Sheila Jule', 'email' => 'sheila@client.com', 'initials' => 'SJ'],
            ['name' => 'Naufal Rafiif', 'email' => 'naufal@client.com', 'initials' => 'NR'],
            ['name' => 'Rahmadatul Afdal', 'email' => 'rahma@client.com', 'initials' => 'RA'],
            ['name' => 'Budi Santoso', 'email' => 'budi@client.com', 'initials' => 'BS'],
            ['name' => 'PT Maju Jaya', 'email' => 'maju@client.com', 'initials' => 'MJ'],
        ];

        $clients = [];
        foreach ($clientsData as $c) {
            $clients[$c['name']] = User::create([
                'name' => $c['name'],
                'email' => $c['email'],
                'password' => Hash::make('password'),
                'role' => 'client',
                'initials' => $c['initials'],
            ]);
        }

        // 3. Data Project (client_name di sini HANYA untuk referensi coding, bukan masuk DB)
        $projectsData = [
            [
                'title' => 'E-Commerce Website Revamp',
                'description' => 'Redesigning the main marketplace platform.',
                'status' => 'In Progress',
                'progress' => 75,
                'client_name' => 'Sheila Jule',
            ],
            [
                'title' => 'Portfolio Website',
                'description' => 'Personal branding website for professionals.',
                'status' => 'In Progress',
                'progress' => 60,
                'client_name' => 'Naufal Rafiif',
            ],
            [
                'title' => 'Patient Portal',
                'description' => 'Hospital management system for patients.',
                'status' => 'Completed',
                'progress' => 100,
                'client_name' => 'Rahmadatul Afdal',
            ],
            [
                'title' => 'Company Profile App',
                'description' => 'Mobile app for company introduction.',
                'status' => 'Pending',
                'progress' => 10,
                'client_name' => 'PT Maju Jaya',
            ],
        ];

        foreach ($projectsData as $p) {
            // --- PERBAIKAN DI SINI ---
            // Kita HAPUS 'client_name' dari dalam create() karena kolomnya tidak ada di DB
            $project = Project::create([
                'title' => $p['title'],
                'description' => $p['description'],
                'status' => $p['status'],
                'progress' => $p['progress'],
                'access_token' => Str::random(10),
            ]);
            // -------------------------

            // Hubungkan Project dengan User (Pivot Table)
            if (isset($clients[$p['client_name']])) {
                $project->users()->attach($clients[$p['client_name']]->id);
            }

            // Buat Feed
            $feed = Feed::create([
                'project_id' => $project->id,
                'content' => 'Update progress minggu ini.',
                'type' => 'update',
            ]);

            // Buat Komentar
            if ($p['client_name'] === 'Sheila Jule') {
                Comment::create([
                    'feed_id' => $feed->id,
                    'user_id' => $clients['Sheila Jule']->id,
                    'content' => 'Jujur saya kurang suka dengan warna yang telah kalian pilih.',
                    'priority' => 'High',
                    'is_resolved' => false,
                ]);
            }
            if ($p['client_name'] === 'Naufal Rafiif') {
                Comment::create([
                    'feed_id' => $feed->id,
                    'user_id' => $clients['Naufal Rafiif']->id,
                    'content' => 'The image gallery looks great! Could we adjust spacing?',
                    'priority' => 'Normal',
                    'is_resolved' => false,
                ]);
            }
            if ($p['client_name'] === 'Rahmadatul Afdal') {
                Comment::create([
                    'feed_id' => $feed->id,
                    'user_id' => $clients['Rahmadatul Afdal']->id,
                    'content' => 'The color scheme works well.',
                    'priority' => 'Normal',
                    'is_resolved' => false,
                ]);
            }
        }

        $this->command->info('✅ Database seeded successfully with Mock Data!');
    }
}