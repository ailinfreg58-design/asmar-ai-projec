import Link from "next/link"
import { Zap, Twitter, Instagram, Youtube, MessageCircle, Mail, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  product: [
    { label: "Live Scores", href: "#" },
    { label: "Match Center", href: "#matches" },
    { label: "AI Analysis", href: "#analysis" },
    { label: "Statistics", href: "#" },
    { label: "Predictions", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Responsible Gaming", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Community", href: "#" },
    { label: "API Docs", href: "#" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: MessageCircle, href: "#", label: "Discord" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/50">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-border">
          <div className="glass-card rounded-2xl p-6 md:p-10 glow-border-green">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Stay in the <span className="text-primary neon-text-green">Game</span>
                </h3>
                <p className="text-lg text-secondary font-medium" dir="rtl">ابقَ على اطلاع</p>
                <p className="text-muted-foreground mt-2">
                  Get exclusive AI predictions and match alerts delivered to your inbox
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-green px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 neon-glow-green">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">S-SPORTS</span>
                <span className="text-xs font-medium text-primary">كورة</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              The ultimate AI-powered sports data platform for enthusiasts and professionals alike.
            </p>
            <p className="text-sm text-secondary mb-6" dir="rtl">
              منصة النتائج الرياضية المدعومة بالذكاء الاصطناعي
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>English</span>
            <span className="mx-2">|</span>
            <span dir="rtl">العربية</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} S-SPORTS Kora. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            18+ | Gamble Responsibly
          </p>
        </div>
      </div>
    </footer>
  )
}
