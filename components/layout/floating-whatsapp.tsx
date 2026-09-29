import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { buildWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";

/** Site-wide floating button that opens a WhatsApp chat with CityChic directly. */
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CityChic on WhatsApp"
      className="group fixed right-5 bottom-5 z-50 flex items-center gap-3 sm:right-8 sm:bottom-8"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink opacity-0 shadow-lg ring-1 ring-black/5 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        Chat with us on WhatsApp
      </span>
      <span className="relative flex size-16 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-40 [animation-duration:2.4s] motion-reduce:hidden"
        />
        <span className="relative flex size-16 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.65)] ring-4 ring-white transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110 group-focus-visible:ring-whatsapp/40">
          <WhatsAppIcon className="size-8" />
        </span>
      </span>
    </a>
  );
}
