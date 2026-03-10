import { WorkPageClient } from "@/components/work-page-client";
import { getAllProjects } from "@/lib/content";

export default function WorkPage() {
  const projectsByLocale = {
    en: getAllProjects("en"),
    fr: getAllProjects("fr"),
  } as const;

  return <WorkPageClient projectsByLocale={projectsByLocale} />;
}
