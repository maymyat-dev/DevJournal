"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useDebouncedCallback} from 'use-debounce'

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
  )
  return (
    <div>
      <Input placeholder={placeholder} onChange={handleSearch} defaultValue={searchParams.get("search") || ""} />
    </div>
  );
};

export default SearchInput;
