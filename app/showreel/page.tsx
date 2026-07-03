import type { Metadata } from "next";
import { ShowreelLanding } from "./ShowreelLanding";

export const metadata: Metadata = {
  title: "Showreel vidéo & photo",
  description:
    "Sélection vidéo et photo Studi.0x: films de présentation, formats courts, portraits et séries visuelles.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/showreel",
  },
};

export default function ShowreelPage() {
  return <ShowreelLanding />;
}
