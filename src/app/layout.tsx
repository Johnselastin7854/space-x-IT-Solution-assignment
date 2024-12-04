import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { Toaster } from "~/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpaceX IT Solutions | Assignments",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}