'use client';
import AppHeader from "@/components/app.header";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
        <AppHeader />
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
