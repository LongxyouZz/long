-- Create a function to set user role in auth.users metadata
CREATE OR REPLACE FUNCTION public.set_user_role(user_id UUID, role TEXT)
RETURNS void AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = 
    CASE 
      WHEN raw_user_meta_data IS NULL THEN jsonb_build_object('role', role)
      ELSE raw_user_meta_data || jsonb_build_object('role', role)
    END
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a table to store user roles if needed for more complex role management
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles table
DROP POLICY IF EXISTS "Admins can read all user roles" ON public.user_roles;
CREATE POLICY "Admins can read all user roles"
ON public.user_roles FOR SELECT
USING (
  (SELECT (raw_user_meta_data->>'role')::text = 'admin' FROM auth.users WHERE id = auth.uid())
);

DROP POLICY IF EXISTS "Users can read their own roles" ON public.user_roles;
CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Only admins can insert user roles" ON public.user_roles;
CREATE POLICY "Only admins can insert user roles"
ON public.user_roles FOR INSERT
WITH CHECK (
  (SELECT (raw_user_meta_data->>'role')::text = 'admin' FROM auth.users WHERE id = auth.uid())
);

DROP POLICY IF EXISTS "Only admins can update user roles" ON public.user_roles;
CREATE POLICY "Only admins can update user roles"
ON public.user_roles FOR UPDATE
USING (
  (SELECT (raw_user_meta_data->>'role')::text = 'admin' FROM auth.users WHERE id = auth.uid())
);

-- Add the table to realtime publication
alter publication supabase_realtime add table public.user_roles;