import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LayoutDashboard, Zap, Shield, Crown } from "lucide-react";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex items-center gap-4 border-b border-white/5 pb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10">
          <img src={user.imageUrl} alt={user.fullName || "User"} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome, {user.firstName || "User"}!</h1>
          <p className="text-gray-400">{user.emailAddresses[0]?.emailAddress}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-2">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Current Plan</h3>
          <p className="text-gray-400">Free Tier (3 tasks / day)</p>
        </div>
        
        <div className="glass p-6 rounded-3xl border-white/5 space-y-4">
          <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-2">
            <Crown size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Tasks Used</h3>
          <p className="text-gray-400">0 / 3</p>
        </div>

        <div className="glass p-6 rounded-3xl border-white/5 space-y-4 md:col-span-1">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-2">
            <Shield size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">Security Status</h3>
          <p className="text-gray-400">All data encrypted</p>
        </div>
      </div>

      <div className="glass p-8 rounded-3xl border-white/5">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="opacity-50 text-center py-12">
          <p>No recent activity found. Try using a tool!</p>
        </div>
      </div>
    </div>
  );
}
