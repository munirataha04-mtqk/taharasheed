export type Category =
  | "Gates"
  | "Pergolas"
  | "Partitions"
  | "CNC Designs"
  | "Custom Fabrication";

export type Project = {
  id: string;
  title: string;
  category: Category;
  caption: string;
  image: string;
  alt: string;
  featured?: boolean;
};

export const projects: Project[] = [
  { id: "gate-1", title: "Gates", category: "Gates", caption: "Modern | Durable | Stylish", image: "/images/gate-1.jpg", alt: "Black horizontal-slat metal gate with laser-cut side panels", featured: true },
  { id: "pergola-1", title: "Pergolas", category: "Pergolas", caption: "Outdoor Living | Elegance", image: "/images/pergola-1.jpg", alt: "Black metal pergola over a garden seating area", featured: true },
  { id: "partition-1", title: "Partitions", category: "Partitions", caption: "Privacy | Modern Design", image: "/images/partition-1.jpg", alt: "Decorative laser-cut metal room partition", featured: true },
  { id: "cnc-1", title: "CNC Designs", category: "CNC Designs", caption: "Precision | Creativity", image: "/images/cnc-1.jpg", alt: "Intricate floral CNC-cut black metal panel", featured: true },
  { id: "railing-1", title: "Custom Work", category: "Custom Fabrication", caption: "Built Around Your Vision", image: "/images/railing-1.jpg", alt: "Decorative metal stair railing", featured: true },
  { id: "gate-2", title: "Entrance Gate", category: "Gates", caption: "Laser-cut detail", image: "/images/gate-2.jpg", alt: "Laser-cut entrance gate with warm backlight" },
  { id: "pergola-2", title: "Garden Pergola", category: "Pergolas", caption: "Shade with style", image: "/images/pergola-2.jpg", alt: "Metal pergola in an outdoor living space" },
  { id: "partition-2", title: "Screen Partition", category: "Partitions", caption: "Privacy with pattern", image: "/images/partition-2.jpg", alt: "Patterned metal screen dividing a room" },
  { id: "cnc-2", title: "Decorative Panel", category: "CNC Designs", caption: "Precision cutting", image: "/images/cnc-2.jpg", alt: "Close-up of a CNC-cut decorative metal panel" },
];

export const filterOptions = ["All Projects", "Gates", "Pergolas", "Partitions", "CNC Designs"] as const;