import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokemon app",
  description: "A Pokemon app",
  alternates: {
    canonical: "https://example.com",
  },
  keywords: ["pokemon", "pokedex"],
  // more metadata here
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col w-full h-screen">
          <header className="flex gap-6 items-center justify-center bg-slate-600 p-4">
            <div className="w-full flex gap-4">
              <Link className="hover:underline" href="/">
                Home
              </Link>
              <div> | </div>
              <Link className="hover:underline" href="/posts">
                Posts
              </Link>
            </div>
          </header>
          <main className="flex flex-col items-center sm:items-start flex-1 m-4">
            {children}
          </main>
          <footer className=" flex flex-wrap items-center justify-center p-4 bg-slate-700">
            Demo
          </footer>
        </div>
      </body>
    </html>
  );
}
