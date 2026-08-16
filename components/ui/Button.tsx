import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out)] " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-contrast shadow-[var(--shadow-subtle)] hover:bg-accent-hover",
  secondary:
    "border border-line-strong text-ink hover:border-ink-3 hover:bg-surface",
  ghost: "text-ink-2 hover:text-ink hover:bg-surface",
};

/* 44px / 36px — both comfortably above the 24px WCAG 2.2 target minimum, and
   the default sits at the 44px iOS guideline. */
const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  sm: "h-9 px-3.5 text-[0.875rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  /** Icon placement. Trailing icons animate on hover; leading ones do not. */
  iconPosition?: "leading" | "trailing";
  children: ReactNode;
  className?: string;
}

const iconMotion: Record<IconName | "default", string> = {
  "arrow-up-right":
    "transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  "arrow-right":
    "transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5",
  download:
    "transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-y-0.5",
} as Record<IconName | "default", string>;

function Inner({ icon, iconPosition = "trailing", children }: CommonProps) {
  const glyph = icon ? (
    <Icon name={icon} size={16} className={iconMotion[icon] ?? ""} />
  ) : null;

  return (
    <>
      {iconPosition === "leading" && glyph}
      <span>{children}</span>
      {iconPosition === "trailing" && glyph}
    </>
  );
}

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
    /** Renders a plain <a> instead of next/link — for mailto, files, external. */
    external?: boolean;
  };

export function ButtonLink({
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  icon,
  iconPosition,
  children,
  ...rest
}: LinkButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <Inner icon={icon} iconPosition={iconPosition}>
      {children}
    </Inner>
  );

  if (external) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

export function Button({
  variant = "primary",
  size = "md",
  className,
  icon,
  iconPosition,
  children,
  type = "button",
  ...rest
}: NativeButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      <Inner icon={icon} iconPosition={iconPosition}>
        {children}
      </Inner>
    </button>
  );
}

/**
 * Shown in place of a button when the destination has not been supplied yet —
 * a disabled control that explains itself is better UX than a link to nowhere,
 * and better than silently hiding a primary action.
 */
export function UnavailableButton({
  children,
  size = "md",
  reason,
  className,
}: {
  children: ReactNode;
  size?: Size;
  reason: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        base,
        sizes[size],
        "cursor-not-allowed border border-dashed border-line-strong text-ink-3",
        className,
      )}
      title={reason}
      aria-disabled="true"
      role="link"
    >
      {children}
    </span>
  );
}
