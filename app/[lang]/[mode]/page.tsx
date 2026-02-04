import { getDictionary } from "../dictionaries";
import LandingPage from "@/components/LandingPage";
import { ThemeSync } from "@/components/ThemeSync";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return [
        { lang: "en", mode: "light" },
        { lang: "en", mode: "dark" },
        { lang: "ar", mode: "light" },
        { lang: "ar", mode: "dark" },
    ];
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: "en" | "ar"; mode: string }>;
}) {
    const { lang, mode } = await params;

    if (mode !== "light" && mode !== "dark") {
        notFound();
    }

    const dict = await getDictionary(lang);

    return (
        <>
            <ThemeSync mode={mode} />
            <LandingPage dict={dict} />
        </>
    );
}
