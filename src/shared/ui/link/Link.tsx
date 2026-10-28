import { AnchorHTMLAttributes, ReactNode } from "react";
import NextLink from "next/link";
import { cn } from "@/shared/lib/cn";
import { LinkVariantKey, linkVariantKeys } from "@/shared/ui/link/link-variant-key";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: ReactNode;
    variant?: LinkVariantKey;
    className?: string;
}

const baseStyles =
    "text-sm transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants: Record<LinkVariantKey, string> = {
    primary: "text-foreground",
    secondary: "text-secondary-foreground",
    underline: "text-foreground underline",
};

export function Link({ href, children, variant = linkVariantKeys.primary, className, ...props }: LinkProps) {
    return (
        <NextLink href={href} {...props} className={cn(baseStyles, variants[variant], className)}>
            {children}
        </NextLink>
    );
}
