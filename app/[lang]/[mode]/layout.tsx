import { ThemeProvider } from "@/app/providers";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import { ThemeEnforcer } from "@/components/ThemeEnforcer";

export default async function ModeLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string; mode: string }>;
}) {
    const { lang, mode } = await params;

    // Strict validation: Only 'light' or 'dark' allowed.
    if (mode !== "light" && mode !== "dark") {
        redirect(`/${lang}/light`);
    }

    return (
        <ThemeProvider
            attribute="class"
            forcedTheme={mode} // FORCE the theme to match URL
            enableSystem={false}
            disableTransitionOnChange
        >
            <ThemeEnforcer mode={mode as "light" | "dark"} />
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </ThemeProvider>
    );
}
