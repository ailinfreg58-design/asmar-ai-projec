import { Header } from "@/components/header";
import { MatchList } from "@/components/match-list";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">المباريات الحية</h2>
          <p className="text-muted-foreground">
            تابع المباريات واحصل على تنبؤات الذكاء الاصطناعي
          </p>
        </div>
        <MatchList />
      </main>
    </div>
  );
}
