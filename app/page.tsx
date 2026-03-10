import { HomePageClient } from "@/components/home-page-client";
import { getFeaturedProjects } from "@/lib/content";

export default function HomePage() {
  const featuredProjectsByLocale = {
    en: getFeaturedProjects("en"),
    fr: getFeaturedProjects("fr"),
  } as const;

  return <HomePageClient featuredProjectsByLocale={featuredProjectsByLocale} />;
}
