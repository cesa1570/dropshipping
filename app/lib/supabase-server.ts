import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerSupabase() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lrykssxcewdnvuysfouy.supabase.co",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyeWtzc3hjZXdkbnZ1eXNmb3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MzE1MTYsImV4cCI6MjA4NjMwNzUxNn0.5ToHsUgmdKETd-ZFxoFNw4oaV206ib0lpephfwJzH64",
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // This can be ignored in Server Components
                    }
                },
            },
        }
    );
}

export async function createAdminClient() {
    const { createClient } = await import("@supabase/supabase-js");
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co",
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy_key",
        {
            auth: {
                persistSession: false,
            },
        }
    );
}
