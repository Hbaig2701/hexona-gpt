import Link from "next/link";
import { BookOpen, Library, UserCog, GraduationCap, BarChart3 } from "lucide-react";
import { prisma } from "@/lib/db/prisma";
import Card from "@/components/ui/Card";
import BackLink from "@/components/ui/BackLink";

export const dynamic = "force-dynamic";

export default async function AdminAdvisoryHubPage() {
  const [courseCount, resourceCount, instructorCount, publishedCourses, enrolledStudents] = await Promise.all([
    prisma.course.count(),
    prisma.resource.count(),
    prisma.instructor.count(),
    prisma.course.count({ where: { isPublished: true } }),
    prisma.user.count({
      where: {
        isActive: true,
        role: { not: "ADMIN" },
        tier: { in: ["TIER_1", "TIER_2", "TIER_3"] },
      },
    }),
  ]);

  const sections = [
    {
      title: "Courses",
      value: courseCount,
      subtitle: `${publishedCourses} published`,
      icon: BookOpen,
      href: "/admin/advisory/courses",
      color: "#00C4CC",
    },
    {
      title: "Resources",
      value: resourceCount,
      subtitle: "Templates, docs, links",
      icon: Library,
      href: "/admin/advisory/resources",
      color: "#A855F7",
    },
    {
      title: "Instructors",
      value: instructorCount,
      subtitle: "Course authors",
      icon: UserCog,
      href: "/admin/advisory/instructors",
      color: "#F59E0B",
    },
    {
      title: "Analytics",
      value: enrolledStudents,
      subtitle: "Student progress & engagement",
      icon: BarChart3,
      href: "/admin/advisory/analytics",
      color: "#10B981",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <BackLink href="/admin" label="Back to Admin" className="mb-4" />
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap size={24} className="text-hex-teal" />
        <h1 className="font-display text-2xl font-bold text-hex-text-primary">Advisory Admin</h1>
      </div>
      <p className="text-hex-text-secondary mb-8">
        Manage courses, modules, lessons, resources, and instructors for the Advisory section.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <Link key={s.title} href={s.href}>
            <Card className="cursor-pointer h-full">
              <div className="flex items-start justify-between mb-3">
                <s.icon size={28} style={{ color: s.color }} />
                <span className="text-3xl font-bold text-hex-text-primary">{s.value}</span>
              </div>
              <h3 className="font-display font-semibold text-hex-text-primary mb-1">{s.title}</h3>
              <p className="text-xs text-hex-text-muted">{s.subtitle}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
