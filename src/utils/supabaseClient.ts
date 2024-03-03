import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://dspxcqvldqopoyidkyfj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzcHhjcXZsZHFvcG95aWRreWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MTUxMjMsImV4cCI6MjAxMzM5MTEyM30.Uc7Ne2lHoViqm111nNUlTzT07MFo0Jb--HLZ7TEKIA4'
);
