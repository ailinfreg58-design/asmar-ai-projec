"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Zap, TrendingUp, Calendar, BarChart3, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#live", label: "Live", labelAr: "مباشر", icon: Zap },
  { href: "#matches", label: "Match Center", labelAr: "مركز المباريات", icon: Calendar },
  { href: "#analysis", label: "AI Analysis", labelAr: "التحليل الذكي", icon: BarChart3 },
  { href: "#trending", label: "Trending", labelAr: "الأكثر متابعة", icon: TrendingUp },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 neon-glow-green transition-all duration-300 group-hover:scale-105">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">
                S-SPORTS
              </span>
              <span className="text-xs font-medium text-primary neon-text-green">
                كورة
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-primary/10"
              >
                <link.icon className="h-4 w-4 text-secondary transition-colors group-hover:text-primary" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-green transition-all duration-300"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-border/50">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
              >
                <link.icon className="h-5 w-5 text-secondary" />
                <div className="flex flex-col">
                  <span className="font-medium">{link.label}</span>
                  <span className="text-xs text-primary" dir="rtl">{link.labelAr}</span>
                </div>
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="outline" className="w-full border-border hover:border-primary">
                Sign In
              </Button>
              <Button className="w-full bg-primary text-primary-foreground neon-glow-green">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
