import * as React from "react";
import { cn } from "@/lib/utils";

interface PopoverContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}
const PopoverContext = React.createContext<PopoverContextValue | null>(null);

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({ open, onOpenChange, children }) => {
  const [internal, setInternal] = React.useState(false);
  const isOpen = open ?? internal;
  const setOpen = (v: boolean) => {
    if (onOpenChange) {
      onOpenChange(v);
    } else {
      setInternal(v);
    }
  };
  return <PopoverContext.Provider value={{ open: isOpen, setOpen }}>{children}</PopoverContext.Provider>;
};

export const PopoverTrigger: React.FC<{ asChild?: boolean } & React.HTMLAttributes<HTMLButtonElement>> = ({ asChild, children, className, ...props }) => {
  const ctx = React.useContext(PopoverContext)!;
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, {
      onClick: (e: any) => {
        (children as any).props?.onClick?.(e);
        ctx.setOpen(!ctx.open);
      },
    });
  }
  return (
    <button className={cn(className)} onClick={() => ctx.setOpen(!ctx.open)} {...props}>
      {children}
    </button>
  );
};

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

export const PopoverContent: React.FC<PopoverContentProps> = ({ className, align = "center", side = "bottom", sideOffset = 8, children, ...props }) => {
  const ctx = React.useContext(PopoverContext)!;
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && ctx.setOpen(false);
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [ctx]);

  if (!ctx.open) return null;

  const sideClass =
    side === "top"
      ? "bottom-full"
      : side === "left"
      ? "right-full"
      : side === "right"
      ? "left-full"
      : "top-full";

  const alignClass = (() => {
    if (side === "left" || side === "right") {
      if (align === "start") return "top-0";
      if (align === "end") return "bottom-0";
      return "top-1/2 -translate-y-1/2";
    }
    if (align === "start") return "left-0";
    if (align === "end") return "right-0";
    return "left-1/2 -translate-x-1/2";
  })();

  const offsetClass = (() => {
    const scale: Record<number, string> = { 0: "", 4: "1", 8: "2", 12: "3", 16: "4" };
    const size = scale[sideOffset];
    if (!size) return "";
    if (side === "top") return `mb-${size}`;
    if (side === "left") return `mr-${size}`;
    if (side === "right") return `ml-${size}`;
    return `mt-${size}`;
  })();

  return (
    <div className="relative inline-block">
      <div
        ref={ref}
        className={cn(
          "absolute z-50 rounded-md border bg-white shadow-md",
          sideClass,
          alignClass,
          offsetClass,
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
