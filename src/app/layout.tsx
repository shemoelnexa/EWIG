import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "East & West International Group | Leading Real Estate in UAE",
  description:
    "Founded in 1993, EWIG is a leading integrated Real Estate Group in the UAE. Property management, leasing, and maintenance across Abu Dhabi, Dubai, Al Ain, and Sharjah.",
  openGraph: {
    title: "East & West International Group",
    description: "Leading Integrated Real Estate Group in the UAE since 1993",
    type: "website",
    locale: "en_AE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
