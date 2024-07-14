import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
        <div className="flex gap-3 w-full relative">
          <div className="md:w-[18%] relative">
            <SideNav />
          </div>
          <div className="mr-5 flex flex-col gap-2 md:w-[82%]">
            <Header />
            <div className="">
              {children}
            </div>
            
          </div>
        </div>
    </div>
  );
}
