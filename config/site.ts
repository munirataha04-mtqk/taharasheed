export const siteConfig = {
  name: "Taha Rasheed",
  business: "Royal Metalworks",
  phone: "+255 765 053 786",
  whatsappNumber: "255765053786", // digits only, country code first, no + or spaces
  email: "taharasheed@gmail.com",
  location: "Ilala - Dar es Salaam",
  serviceLine: "Metal Cutting | CNC Custom Designs & Industrial Solutions",
  deliveryNote: "Tunasafirisha mikoa zote (We deliver to all regions)",
  socials: {
    instagram: "https://www.instagram.com/royalmetalworks/", // work
    instagramPersonal: "https://www.instagram.com/_taharasheed/", // personal
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