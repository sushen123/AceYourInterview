import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ChatProvider } from "@/hooks/useChat";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react"
 
export const metadata: Metadata = {
  title: "Ace Your Interview",
  description: "Ace your interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ChatProvider>
    <html lang="en">
      <body className={` scroll-smooth`}>    
        <Toaster /> 
        {children} 
        </body>
    </html>
    </ChatProvider>
    </SessionProvider>
  
  );
}