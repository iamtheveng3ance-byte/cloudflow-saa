"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, FolderKanban, Users, LogOut, Plus } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading CloudFlow Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6 flex flex-col justify-between">
        <div>
          <div className="text-2xl font-bold text-indigo-400 tracking-wider mb-8">
            CloudFlow
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 bg-indigo-600/10 text-indigo-400 rounded-lg font-medium text-sm">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 rounded-lg text-sm transition">
              <FolderKanban className="h-4 w-4" />
              Projects
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 rounded-lg text-sm transition">
              <Users className="h-4 w-4" />
              Team Members
            </a>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg text-sm transition"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
            <p className="text-sm text-slate-400 mt-1">Manage your SaaS tenant projects and system activity.</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <Plus className="h-4 w-4" />
            New Project
          </button>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <div className="text-sm font-medium text-slate-400">Total Projects</div>
            <div className="text-3xl font-bold text-white mt-2">0</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <div className="text-sm font-medium text-slate-400">Active Tasks</div>
            <div className="text-3xl font-bold text-white mt-2">0</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <div className="text-sm font-medium text-slate-400">Team Members</div>
            <div className="text-3xl font-bold text-white mt-2">1</div>
          </div>
        </div>

        {/* Workspace Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center text-slate-400">
          No active projects yet. Click <strong>"New Project"</strong> to create your first workspace!
        </div>
      </main>
    </div>
  );
}