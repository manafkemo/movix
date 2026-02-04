import { Button } from "@/components/ui/Button"
import { RequestDeliveryModal } from "@/components/RequestDeliveryModal"

export default function CTA({ dict }: { dict: any }) {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 text-center">
                {/* 
            User said "NO navy/blue/charcoal backgrounds".
            I will use a Red gradient for CTA to keep it on brand, or a neutral card.
            Let's use a Red gradient as it is the primary accent.
        */}
                <div className="max-w-3xl mx-auto rounded-3xl bg-primary text-primary-foreground p-12 md:p-16 shadow-2xl overflow-hidden relative">

                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 opacity-90" />
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                            {dict.cta.title}
                        </h2>
                        <p className="text-lg text-red-100 mb-10 max-w-xl mx-auto">
                            {dict.cta.description}
                        </p>
                        <RequestDeliveryModal dict={dict}>
                            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg hover:bg-background/90 text-foreground">
                                {dict.cta.button}
                            </Button>
                        </RequestDeliveryModal>
                    </div>
                </div>
            </div>
        </section>
    )
}
