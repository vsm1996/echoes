import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import AuthProvider from "./auth/Provider";

const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Echoes",
  description: "Echoes is a personal growth and art journaling platform designed for creatives and reflective thinkers. Track your transformation through writing, visual art, and a supportive community. Express yourself, reflect deeply, and celebrate your journey with Echoes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="true-indigo">
      <body className={playfair.className}>
        <AuthProvider>
          <main className='bg-primary text-warmGray'>
            <Suspense fallback={<p>Looooader</p>}>
              {children}
            </Suspense>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
