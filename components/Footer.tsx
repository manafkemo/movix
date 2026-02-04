import Link from "next/link"
import { Package2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer({ dict }: { dict: any }) {
    return (
        <footer className="bg-secondary border-t border-border pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
                        <Link href="/" className="block">
                            <div className="h-7 w-auto dark:hidden">
                                <Image
                                    src="/assist/images/movix-logo-light-mood.png"
                                    alt="Movix"
                                    width={1024}
                                    height={110}
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                            <div className="relative w-40 h-10 hidden dark:block">
                                <Image
                                    src="/assist/images/movix-logo-dark-mood.png"
                                    alt="Movix"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {dict.footer.description}
                        </p>
                        <div className="flex gap-4 mt-2">
                            <Link href="#" className="bg-background p-2 rounded-full hover:text-primary transition-colors shadow-sm border border-border"><Facebook className="h-4 w-4" /></Link>
                            {/* <Link href="#" className="bg-background p-2 rounded-full hover:text-primary transition-colors shadow-sm border border-border"><Twitter className="h-4 w-4" /></Link> */}
                            <Link href="#" className="bg-background p-2 rounded-full hover:text-primary transition-colors shadow-sm border border-border"><Instagram className="h-4 w-4" /></Link>
                            {/* <Link href="#" className="bg-background p-2 rounded-full hover:text-primary transition-colors shadow-sm border border-border"><Linkedin className="h-4 w-4" /></Link> */}
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h3 className="font-bold text-foreground mb-4">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    {/* <div>
                        <h3 className="font-bold text-foreground mb-4">Support</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{dict.footer.links.terms}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">{dict.footer.links.privacy}</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Status</Link></li>
                        </ul>
                    </div> */}

                    {/* Contact Column */}
                    <div>
                        <h3 className="font-bold text-foreground mb-4">{dict.footer.links.contact}</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>moooovix@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>556 673 775 967+</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>Cairo Street, Sana'a</span>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} {dict.footer.copyright}</p>
                     {/* Manaf Kemo Image and the Instagram link  */}

                      <div dir="ltr" className="flex items-center gap-3 text-sm text-muted-foreground">
                         
                     <Link
                         href="https://www.instagram.com/manafkemo/"
                         target="_blank"
                         className="rounded-full transition-transform group-hover:scale-110"
                      >
                        <Image
                            src="/assist/images/manaf-avatar.png"
                            alt="Manaf Kemo"
                            width={45}  
                            height={45}
                            className="rounded-full transition-transform group-hover:scale-110"
                         />
                       </Link>
                           <div className="flex flex-col gap-0.5">
                        <span>Hey Curious 👋</span>
                        <span className="font-medium text-foreground">
                             I'm <span className="font-bold">Manaf Kemo</span>, the creator of Movix.
                        </span>

                        <span>
                             You can follow my work on{' '}
                             <Link
                                 href="https://www.instagram.com/manafkemo/"
                                 target="_blank"
                                 className="text-primary hover:underline font-medium transition-colors"
                              >
                                 Instagram
                             </Link>.
                         </span>
                      </div>
                   </div>
                </div>
             </div>
        </footer>
    )
}
