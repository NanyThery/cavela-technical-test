import type { Metadata } from "next";
import "@/styles/global.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

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
        <MantineProvider>
          <div className="pageContainer">{children}</div>
        </MantineProvider>
      </body>
    </html>
  );
}
