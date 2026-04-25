"use client";

import { ToolLayout } from "@/components/tool-layout";
import { TOOLS } from "@/constants/tools";
import { notFound } from "next/navigation";
import { ToolEngine } from "@/components/tool-engine";

export default function GenericToolPage({ params }: { params: { slug: string } }) {
  const tool = TOOLS.find(t => t.slug === params.slug);

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
