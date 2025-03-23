import { Inter } from "next/font/google";
import "../styles/main.scss";
import { Toaster } from "react-hot-toast";
import { UserMetaProvider } from "@/lib/context/UserMetaContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SupuerAidj4u",
  description: "Innovate your e-commerce orders and inventory management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <UserMetaProvider userId="current-user-id">
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </UserMetaProvider>
      </body>
    </html>
  );
}
