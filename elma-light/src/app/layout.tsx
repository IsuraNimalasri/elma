import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Explicitly including weights, 400 is normal
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "elma-light",
  description: "A better way to study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} font-sans antialiased font-normal`} 
      >
        {children}
      </body>
    </html>
  );
}
