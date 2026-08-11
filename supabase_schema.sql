-- ==========================================
-- ESQUEMA SUPABASE: TDI SIMULADOR
-- ==========================================
-- Instrucciones: Ejecuta todo este script en el SQL Editor de tu proyecto en Supabase.

-- 1. Tabla de Perfiles (Se alimenta automáticamente desde Supabase Auth)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security) para Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para Profiles
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Tabla de Resultados de Exámenes (Para estadísticas globales)
CREATE TABLE public.exam_results (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    area TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    time_used_seconds INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para búsquedas rápidas de promedios
CREATE INDEX idx_exam_results_area ON public.exam_results(area);

-- Habilitar RLS para Exam Results
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

-- Políticas para Exam Results (Cualquiera puede ver, solo autenticados insertan su resultado)
CREATE POLICY "Exam results are viewable by everyone." 
ON public.exam_results FOR SELECT USING (true);

CREATE POLICY "Users can insert their own exam results." 
ON public.exam_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. Tabla de Anotaciones y Experiencias Comunitarias
CREATE TABLE public.community_notes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    area TEXT NOT NULL,
    note_type TEXT NOT NULL, -- 'truco', 'experiencia', 'explicacion'
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para búsquedas de notas por tema
CREATE INDEX idx_community_notes_topic ON public.community_notes(topic_id);
CREATE INDEX idx_community_notes_area ON public.community_notes(area);

-- Habilitar RLS para Notas
ALTER TABLE public.community_notes ENABLE ROW LEVEL SECURITY;

-- Políticas para Notas
CREATE POLICY "Notes are viewable by everyone." 
ON public.community_notes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert notes." 
ON public.community_notes FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own notes or anyone can increment likes." 
ON public.community_notes FOR UPDATE USING (true); -- Simplificado para permitir likes. En un entorno más estricto se haría vía RPC.

-- 4. Tabla de Reportes de Ejercicios
CREATE TABLE public.question_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Puede ser NULL si es invitado (opcional, pero exigiremos login idealmente)
    question_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    details TEXT,
    resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices
CREATE INDEX idx_question_reports_qid ON public.question_reports(question_id);

-- Habilitar RLS para Reportes
ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;

-- Políticas para Reportes
CREATE POLICY "Authenticated users can insert reports." 
ON public.question_reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only admins/everyone can view reports (configure as needed)." 
ON public.question_reports FOR SELECT USING (true);

-- 5. Función y Trigger automático para crear Profile cuando un usuario se registra en Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, avatar_url)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)), 
    new.email, 
    'https://api.dicebear.com/7.x/avataaars/svg?seed=' || new.id
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- FIN DEL ESQUEMA
