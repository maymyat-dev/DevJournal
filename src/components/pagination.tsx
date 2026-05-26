"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

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
    <div className="flex items-center gap-4">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;