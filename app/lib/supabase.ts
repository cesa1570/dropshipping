import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lrykssxcewdnvuysfouy.supabase.co",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyeWtzc3hjZXdkbnZ1eXNmb3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MzE1MTYsImV4cCI6MjA4NjMwNzUxNn0.5ToHsUgmdKETd-ZFxoFNw4oaV206ib0lpephfwJzH64"
    );
}
