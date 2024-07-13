import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import SideNav from "@/components/SideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
    <div className="">
        <div className="flex gap-3 w-full relative">
          <div className="md:w-[18%] relative">
            <SideNav />
          </div>
          <div className="mr-5 flex flex-col gap-2 md:w-[82%] justify-between">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
    </div>
    </ProtectedRoute>
  );
}
