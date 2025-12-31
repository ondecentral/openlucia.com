"use client";

import { ButtonHTMLAttributes } from "react";
import LuciaSDK from "lucia-sdk";

interface TrackedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  trackingName?: string;
}

export default function TrackedButton({
  onClick,
  trackingName,
  id,
  children,
  "aria-label": ariaLabel,
  ...props
}: TrackedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName =
      trackingName ||
      id ||
      ariaLabel ||
      (typeof children === "string" ? children : "") ||
      "unnamed-button";

    // Track the click
    LuciaSDK.buttonClick(buttonName);

    // Call the original onClick if it exists
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button onClick={handleClick} id={id} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  );
}
