
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import HeaderSwitcher from "@/components/HeaderSwitcher/Headerswitcher";
import LayoutWrapper from "@/components/layoutwrapper/layoutwrapper";
import { generateSEOMetadata } from "../../lib/seometadata";
import { AuthProvider } from "@/context/AuthContext";



const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space",
});
export const metadata : Metadata ={
   // 👇 keep global defaults here
    title: {
      default: "Estate AI",
      template: "%s | Estate AI",
    },

    manifest: "/manifest.json",

    icons: {
      icon: "/icons/icon-192.png",
      apple: "/icons/icon-192.png",
    },
}
export const viewport: Viewport = {
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased text-slate-900 `}>
       <AuthProvider>
        <div className=" bg-[var(--bg-secondary)]">
          
       <LayoutWrapper>
        {children}
        
        </LayoutWrapper> 
        </div>
      </AuthProvider>
      </body>
    </html>
  );
}