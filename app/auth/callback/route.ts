import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const redirect = searchParams.get("redirect") || "/";

    if (code) {
        const cookieStore = await cookies();
        const supabase = createServerClient(
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
                            // ignore
                        }
                    },
                },
            }
        );

        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(`${origin}${redirect}`);
}
