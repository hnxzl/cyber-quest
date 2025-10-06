# CyberQuest

CyberQuest is a full-stack web app for educational research, built with Next.js (React 18, TypeScript), Tailwind CSS, and Supabase (Postgres DB + Auth). It features a pre-test, RPG quest game (FSM engine), post-test, and teacher dashboard for analytics.

## Features

- Anonymous student login (Supabase anon key)
- Teacher login (Supabase Auth)
- Pre-test & post-test (questions from Supabase)
- RPG quest game (FSM engine, JSON from Supabase)
- Teacher dashboard: aggregate results, statistics, CSV export
- API routes for backend logic
- Supabase integration for DB/auth

## Setup

### 1. Setup Supabase Database

1. Create a new project di [Supabase](https://supabase.com)
2. Di SQL Editor, jalankan `supabase-schema.sql` untuk membuat tabel
3. Jalankan `supabase-seed.sql` untuk mengisi data awal
4. Catat URL dan API keys dari Settings > API

### 2. Setup Project Lokal

1. Clone this repo
2. Copy `.env.local.example` to `.env.local` dan isi dengan Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run locally:
   ```bash
   npm run dev
   ```

### 3. Deploy ke Vercel

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Add environment variables dari `.env.local`
4. Deploy

## Database Schema

Lihat `supabase-schema.sql` untuk detail lengkap:

### Main Tables:

- `users` (id, email, role, class, name, created_at)
- `tests` (id, title, type: pre/post, questions JSON)
- `responses` (id, user_id, test_id, answers JSON, score, created_at)
- `gamesessions` (id, user_id, quest_id, quest_log JSON, score, started_at, ended_at)
- `quests` (id, title, topic, description, fsm JSON, max_score)

### Security:

- Row Level Security (RLS) enabled
- Students can only access their own data
- Teachers can view all student data
- Anonymous users supported

## Seed Data

`supabase-seed.sql` includes:

- 2 sample quests dengan FSM definitions
- Pre-test: 5 pertanyaan dasar cybersecurity
- Post-test: 5 pertanyaan lanjutan
- Sample users (teacher + anonymous students)

## API Endpoints

- `POST /api/auth/anon` - Create anonymous student
- `POST /api/auth/login` - Teacher login
- `GET /api/tests/[id]` - Get test questions
- `POST /api/tests/[id]/submit` - Submit test answers
- `POST /api/game/session/start` - Start game session
- `POST /api/game/session/[id]/event` - Save FSM event
- `POST /api/game/session/[id]/end` - End game session
- `GET /api/teacher/results` - Get aggregated results

## Environment Variables

See `.env.local.example` for required variables.

## License

MIT
