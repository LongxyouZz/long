"use client";
import { UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { createClient } from "../../supabase/client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";

export default function UserProfile() {
  const supabase = createClient();
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserCircle className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={async () => {
            await supabase.auth.signOut();
            router.refresh();
          }}
        >
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
