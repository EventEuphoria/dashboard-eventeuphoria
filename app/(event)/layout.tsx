
import TopNav from "./components/TopNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <TopNav />
        <div>{children}</div>
      </div>
  );
}
