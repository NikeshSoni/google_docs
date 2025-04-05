import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConvexClientProvider } from "@/components/convex-client-providers";
import { Toaster } from "@/components/ui/sonner";


const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <NuqsAdapter>
          <ConvexClientProvider >
            <Toaster />
            {children}
          </ConvexClientProvider >
        </NuqsAdapter>
      </body>
    </html>
  );
}
