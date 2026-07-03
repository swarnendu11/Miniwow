"use client";

import { use, useEffect } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { TOOLS } from "@/constants/tools";
import { notFound } from "next/navigation";
import { ToolEngine } from "@/components/tool-engine";

export default function GenericToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const tool = TOOLS.find(t => t.slug === resolvedParams.slug);

  useEffect(() => {
    if (tool) {
      const recent = JSON.parse(localStorage.getItem('miniwow_recent_tools') || '[]');
      const newRecent = [tool.slug, ...recent.filter((s: string) => s !== tool.slug)].slice(0, 5);
      localStorage.setItem('miniwow_recent_tools', JSON.stringify(newRecent));
    }
  }, [tool]);

  if (!tool) {
    notFound();
  }

  return (
    <ToolLayout
      title={tool.title}
      description={tool.description}
      icon={tool.icon}
      category={tool.category}
      gradient={tool.gradient}
    >
      <ToolEngine tool={tool} />
    </ToolLayout>
  );
}
