import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.scss";

const albert = Albert_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={albert.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
