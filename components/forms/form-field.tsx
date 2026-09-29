import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  /** Use for grouped controls (steppers) that are not labelable elements. */
  labelAsText?: boolean;
  className?: string;
  children: ReactNode;
};

export function FormField({
  id,
  label,
  required,
  error,
  hint,
  labelAsText,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {labelAsText ? (
        <span id={`${id}-label`} className="text-sm font-medium text-ink">
          {label}
        </span>
      ) : (
        <Label htmlFor={id}>
          {label}
          {required && (
            <span className="text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </Label>
      )}
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="text-xs text-muted-foreground">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
