import type { SanityImage } from "@/types/service";

export interface TeamMember {
  _id: string;
  order: number;
  name: string;
  position: string;
  link?: string;
  photo: SanityImage;
}
