"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useDebouncedCallback } from 'use-debounce';
import { Search } from "lucide-react"; 

type Props = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const params = new URLSearchParams(searchParams.toString());
        
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }, 500
  );

  return (
    <div className="relative w-full group">
      <div className="absolute inset-y-0 left-3 z-10 flex items-center pointer-events-none text-muted-foreground/60 group-focus-within:text-primary transition-colors duration-300">
        <Search className="h-4 w-4 transition-transform duration-300 group-focus-within:scale-110" />
      </div>
      
      <Input
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={searchParams.get("search") || ""}
        className="w-full pl-9 pr-4 h-9 rounded-xl border  hover:bg-muted/60 backdrop-blur-md text-sm transition-all duration-300 placeholder:text-muted-foreground/50 focus-visible:bg-background focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default SearchInput;