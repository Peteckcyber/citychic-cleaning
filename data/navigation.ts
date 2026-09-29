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

/** Every route that should appear in the sitemap, beyond the service pages. */
export const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/gallery", priority: 0.7 },
  { path: "/contact", priority: 0.8 },
] as const;
