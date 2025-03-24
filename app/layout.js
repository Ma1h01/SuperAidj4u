import { Inter } from "next/font/google";
import "../styles/main.scss";
import { Toaster } from "react-hot-toast";
import { UserMetaProvider } from "@/lib/context/UserMetaContext";
import { SearchProvider } from "@/lib/context/SearchContext";
import LayoutContent from "@/components/layout/LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SupuerAidj4u",
  description: "Innovate your e-commerce orders and inventory management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SearchProvider>
          <UserMetaProvider userId="current-user-id">
            <LayoutContent>
              {children}
            </LayoutContent>
            <Toaster position="top-center" reverseOrder={false} />
          </UserMetaProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
