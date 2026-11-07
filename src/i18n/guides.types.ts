import type { ToolId } from '../data/tools';

export interface GuideText {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { h: string; p: string[] }[];
  tool: ToolId;
}

export interface GuidesDict {
  base: string;
  sectionTitle: string;
  sectionSubtitle: string;
  read: string;
  breadcrumb: string;
  tryTool: string;
  guides: Record<string, GuideText>;
}
