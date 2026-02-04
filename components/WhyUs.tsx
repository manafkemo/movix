import { CheckCircle2 } from "lucide-react"

export default function WhyUs({ dict }: { dict: any }) {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                            {dict.whyUs.title}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            {dict.whyUs.description}
                        </p>
                        <div className="space-y-4">
                            {dict.whyUs.items.map((reason: any, index: number) => (
                                <div key={index} className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <CheckCircle2 className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{reason.title}</h3>
                                        <p className="text-muted-foreground">{reason.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-full min-h-[400px] rounded-3xl bg-secondary p-8 flex items-center justify-center border border-border">
                        {/* Abstract Visual Representation - Neutral/Red */}
                        <div className="relative w-full max-w-sm aspect-square bg-primary/10 rounded-full blur-3xl opacity-60 animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-card backdrop-blur-md p-8 rounded-2xl shadow-xl border border-border max-w-xs text-center">
                                <p className="text-2xl font-bold text-primary">100%</p>
                                <p className="text-sm text-muted-foreground">{dict.whyUs.reliability}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
