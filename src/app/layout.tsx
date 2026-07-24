import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TinkerHub SCET - Make it real",
  description: "The student maker community at SCET.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
