import type { LessonType, UserTier } from "@prisma/client";

export type InstructorRow = {
  id: string;
  name: string;
  bio: string | null;
  photoUrl: string | null;
};

export type LessonRow = {
  id: string;
  moduleId: string;
  slug: string;
  title: string;
  description: string | null;
  type: LessonType;
  loomUrl: string | null;
  durationSec: number | null;
  externalUrl: string | null;
  advisorSlug: string | null;
  tableData: { headers: string[]; rows: string[][] } | null;
  thumbnailUrl: string | null;
  cardBg: string | null;
  order: number;
  isPublished: boolean;
};

export type ModuleNode = {
  id: string;
  courseId: string;
  parentId: string | null;
  title: string;
  color: string | null;
  order: number;
  lessons?: LessonRow[];
  children?: ModuleNode[];
};

export type CourseFull = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  heroBannerUrl: string | null;
  thumbnailUrl: string | null;
  ctaLabel: string;
  requiredTier: UserTier;
  instructorId: string | null;
  instructor: InstructorRow | null;
  isPublished: boolean;
  order: number;
  modules: ModuleNode[];
};
