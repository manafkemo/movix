import { redirect } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ lang: "en" | "ar" }> }) {
  const { lang } = await params;
  redirect(`/${lang}/light`);
}
