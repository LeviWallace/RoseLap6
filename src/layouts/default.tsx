import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="container pt-4 mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
