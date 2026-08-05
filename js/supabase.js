import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ykldzfsbmlcjftfartax.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrbGR6ZnNibWxjamZ0ZmFydGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MzEyMDgsImV4cCI6MjEwMTQwNzIwOH0.HRygR3SId4YqtEwTFvE8tb5g7rnZtGJXXPNu7FLYlMs'

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
)