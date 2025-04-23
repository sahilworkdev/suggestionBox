import Footer from "@/components/layout/footer";
import { MessageCircleHeart } from "lucide-react";
import Link from "next/link";

export default function ReceiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-0">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 mx-auto">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold flex items-center justify-center gap-1">
                <MessageCircleHeart /> Suggestion Box
              </span>
            </Link>
          </div>
        </div>
      </header>
      {children}
      <Footer />
    </div>
  );
}
