export const siteConfig = {
  name: "Taha Rasheed",
  business: "Royal Metalworks",
  phone: "+92 300 1234567",
  whatsappNumber: "923001234567", // digits only, country code first, no + or spaces
  email: "taha.rasheed@email.com",
  location: "Karachi, Pakistan",
  socials: {
    instagram: "https://instagram.com/your-account",
    facebook: "https://facebook.com/your-page",
  },
};

export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}`;
export const telUrl = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
export const mailUrl = `mailto:${siteConfig.email}`;

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#portfolio" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];