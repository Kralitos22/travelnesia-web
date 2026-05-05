import { useState, useEffect } from "react";
import { Link, redirect } from "wouter";
import { Users, UserPlus, DollarSign, TrendingUp, Calendar, Search, Filter, Download, BarChart3, Bell, Settings, LogOut, ChevronRight, MessageCircle, Phone, Mail, CheckCircle2, Clock, XCircle, Award, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMockData, saveMockData, Affiliate, Prospect } from "@/contexts/AuthContext";

// Mock admin credentials
const ADMIN_EMAIL = "admin@ditoris.com";
const ADMIN_PASSWORD = "admin123";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"affiliates" | "prospects" | "commission" | "events">("affiliates");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [data, setData] = useState(getMockData());

  // Check session
  useEffect(() => {
    const session = sessionStorage.getItem("ditoris_admin_session");
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("ditoris_admin_session", "true");
    } else {
      setLoginError("Email atau password salah!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("ditoris_admin_session");
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Ditoris" className="h-14 w-14 rounded-lg" />
              <div className="text-left">
                <span className="text-2xl font-bold text-white">DITORIS</span>
                <span className="text-sm text-slate-400 block">Admin Dashboard</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Login Admin</h2>

            <form onSubmit={handleLogin} className="space-y-5">
              {loginError && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-sm text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="admin@ditoris.com"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors"
              >
                Login
              </button>
            </form>

            <div className="mt-6 p-4 bg-white/10 rounded-lg text-sm text-slate-300">
              <p className="font-medium mb-2">Demo Credentials:</p>
              <p>Email: <span className="font-mono">{ADMIN_EMAIL}</span></p>
              <p>Password: <span className="font-mono">{ADMIN_PASSWORD}</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter data
  const filteredAffiliates = data.affiliates.filter((a: Affiliate) => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProspects = data.prospects.filter((p: Prospect) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalAffiliates = data.affiliates.length;
  const activeAffiliates = data.affiliates.filter((a: Affiliate) => a.status === "active").length;
  const totalProspects = data.prospects.length;
  const totalDeparted = data.prospects.filter((p: Prospect) => p.status === "departed").length;
  const totalCommission = data.prospects.reduce((sum: number, p: Prospect) => sum + p.commission + p.bonusEvent, 0);
  const pendingCommission = data.prospects.filter((p: Prospect) => p.status === "registered").reduce((sum: number, p: Prospect) => sum + p.commission + p.bonusEvent, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "dormant": return "bg-yellow-100 text-yellow-700";
      case "inactive": return "bg-red-100 text-red-700";
      case "departed": return "bg-green-100 text-green-700";
      case "registered": return "bg-blue-100 text-blue-700";
      case "prospect": return "bg-yellow-100 text-yellow-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "Aktif";
      case "dormant": return "Dormant";
      case "inactive": return "Nonaktif";
      case "departed": return "Berangkat";
      case "registered": return "Terdaftar";
      case "prospect": return "Prospek";
      case "cancelled": return "Batal";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white z-20">
        <div className="p-4 border-b border-slate-700">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Ditoris" className="h-10 w-10 rounded-lg" />
            <div>
              <span className="font-bold">DITORIS</span>
              <span className="text-xs text-slate-400 block">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {[
            { id: "affiliates", icon: Users, label: "Affiliate", count: totalAffiliates },
            { id: "prospects", icon: Package, label: "Prospek & Jamaah", count: totalProspects },
            { id: "commission", icon: DollarSign, label: "Komisi", count: pendingCommission },
            { id: "events", icon: Calendar, label: "Event", count: 3 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-slate-800 text-slate-300"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1 text-left">{item.label}</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs",
                activeTab === item.id ? "bg-white/20" : "bg-slate-700"
              )}>
                {item.id === "commission" ? `Rp ${(item.count / 1000000).toFixed(0)}jt` : item.count}
              </span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard CRM</h1>
              <p className="text-slate-500 text-sm">Kelola affiliate, prospek, dan komisi</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border bg-slate-50 w-64 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-lg relative">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Affiliates Tab */}
          {activeTab === "affiliates" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Total Affiliate</p>
                      <p className="text-3xl font-bold">{totalAffiliates}</p>
                    </div>
                    <Users className="h-10 w-10 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Affiliate Aktif</p>
                      <p className="text-3xl font-bold text-green-600">{activeAffiliates}</p>
                    </div>
                    <Award className="h-10 w-10 text-green-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Total Jamaah</p>
                      <p className="text-3xl font-bold">{totalDeparted}</p>
                    </div>
                    <Calendar className="h-10 w-10 text-purple-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Komisi Tertunda</p>
                      <p className="text-3xl font-bold text-yellow-600">Rp {(pendingCommission / 1000000).toFixed(1)}jt</p>
                    </div>
                    <DollarSign className="h-10 w-10 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Filter */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {["all", "active", "dormant", "inactive"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium",
                        statusFilter === status
                          ? "bg-primary text-primary-foreground"
                          : "bg-white border text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {status === "all" ? "Semua" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90">
                  <UserPlus className="h-4 w-4" />
                  Tambah Affiliate
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Affiliate</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">ID</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Level</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Stats</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Komisi</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredAffiliates.map((affiliate: Affiliate) => (
                      <tr key={affiliate.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                              {affiliate.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{affiliate.name}</p>
                              <p className="text-sm text-slate-500">{affiliate.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm">{affiliate.id}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-bold",
                            affiliate.level === "Gold" && "bg-yellow-100 text-yellow-700",
                            affiliate.level === "Silver" && "bg-gray-200 text-gray-700",
                            affiliate.level === "Basic" && "bg-slate-100 text-slate-700"
                          )}>
                            {affiliate.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <p>Prospek: {affiliate.totalProspects}</p>
                          <p>Terdaftar: {affiliate.totalRegistered}</p>
                          <p>Berangkat: {affiliate.totalDeparted}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium">Rp {(affiliate.totalCommission / 1000000).toFixed(1)}jt</p>
                          <p className="text-xs text-slate-500">
                            Tertunda: Rp {(affiliate.pendingCommission / 1000000).toFixed(1)}jt
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(affiliate.status))}>
                            {getStatusLabel(affiliate.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-slate-100 rounded-lg">
                              <MessageCircle className="h-4 w-4 text-slate-600" />
                            </button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg">
                              <Mail className="h-4 w-4 text-slate-600" />
                            </button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg">
                              <Settings className="h-4 w-4 text-slate-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Prospects Tab */}
          {activeTab === "prospects" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border p-6">
                <h3 className="font-bold text-lg mb-4">Filter Prospek</h3>
                <div className="flex flex-wrap gap-4">
                  {["all", "prospect", "registered", "departed", "cancelled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium",
                        statusFilter === status
                          ? "bg-primary text-primary-foreground"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      {status === "all" ? "Semua" : getStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Nama Jamaah</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Affiliate</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Paket</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Sumber</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Komisi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredProspects.map((prospect: Prospect) => {
                      const affiliate = data.affiliates.find((a: Affiliate) => a.id === prospect.affiliateId);
                      return (
                        <tr key={prospect.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <p className="font-medium">{prospect.name}</p>
                            <p className="text-sm text-slate-500">{prospect.phone}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium">{affiliate?.name || "-"}</p>
                            <p className="text-xs text-slate-500">{affiliate?.id}</p>
                          </td>
                          <td className="px-6 py-4 text-sm">{prospect.package}</td>
                          <td className="px-6 py-4 text-sm">
                            {prospect.source === "event" && prospect.eventName ? prospect.eventName : prospect.source}
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(prospect.status))}>
                              {getStatusLabel(prospect.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {prospect.commission > 0 ? (
                              <div>
                                <p className="font-medium text-green-600">
                                  Rp {(prospect.commission + prospect.bonusEvent).toLocaleString("id-ID")}
                                </p>
                                <p className="text-xs text-slate-500">
                                  Bonus: Rp {prospect.bonusEvent.toLocaleString("id-ID")}
                                </p>
                              </div>
                            ) : "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Commission Tab */}
          {activeTab === "commission" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
                  <p className="text-green-100 mb-2">Total Komplain Dibayar</p>
                  <p className="text-3xl font-bold">
                    Rp {data.prospects.filter((p: Prospect) => p.status === "departed").reduce((sum: number, p: Prospect) => sum + p.commission + p.bonusEvent, 0).toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6">
                  <p className="text-yellow-100 mb-2">Komisi Tertunda</p>
                  <p className="text-3xl font-bold">
                    Rp {pendingCommission.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                  <p className="text-blue-100 mb-2">Affiliate Berangkat</p>
                  <p className="text-3xl font-bold">{totalDeparted} Jamaah</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-bold">Riwayat Komisi per Affiliate</h3>
                  <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Download className="h-4 w-4" />
                    Export to Excel
                  </button>
                </div>
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Affiliate</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Jamaah Berangkat</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Komisi Dasar</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Bonus Event</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Total</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Status Bayar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {data.affiliates.map((affiliate: Affiliate) => {
                      const affiliateProspects = data.prospects.filter((p: Prospect) => p.affiliateId === affiliate.id);
                      const departed = affiliateProspects.filter((p: Prospect) => p.status === "departed");
                      const totalCommission = departed.reduce((sum: number, p: Prospect) => sum + p.commission + p.bonusEvent, 0);
                      return (
                        <tr key={affiliate.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <p className="font-medium">{affiliate.name}</p>
                            <p className="text-sm text-slate-500">{affiliate.id}</p>
                          </td>
                          <td className="px-6 py-4 font-medium">{departed.length} Jamaah</td>
                          <td className="px-6 py-4">
                            Rp {departed.reduce((sum: number, p: Prospect) => sum + p.commission, 0).toLocaleString("id-ID")}
                          </td>
                          <td className="px-6 py-4 text-green-600">
                            Rp {departed.reduce((sum: number, p: Prospect) => sum + p.bonusEvent, 0).toLocaleString("id-ID")}
                          </td>
                          <td className="px-6 py-4 font-bold">
                            Rp {totalCommission.toLocaleString("id-ID")}
                          </td>
                          <td className="px-6 py-4">
                            <button className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200">
                              Cairkan
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Event & Presentasi</h2>
                  <p className="text-slate-500">Kelola event dan kehadiran affiliate</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90">
                  <Calendar className="h-4 w-4" />
                  Buat Event Baru
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: "Event Jakarta", date: "15 April 2026", attendees: 45, converts: 12 },
                  { name: "Event Surabaya", date: "20 April 2026", attendees: 38, converts: 8 },
                  { name: "Event Bandung", date: "25 April 2026", attendees: 25, converts: 5 },
                ].map((event, index) => (
                  <div key={index} className="bg-white rounded-xl border p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold">{event.name}</h3>
                        <p className="text-sm text-slate-500">{event.date}</p>
                      </div>
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold">{event.attendees}</p>
                        <p className="text-xs text-slate-500">Peserta Hadir</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-green-600">{event.converts}</p>
                        <p className="text-xs text-slate-500">Terdaftar</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
         )}
        </div>
      </div>
    </div>
  );
}