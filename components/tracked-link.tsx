"use client";

import { AnchorHTMLAttributes } from "react";
import Link from "next/link";
import LuciaSDK from "lucia-sdk";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  trackingName?: string;
  href: string;
  // Add optional next/link props
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
}

export default function TrackedLink({
  onClick,
  trackingName,
  id,
  children,
  "aria-label": ariaLabel,
  href,
  prefetch,
  replace,
  scroll,
  shallow,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const linkName =
      trackingName ||
      id ||
      ariaLabel ||
      (typeof children === "string" ? children : "") ||
      "unnamed-link";

    // Track the click
    LuciaSDK.buttonClick(linkName);

    // Call the original onClick if it exists
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      onClick={handleClick}
      id={id}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Link>
  );
}
