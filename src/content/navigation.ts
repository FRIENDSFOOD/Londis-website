/**
 * Main menu. `section` links scroll to a part of the home page; `page` links open a page.
 * The menu highlights the section currently on screen.
 */
export type NavItem = { label: string; to: string; section?: string };

export const mainNav: NavItem[] = [
  { label: "Products", to: "/#products", section: "products" },
  { label: "Delivery", to: "/#delivery", section: "delivery" },
  { label: "Services", to: "/#services", section: "services" },
  { label: "About", to: "/#about", section: "about" },
  { label: "Find Us", to: "/#location", section: "location" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];
