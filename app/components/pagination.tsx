"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { getPaginationParams, PAGINATION_LIMITS } from "../utils";

type PaginationButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  href: string;
};

function PaginationButton(props: PaginationButtonProps) {
  const { children, disabled, href } = props;

  const className = cn(
    buttonVariants({ variant: "outline" }),
    "h-8 w-8 p-0",
    disabled && "pointer-events-none opacity-50",
  );

  return disabled ? (
    <div area-disabled="true" className={className}>
      {children}
    </div>
  ) : (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

export type PaginationProps = {
  totalPages: number;
};

export function Pagination(props: PaginationProps) {
  const { totalPages } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { limit, page } = getPaginationParams(searchParams);

  useEffect(() => {
    if (page > totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set("page", totalPages.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [page, pathname, router, searchParams, totalPages]);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const setPage = (pageNumber: number | string) => {
    router.replace(createPageURL(pageNumber));
  };

  const setPageSize = (pageSize: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", pageSize.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="fixed bottom-16 left-0 right-0 m-auto flex w-[590px] justify-center space-x-6 rounded-md border bg-white/30 p-4 drop-shadow-sm backdrop-blur lg:space-x-8 dark:bg-black/30">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Items per page</p>
        <Select
          value={`${limit}`}
          onValueChange={(value) => {
            setPageSize(value);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {PAGINATION_LIMITS.map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex shrink-0 items-center justify-center text-sm font-medium">
        Page&ensp;
        <Select
          value={`${page}`}
          onValueChange={(value) => {
            setPage(value);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {Array.from({ length: totalPages }, (_, ix) => {
              const p = ix + 1;
              return (
                <SelectItem key={p} value={`${p}`}>
                  {p}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        &ensp;of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <PaginationButton disabled={page === 1} href={createPageURL(1)}>
          <span className="sr-only">Go to first page</span>
          <ChevronsLeftIcon className="h-4 w-4" />
        </PaginationButton>
        <PaginationButton disabled={page === 1} href={createPageURL(page - 1)}>
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </PaginationButton>
        <PaginationButton
          disabled={page === totalPages}
          href={createPageURL(page + 1)}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </PaginationButton>
        <PaginationButton
          disabled={page === totalPages}
          href={createPageURL(totalPages)}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRightIcon className="h-4 w-4" />
        </PaginationButton>
      </div>
    </section>
  );
}
