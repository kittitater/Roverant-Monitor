import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/AuthLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Roverant Monitor",
  description: "A Web application for monitoring Security Guard Rover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/monitor.png" />
      </head> 
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
