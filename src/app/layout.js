import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReduxProvider from "@/components/layout/ReduxProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from "lucide-react";
import SidebarMenu from "@/components/layout/SidebarMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "InfinityShoes - Premium Bike Helmets & Riding Gear",
  description: "Shop premium quality bike helmets, riding gear, and motorcycle accessories in Bangladesh. InfinityShoes offers authentic branded products with warranty and fast delivery across Bangladesh.",
  keywords: "bike helmet Bangladesh, motorcycle helmet, riding gear, bike accessories, InfinityShoes",
  authors: [{ name: "InfinityShoes" }],
  openGraph: {
    title: "InfinityShoes - Premium Bike Helmets & Riding Gear",
    description: "Shop premium quality bike helmets and riding gear in Bangladesh",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        <Header />
        <div className="grid grid-cols-12">
          <div className="hidden md:block col-span-2 sticky top-[81px] h-[calc(100dvh-81px)] border-r border-gray-200 bg-white overflow-y-auto">
            <SidebarMenu />
          </div>
          <div className="col-span-12 md:col-span-10">
            {children}
            <Footer />
          </div>
        </div>
        
        </ReduxProvider>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
