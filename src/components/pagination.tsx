"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  totalPages: number;
  currentPage: number;
}

const Pagination = ({ totalPages, currentPage }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (newPageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPageNumber > 1) {
      params.set("page", newPageNumber.toString());
    } else {
      params.delete("page");
    }

      replace(`${pathname}?${params.toString()}`, {
        scroll: false
    });
  };

  if (totalPages <= 1) return null;

  return (
   

<div className="flex items-center justify-between pb-20">
  <div className="-mt-px flex w-0 flex-1">
    <Button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage <= 1}
      variant="ghost" // Assuming Shadcn/Radix style variant
      className="inline-flex items-center gap-2 border-t-2 border-transparent pt-4 pr-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:hover:border-transparent"
    >
      <ArrowLeft className="h-4 w-4" />
      Previous
    </Button>
  </div>
  
  <div className="hidden md:-mt-px md:flex">
    <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium">
      Page {currentPage} of {totalPages}
    </span>
  </div>

  <div className="-mt-px flex w-0 flex-1 justify-end">
    <Button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage >= totalPages}
      variant="ghost"
      className="inline-flex items-center gap-2 border-t-2 border-transparent pt-4 pl-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:hover:border-transparent"
    >
      Next
      <ArrowRight className="h-4 w-4" />
    </Button>
  </div>
</div>
  );
};

export default Pagination;