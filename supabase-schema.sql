-- CyberQuest Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Enable Row Level Security (RLS) by default
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'teacher');
CREATE TYPE test_type AS ENUM ('pre', 'post');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE,
  role user_role NOT NULL DEFAULT 'student',
  class TEXT,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tests table (stores pre-test and post-test questions)
CREATE TABLE IF NOT EXISTS tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type test_type NOT NULL,
  questions JSONB NOT NULL, -- Array of question objects with answers
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Responses table (stores student answers to tests)
CREATE TABLE IF NOT EXISTS responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
  answers JSONB NOT NULL, -- Array of selected answers
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, test_id) -- One response per user per test
);

-- Quests table (stores FSM definitions for game quests)
CREATE TABLE IF NOT EXISTS quests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  topic TEXT NOT NULL, -- e.g., 'phishing', 'password', 'malware'
  description TEXT,
  fsm JSONB NOT NULL, -- FSM definition in JSON format
  max_score INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Game sessions table (stores student game progress and results)
CREATE TABLE IF NOT EXISTS gamesessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  quest_id UUID REFERENCES quests(id) ON DELETE CASCADE,
  quest_log JSONB NOT NULL DEFAULT '[]', -- Array of FSM transitions/events
  current_state TEXT NOT NULL DEFAULT 'intro',
  score INTEGER NOT NULL DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_tests_type ON tests(type);
CREATE INDEX IF NOT EXISTS idx_responses_user_id ON responses(user_id);
CREATE INDEX IF NOT EXISTS idx_responses_test_id ON responses(test_id);
CREATE INDEX IF NOT EXISTS idx_gamesessions_user_id ON gamesessions(user_id);
CREATE INDEX IF NOT EXISTS idx_gamesessions_quest_id ON gamesessions(quest_id);
CREATE INDEX IF NOT EXISTS idx_quests_topic ON quests(topic);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE gamesessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'teacher');

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for tests table
CREATE POLICY "Everyone can view tests" ON tests
  FOR SELECT USING (true);

CREATE POLICY "Only teachers can manage tests" ON tests
  FOR ALL USING (auth.jwt() ->> 'role' = 'teacher');

-- RLS Policies for responses table
CREATE POLICY "Users can view own responses" ON responses
  FOR SELECT USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'teacher');

CREATE POLICY "Users can insert own responses" ON responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers can view all responses" ON responses
  FOR SELECT USING (auth.jwt() ->> 'role' = 'teacher');

-- RLS Policies for quests table
CREATE POLICY "Everyone can view quests" ON quests
  FOR SELECT USING (true);

CREATE POLICY "Only teachers can manage quests" ON quests
  FOR ALL USING (auth.jwt() ->> 'role' = 'teacher');

-- RLS Policies for gamesessions table
CREATE POLICY "Users can view own game sessions" ON gamesessions
  FOR SELECT USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'teacher');

CREATE POLICY "Users can manage own game sessions" ON gamesessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Teachers can view all game sessions" ON gamesessions
  FOR SELECT USING (auth.jwt() ->> 'role' = 'teacher');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tests_updated_at BEFORE UPDATE ON tests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quests_updated_at BEFORE UPDATE ON quests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a function for anonymous user creation
CREATE OR REPLACE FUNCTION create_anonymous_user()
RETURNS UUID AS $$
DECLARE
    new_user_id UUID;
BEGIN
    INSERT INTO users (role, name, class)
    VALUES ('student', 'Anonymous Student', 'Unknown')
    RETURNING id INTO new_user_id;
    
    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to calculate test score
CREATE OR REPLACE FUNCTION calculate_test_score(test_answers JSONB, correct_answers JSONB)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
    total INTEGER := 0;
    i INTEGER;
BEGIN
    total := jsonb_array_length(correct_answers);
    
    FOR i IN 0..total-1 LOOP
        IF (test_answers->i)::INTEGER = (correct_answers->i->>'correct')::INTEGER THEN
            score := score + 1;
        END IF;
    END LOOP;
    
    RETURN ROUND((score::DECIMAL / total::DECIMAL) * 100);
END;
$$ LANGUAGE plpgsql;

-- Create a view for teacher dashboard statistics
CREATE OR REPLACE VIEW teacher_stats AS
SELECT 
    u.class,
    COUNT(DISTINCT u.id) as total_students,
    AVG(CASE WHEN r.test_id IN (SELECT id FROM tests WHERE type = 'pre') THEN r.score END) as avg_pretest_score,
    AVG(CASE WHEN r.test_id IN (SELECT id FROM tests WHERE type = 'post') THEN r.score END) as avg_posttest_score,
    AVG(gs.score) as avg_game_score,
    COUNT(DISTINCT gs.id) as total_game_sessions
FROM users u
LEFT JOIN responses r ON u.id = r.user_id
LEFT JOIN gamesessions gs ON u.id = gs.user_id
WHERE u.role = 'student'
GROUP BY u.class;

-- Grant permissions for the service role
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Grant permissions for authenticated users
GRANT SELECT, INSERT, UPDATE ON users TO authenticated;
GRANT SELECT ON tests TO authenticated;
GRANT SELECT, INSERT ON responses TO authenticated;
GRANT SELECT ON quests TO authenticated;
GRANT SELECT, INSERT, UPDATE ON gamesessions TO authenticated;
