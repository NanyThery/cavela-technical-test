import type { Metadata } from "next";
import "@/styles/global.css";

export const metadata: Metadata = {
  title: "Cavela Test App",
  description: "Quotation Management System for Cavela Test App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="pageContainer">{children}</div>
      </body>
    </html>
  );
}
