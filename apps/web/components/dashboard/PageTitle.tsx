/** @format */

import { cn } from "@repo/ui/lib/utils";
import React from "react";

type Props = {
  title: string;
  subtitle?: string | React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export default function PageTitle({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: Props) {
  return (
    <div className={cn("space-y-2 my-3", className)}>
      <h1 className={cn("text-2xl font-semibold", titleClassName)}>{title}</h1>
      {subtitle && (
        <div
          className={cn(
            "text-sm text-muted-foreground dark:text-black",
            subtitleClassName,
          )}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}
