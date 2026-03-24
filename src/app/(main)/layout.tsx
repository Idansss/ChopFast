import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import ThemeProvider from "@/components/providers/ThemeProvider";
import PageTransition from "@/components/providers/PageTransition";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <MobileNav />
    </ThemeProvider>
  );
}
