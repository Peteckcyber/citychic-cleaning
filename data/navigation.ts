export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const companyNav: NavLink[] = [
  { label: "About CityChic", href: "/about" },
  { label: "Our Work", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];
