-- Create projects table
create table projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  image_url text not null,
  site_url text not null,
  category text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table projects enable row level security;

-- Create policy to allow anyone to view projects
create policy "Anyone can view projects"
on projects for select
using (true);

-- Create policy to allow authenticated users to manage projects
create policy "Authenticated users can manage projects"
on projects for all
using (auth.role() = 'authenticated');
