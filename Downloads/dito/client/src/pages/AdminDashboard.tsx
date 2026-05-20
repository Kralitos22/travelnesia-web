import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Users, UserPlus, DollarSign, Calendar, Search, Download, Bell, Settings, LogOut, MessageCircle, Mail, Award, Package, Landmark, Banknote, Receipt, Plus, X, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMockData, Affiliate, Prospect } from "@/contexts/AuthContext";

// Mock admin credentials
const ADMIN_EMAIL = "admin@ditoris.com";
const ADMIN_PASSWORD = "admin123";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"affiliates" | "prospects" | "commission" | "events" | "savings">("affiliates");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [data, setData] = useState(getMockData());

  // Modal states
  const [showAddAffiliate, setShowAddAffiliate] = useState(false);
  const [showAddJamaah, setShowAddJamaah] = useState(false);
  const [showAddTabungan, setShowAddTabungan] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Form states
  const [affiliateForm, setAffiliateForm] = useState({
    name: "", email: "", phone: "", level: "Silver", status: "active"
  });
  const [jamaahForm, setJamaahForm] = useState({
    name: "", email: "", phone: "", address: ""
  });
  const [tabunganForm, setTabunganForm] = useState({
    jamaahnName: "", amount: "", type: "setor", note: ""
  });

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

  const showNotification = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAddAffiliate = () => {
    if (!affiliateForm.name || !affiliateForm.email || !affiliateForm.phone) {
      alert("Mohon isi semua field yang wajib!");
      return;
    }
    // Simulasi add affiliate
    showNotification(`Affiliate "${affiliateForm.name}" berhasil ditambahkan!`);
    setShowAddAffiliate(false);
    setAffiliateForm({ name: "", email: "", phone: "", level: "Silver", status: "active" });
  };

  const handleAddJamaah = () => {
    if (!jamaahForm.name || !jamaahForm.phone) {
      alert("Mohon isi nama dan nomor WhatsApp!");
      return;
    }
    showNotification(`Jamaah "${jamaahForm.name}" berhasil ditambahkan!`);
    setShowAddJamaah(false);
    setJamaahForm({ name: "", email: "", phone: "", address: "" });
  };

  const handleAddTabungan = () => {
    if (!tabunganForm.jamaahnName || !tabunganForm.amount) {
      alert("Mohon isi nama jamaah dan jumlah!");
      return;
    }
    showNotification(`Tabungan ${tabunganForm.type === "setor" ? "disetor" : "ditarik"} sebesar Rp ${parseInt(tabunganForm.amount).toLocaleString("id-ID")} untuk "${tabunganForm.jamaahnName}" berhasil!`);
    setShowAddTabungan(false);
    setTabunganForm({ jamaahnName: "", amount: "", type: "setor", note: "" });
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
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
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="h-6 w-6" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white z-20 shadow-2xl">
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
            { id: "affiliates", icon: Users, label: "Affiliate", count: totalAffiliates, color: "blue" },
            { id: "prospects", icon: Package, label: "Prospek & Jamaah", count: totalProspects, color: "purple" },
            { id: "savings", icon: Landmark, label: "Tabungan Jamaah", count: 0, color: "pink" },
            { id: "commission", icon: DollarSign, label: "Komisi", count: pendingCommission, color: "yellow" },
            { id: "events", icon: Calendar, label: "Event", count: 3, color: "green" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                activeTab === item.id
                  ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg"
                  : "hover:bg-slate-700 text-slate-300"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1 text-left text-sm">{item.label}</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-bold",
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
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
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Total Affiliate</p>
                      <p className="text-3xl font-bold">{totalAffiliates}</p>
                    </div>
                    <Users className="h-10 w-10 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Affiliate Aktif</p>
                      <p className="text-3xl font-bold text-green-600">{activeAffiliates}</p>
                    </div>
                    <Award className="h-10 w-10 text-green-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Total Jamaah</p>
                      <p className="text-3xl font-bold">{totalDeparted}</p>
                    </div>
                    <Calendar className="h-10 w-10 text-purple-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Komisi Tertunda</p>
                      <p className="text-3xl font-bold text-yellow-600">Rp {(pendingCommission / 1000000).toFixed(1)}jt</p>
                    </div>
                    <DollarSign className="h-10 w-10 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Filter & Add Button */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {["all", "active", "dormant", "inactive"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        statusFilter === status
                          ? "bg-primary text-primary-foreground"
                          : "bg-white border text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {status === "all" ? "Semua" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowAddAffiliate(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                  Tambah Affiliate
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
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
                      <tr key={affiliate.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-white">
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
                            <button className="p-2 hover:bg-blue-50 rounded-lg" title="Hubungi">
                              <MessageCircle className="h-4 w-4 text-blue-600" />
                            </button>
                            <button className="p-2 hover:bg-green-50 rounded-lg" title="Email">
                              <Mail className="h-4 w-4 text-green-600" />
                            </button>
                            <button className="p-2 hover:bg-slate-100 rounded-lg" title="Settings">
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
              <div className="flex items-center justify-between">
                <div className="bg-white rounded-xl border p-6 shadow-sm">
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
                <button
                  onClick={() => setShowAddJamaah(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-2.5 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                  Tambah Jamaah
                </button>
              </div>

              <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
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
                        <tr key={prospect.id} className="hover:bg-slate-50 transition-colors">
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
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
                  <p className="green-green-100 mb-2">Total Komplain Dibayar</p>
                  <p className="text-3xl font-bold">
                    Rp {data.prospects.filter((p: Prospect) => p.status === "departed").reduce((sum: number, p: Prospect) => sum + p.commission + p.bonusEvent, 0).toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg">
                  <p className="text-yellow-100 mb-2">Komisi Tertunda</p>
                  <p className="text-3xl font-bold">
                    Rp {pendingCommission.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                  <p className="text-blue-100 mb-2">Affiliate Berangkat</p>
                  <p className="text-3xl font-bold">{totalDeparted} Jamaah</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
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
                      const totalComm = departed.reduce((sum: number, p: Prospect) => sum + p.commission + p.bonusEvent, 0);
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
                            Rp {totalComm.toLocaleString("id-ID")}
                          </td>
                          <td className="px-6 py-4">
                            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold hover:bg-green-200 transition-colors">
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
                <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2.5 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-lg">
                  <Plus className="h-5 w-5" />
                  Buat Event Baru
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: "Event Jakarta", date: "15 April 2026", attendees: 45, converts: 12 },
                  { name: "Event Surabaya", date: "20 April 2026", attendees: 38, converts: 8 },
                  { name: "Event Bandung", date: "25 April 2026", attendees: 25, converts: 5 },
                ].map((event, index) => (
                  <div key={index} className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
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

          {/* Tabungan Jamaah Tab */}
          {activeTab === "savings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Tabungan Jamaah</h2>
                  <p className="text-slate-500">Kelola tabungan dan setoran jamaah</p>
                </div>
                <button
                  onClick={() => setShowAddTabungan(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white px-5 py-2.5 rounded-lg font-medium hover:from-pink-700 hover:to-pink-800 transition-all shadow-lg"
                >
                  <Banknote className="h-5 w-5" />
                  Tambah Tabungan
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Total Tabungan</p>
                      <p className="text-2xl font-bold">Rp 125.000.000</p>
                    </div>
                    <Landmark className="h-10 w-10 text-pink-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Jamaah Aktif</p>
                      <p className="text-2xl font-bold">48</p>
                    </div>
                    <Users className="h-10 w-10 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Setoran Bulan Ini</p>
                      <p className="text-2xl font-bold text-green-600">Rp 15.500.000</p>
                    </div>
                    <Banknote className="h-10 w-10 text-green-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Penarikan</p>
                      <p className="text-2xl font-bold text-red-600">Rp 2.000.000</p>
                    </div>
                    <Receipt className="h-10 w-10 text-yellow-500" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-bold">Daftar Tabungan Jamaah</h3>
                  <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Download className="h-4 w-4" />
                    Export to Excel
                  </button>
                </div>
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Nama Jamaah</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">ID Jamaah</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Saldo Tabungan</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Setoran Terakhir</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Tanggal Terakhir</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { id: "JMH-001", name: "Ahmad Fauzi", saldo: 15000000, lastDeposit: 500000, date: "2026-05-15", status: "active" },
                      { id: "JMH-002", name: "Siti Aminah", saldo: 8500000, lastDeposit: 250000, date: "2026-05-14", status: "active" },
                      { id: "JMH-003", name: "Budi Santoso", saldo: 22000000, lastDeposit: 1000000, date: "2026-05-12", status: "active" },
                      { id: "JMH-004", name: "Dewi Lestari", saldo: 5000000, lastDeposit: 100000, date: "2026-05-10", status: "inactive" },
                      { id: "JMH-005", name: "Hasan Wijaya", saldo: 12000000, lastDeposit: 750000, date: "2026-05-08", status: "active" },
                    ].map((saving) => (
                      <tr key={saving.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium">{saving.name}</p>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm">{saving.id}</td>
                        <td className="px-6 py-4 font-medium">Rp {saving.saldo.toLocaleString("id-ID")}</td>
                        <td className="px-6 py-4 text-green-600">Rp {saving.lastDeposit.toLocaleString("id-ID")}</td>
                        <td className="px-6 py-4 text-sm">{saving.date}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            saving.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          )}>
                            {saving.status === "active" ? "Aktif" : "Tidak Aktif"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors">
                              Setor
                            </button>
                            <button className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium hover:bg-yellow-200 transition-colors">
                              Tarik
                            </button>
                            <button className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors">
                              Detail
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
        </div>
      </div>

      {/* Modal Tambah Affiliate */}
      {showAddAffiliate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                Tambah Affiliate Baru
              </h3>
              <button onClick={() => setShowAddAffiliate(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  value={affiliateForm.name}
                  onChange={(e) => setAffiliateForm({ ...affiliateForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={affiliateForm.email}
                  onChange={(e) => setAffiliateForm({ ...affiliateForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">No. WhatsApp *</label>
                <input
                  type="tel"
                  value={affiliateForm.phone}
                  onChange={(e) => setAffiliateForm({ ...affiliateForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="81234567890"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Level</label>
                  <select
                    value={affiliateForm.level}
                    onChange={(e) => setAffiliateForm({ ...affiliateForm, level: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Silver">Silver (1-5 Jamaah)</option>
                    <option value="Gold">Gold (5-10 Jamaah)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <select
                    value={affiliateForm.status}
                    onChange={(e) => setAffiliateForm({ ...affiliateForm, status: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="active">Aktif</option>
                    <option value="dormant">Dormant</option>
                    <option value="inactive">Nonaktif</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t bg-slate-50 flex gap-4">
              <button
                onClick={() => setShowAddAffiliate(false)}
                className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleAddAffiliate}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Simpan Affiliate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Jamaah */}
      {showAddJamaah && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Package className="h-6 w-6 text-purple-600" />
                Tambah Jamaah Baru
              </h3>
              <button onClick={() => setShowAddJamaah(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  value={jamaahForm.name}
                  onChange={(e) => setJamaahForm({ ...jamaahForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={jamaahForm.email}
                  onChange={(e) => setJamaahForm({ ...jamaahForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">No. WhatsApp *</label>
                <input
                  type="tel"
                  value={jamaahForm.phone}
                  onChange={(e) => setJamaahForm({ ...jamaahForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="81234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Alamat</label>
                <textarea
                  value={jamaahForm.address}
                  onChange={(e) => setJamaahForm({ ...jamaahForm, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="Masukkan alamat lengkap"
                  rows={3}
                />
              </div>
            </div>
            <div className="p-6 border-t bg-slate-50 flex gap-4">
              <button
                onClick={() => setShowAddJamaah(false)}
                className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleAddJamaah}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-bold hover:from-purple-700 hover:to-purple-800 transition-all"
              >
                Simpan Jamaah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Tabungan */}
      {showAddTabungan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Landmark className="h-6 w-6 text-pink-600" />
                Tambah Tabungan Jamaah
              </h3>
              <button onClick={() => setShowAddTabungan(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Jamaah *</label>
                <input
                  type="text"
                  value={tabunganForm.jamaahnName}
                  onChange={(e) => setTabunganForm({ ...tabunganForm, jamaahnName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  placeholder="Masukkan nama jamaah"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Jenis Transaksi</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setTabunganForm({ ...tabunganForm, type: "setor" })}
                    className={cn(
                      "py-3 rounded-lg font-medium transition-all",
                      tabunganForm.type === "setor"
                        ? "bg-green-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    )}
                  >
                    💰 Setor
                  </button>
                  <button
                    type="button"
                    onClick={() => setTabunganForm({ ...tabunganForm, type: "tarik" })}
                    className={cn(
                      "py-3 rounded-lg font-medium transition-all",
                      tabunganForm.type === "tarik"
                        ? "bg-red-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    )}
                  >
                    💸 Tarik
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Jumlah (Rp) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
                  <input
                    type="text"
                    value={tabunganForm.amount}
                    onChange={(e) => setTabunganForm({ ...tabunganForm, amount: e.target.value.replace(/\D/g, "") })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-lg font-bold"
                    placeholder="500.000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Catatan</label>
                <input
                  type="text"
                  value={tabunganForm.note}
                  onChange={(e) => setTabunganForm({ ...tabunganForm, note: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  placeholder="Contoh: Setoran bulanan Mei 2026"
                />
              </div>
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-pink-600 mt-0.5" />
                <p className="text-sm text-pink-800">
                  Transaksi akan langsung tercatat di sistem. Pastikan data sudah benar sebelum disimpan.
                </p>
              </div>
            </div>
            <div className="p-6 border-t bg-slate-50 flex gap-4">
              <button
                onClick={() => setShowAddTabungan(false)}
                className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleAddTabungan}
                className={cn(
                  "flex-1 py-3 rounded-lg font-bold transition-all",
                  tabunganForm.type === "setor"
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                    : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                )}
              >
                {tabunganForm.type === "setor" ? "Simpan Setoran" : "Simpan Penarikan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}