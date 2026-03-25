import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageTracker } from "@/components/page-tracker";
import { Toaster } from "sonner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <PageTracker />
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster position="bottom-center" richColors />
    </div>
  );
}
