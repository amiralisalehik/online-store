import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";

const iransans = localFont({
  src: [
    {
      path: "../public/fonts/IRANSans_UltraLight.ttf",
      weight: "200",
    },
    {
      path: "../public/fonts/IRANSans.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/IRANSans_Medium.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/IRANSans_Bold.ttf",
      weight: "900",
    },
  ],
  variable: "--font-iransans",
});

export const metadata = {
  title: "سایت فروشگاهی ",
  description: "online store created by Next JS",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${iransans.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header></Header>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
