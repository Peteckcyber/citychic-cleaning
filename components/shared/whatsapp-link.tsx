import type { ComponentProps } from "react";
import { MessageCircle } from "lucide-react";

import { buildWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

type WhatsAppLinkProps = Omit<ComponentProps<"a">, "href" | "target" | "rel"> & {
  message?: string;
  showIcon?: boolean;
};

/** A click-to-chat link with a prefilled message. Style it with buttonVariants. */
export function WhatsAppLink({
  message = whatsappMessages.general,
  showIcon = true,
  children,
  ...props
}: WhatsAppLinkProps) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {showIcon && <MessageCircle aria-hidden="true" />}
      {children}
    </a>
  );
}
