import { Toaster } from "react-hot-toast";
import { UserMetaProvider } from "@/lib/context/UserMetaContext";
import { SearchProvider } from "@/lib/context/SearchContext";
import LayoutContent from "@/components/layout/LayoutContent";

export default function AuthenticatedLayout({ children }) {
  return (
    <SearchProvider>
      <UserMetaProvider userId="current-user-id">
        <LayoutContent>
          {children}
        </LayoutContent>
        <Toaster position="top-center" reverseOrder={false} />
      </UserMetaProvider>
    </SearchProvider>
  );
} 