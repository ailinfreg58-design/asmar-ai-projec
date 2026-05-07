import { Activity, Radio, Shield } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Football AI</h1>
              <p className="text-xs text-muted-foreground">
                مباريات حية + تنبؤات ذكية
              </p>
            </div>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link
              href="/live"
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-full transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <Radio className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-red-500">مباشر</span>
            </Link>
            
            <Link
              href="/admin/login"
              className="flex items-center gap-2 bg-muted hover:bg-muted/80 px-4 py-2 rounded-full transition-colors"
            >
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">الإدارة</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
