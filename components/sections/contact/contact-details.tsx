import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

import { company, primaryPhone } from "@/data/company";
import { ExternalLink } from "@/components/shared/external-link";
import { InstagramIcon } from "@/components/shared/instagram-icon";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { buildWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const openDays: readonly string[] = company.hours.days;

/** "08:00" becomes "8:00 am", "18:00" becomes "6:00 pm". */
function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "pm" : "am";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

const openHours = `${formatTime(company.hours.opens)} to ${formatTime(company.hours.closes)}`;

/** Every way to reach CityChic, each one tappable. */
export function ContactDetails() {
  const channels = [
    {
      icon: Phone,
      label: "Call us",
      value: primaryPhone.display,
      href: `tel:${primaryPhone.tel}`,
      external: false,
    },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: "Chat with our team",
      href: buildWhatsAppUrl(whatsappMessages.general),
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: company.email,
      href: `mailto:${company.email}`,
      external: false,
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: company.instagram.handle,
      href: company.instagram.url,
      external: true,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="gap-0 py-2">
        <CardContent className="px-6">
          <ul>
            {channels.map(({ icon: Icon, label, value, href, external }, index) => {
              const content = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      {label}
                    </span>
                    <span className="truncate font-semibold text-ink group-hover:text-brand">
                      {value}
                    </span>
                  </span>
                </>
              );
              const rowClass =
                "group flex items-center gap-4 rounded-lg py-4 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30";
              return (
                <li key={label}>
                  {index > 0 && <Separator />}
                  {external ? (
                    <ExternalLink href={href} showIcon={false} className={rowClass}>
                      {content}
                    </ExternalLink>
                  ) : (
                    <a href={href} className={rowClass}>
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <Card className="gap-0 py-0">
        <CardHeader className="border-b py-5">
          <CardTitle className="flex items-center gap-2.5 text-base">
            <MapPin className="size-5 text-brand" aria-hidden="true" />
            <h3>Our Office</h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 py-5">
          <address className="leading-relaxed text-ink not-italic">{company.fullAddress}</address>
          <ExternalLink
            href={company.mapUrl}
            showIcon={false}
            className={buttonVariants({ variant: "outline", className: "w-full sm:w-fit" })}
          >
            <Navigation aria-hidden="true" />
            Get Directions
          </ExternalLink>
        </CardContent>
      </Card>

      <Card className="gap-0 py-0">
        <CardHeader className="border-b py-5">
          <CardTitle className="flex items-center gap-2.5 text-base">
            <Clock className="size-5 text-brand" aria-hidden="true" />
            <h3>Opening Hours</h3>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <table className="w-full text-sm">
            <caption className="sr-only">CityChic opening hours</caption>
            <tbody>
              {week.map((day) => {
                const open = openDays.includes(day);
                return (
                  <tr key={day} className="border-b last:border-0">
                    <th scope="row" className="py-3 text-left font-medium text-ink">
                      {day}
                    </th>
                    <td
                      className={cn(
                        "py-3 text-right tabular-nums",
                        open ? "text-muted-foreground" : "font-semibold text-destructive",
                      )}
                    >
                      {open ? openHours : "Closed"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
