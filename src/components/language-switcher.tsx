"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

const LanguageSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"sm"}>
          <Globe size={ICON_SIZE} className={"text-muted-foreground"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(value) => setLanguage(value as "en" | "km")}
        >
          <DropdownMenuRadioItem className="flex gap-2" value="en">
            <span>{t("english")}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="km">
            <span>{t("khmer")}</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LanguageSwitcher };
