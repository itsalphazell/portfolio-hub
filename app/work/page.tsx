import { SiteShell } from "@/components/site-shell";
import { WorkArchive } from "@/components/work-archive";
import { getAllProjects } from "@/lib/content";

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <SiteShell>
      <main className="page-shell space-y-10 pb-12 pt-12">
        <section className="space-y-4">
          <p className="section-kicker">Work archive</p>
          <h1 className="section-title max-w-4xl">Case studies that show both taste and execution.</h1>
          <p className="max-w-2xl text-lg leading-8 text-muted">
            The archive stays selective on purpose. Each project proves a different register: hospitality storytelling,
            conversion-led product landing, a shipped analytics app, and an interactive product prototype.
          </p>
        </section>
        <WorkArchive projects={projects} />
      </main>
    </SiteShell>
  );
}
