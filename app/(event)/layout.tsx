import ProtectedRoute from "@/components/ProtectedRoute";
import TopNav from "./components/TopNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div>
        <TopNav />
        <div>{children}</div>
      </div>
    </ProtectedRoute>
  );
}
