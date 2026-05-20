"use client";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import AnnouncementBanner from "./AnnouncementBanner";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AnnouncementBanner />
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
