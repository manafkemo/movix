import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhyUs from "@/components/WhyUs";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function LandingPage({ dict }: { dict: any }) {
    return (
        <main className="flex min-h-screen flex-col">
            <Hero dict={dict} />
            <Features dict={dict} />
            <WhyUs dict={dict} />
            <HowItWorks dict={dict} />
            <CTA dict={dict} />
            <Footer dict={dict} />
        </main>
    );
}
