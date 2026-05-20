import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Users, DollarSign, Package, TrendingUp, TrendingDown, UserPlus, Settings,
  LogOut, Bell, Search, Download, Plus, X, CheckCircle2, AlertCircle, ChevronDown,
  MessageCircle, Mail, Phone, Calendar, Eye, Edit2, Trash2, Copy, Share2,
  Trophy, Gift, QrCode, BarChart3, Target, Zap, Crown, Award, ChevronRight,
  ArrowUpRight, ArrowDownRight, Filter, RefreshCw, Wallet, CreditCard, Send
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface AffiliateSession {
  email: string;
  name: string;
  phone?: string;
  level: string;
  loginAt: string;
}

interface Prospect {
  id: string;
  name: string;
  phone: string;
  package: string;
  status: "prospect" | "registered" | "departed" | "cancelled";
  commission: number;
  bonusEvent: number;
  createdAt: string;
  notes: string;
  affiliateId: string;
}

interface AffiliateData {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: string;
  totalProspects: number;
  totalRegistered: number;
  totalDeparted: number;
  totalCommission: number;
  pendingCommission: number;
}

interface ReferralLink {
  id: string;
  code: string;
  clicks: number;
  conversions: number;
  bonus: number;
}

export default function AffiliateDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"dashboard" | "prospects" | "commission" | "referral" | "tools" | "settings">("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddProspect, setShowAddProspect] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showNotifMessage, setShowNotifMessage] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  // Form state for new prospect
  const [newProspect, setNewProspect] = useState({
    name: "", phone: "", package: "Umroh Reguler", notes: ""
  });

  // Session & Data
  const [session, setSession] = useState<AffiliateSession | null>(null);
  const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [referralLinks, setReferralLinks] = useState<ReferralLink[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const sessionStr = sessionStorage.getItem("ditoris_session");
    if (!sessionStr) {
      setLocation("/affiliate/login");
      return;
    }

    const sessionData: AffiliateSession = JSON.parse(sessionStr);
    setSession(sessionData);

    // Load affiliate data
    const savedData = localStorage.getItem("ditoris_affiliate_data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setAffiliateData({
        ...parsed,
        name: sessionData.name,
        email: sessionData.email,
      });
    } else {
      const newData: AffiliateData = {
        id: "AFF-" + Date.now().toString().slice(-6),
        name: sessionData.name,
        email: sessionData.email,
        phone: sessionData.phone || "",
        level: "Silver",
        totalProspects: 0,
        totalRegistered: 0,
        totalDeparted: 0,
        totalCommission: 0,
        pendingCommission: 0,
      };
      localStorage.setItem("ditoris_affiliate_data", JSON.stringify(newData));
      setAffiliateData(newData);
    }

    // Load prospects
    const savedProspects = localStorage.getItem("ditoris_prospects");
    if (savedProspects) {
      setProspects(JSON.parse(savedProspects));
    }

    // Load referral links
    const savedLinks = localStorage.getItem("ditoris_referral_links");
    if (savedLinks) {
      setReferralLinks(JSON.parse(savedLinks));
    } else {
      const defaultLinks: ReferralLink[] = [
        { id: "1", code: "AFF" + sessionData.name.toUpperCase().slice(0, 3) + "2024", clicks: 0, conversions: 0, bonus: 0 },
      ];
      localStorage.setItem("ditoris_referral_links", JSON.stringify(defaultLinks));
      setReferralLinks(defaultLinks);
    }
  }, [setLocation]);

  // Helper functions
  const showNotification = (message: string) => {
    setShowNotifMessage(message);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 3000);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "prospect": return "bg-yellow-100 text-yellow-700";
      case "registered": return "bg-blue-100 text-blue-700";
      case "departed": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "prospect": return "Prospek";
      case "registered": return "Terdaftar";
      case "departed": return "Berangkat";
      case "cancelled": return "Batal";
      default: return status;
    }
  };

  const getLevelInfo = (level: string) => {
    switch (level) {
      case "Gold": return { color: "from-yellow-400 to-amber-500", icon: <Crown className="h-4 w-4" /> };
      case "Silver": return { color: "from-gray-300 to-gray-400", icon: <Award className="h-4 w-4" /> };
      default: return { color: "from-slate-300 to-slate-400", icon: <Trophy className="h-4 w-4" /> };
    }
  };

  // Handlers
  const handleAddProspect = () => {
    if (!newProspect.name || !newProspect.phone) {
      alert("Nama dan nomor WhatsApp wajib diisi!");
      return;
    }

    const prospect: Prospect = {
      id: "PRO-" + Date.now().toString().slice(-6),
      name: newProspect.name,
      phone: newProspect.phone,
      package: newProspect.package,
      status: "prospect",
      commission: 0,
      bonusEvent: 0,
      createdAt: new Date().toISOString().split("T")[0],
      notes: newProspect.notes,
      affiliateId: affiliateData?.id || "",
    };

    const updatedProspects = [prospect, ...prospects];
    setProspects(updatedProspects);
    localStorage.setItem("ditoris_prospects", JSON.stringify(updatedProspects));

    // Update affiliate stats
    if (affiliateData) {
      const updatedAffiliate = {
        ...affiliateData,
        totalProspects: affiliateData.totalProspects + 1,
      };
      localStorage.setItem("ditoris_affiliate_data", JSON.stringify(updatedAffiliate));
      setAffiliateData(updatedAffiliate);
    }

    showNotification(`Prospek "${prospect.name}" berhasil ditambahkan!`);
    setShowAddProspect(false);
    setNewProspect({ name: "", phone: "", package: "Umroh Reguler", notes: "" });
  };

  const handleUpdateStatus = (prospectId: string, newStatus: Prospect["status"]) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (!prospect) return;

    // Calculate commission
    let commission = 0;
    let bonus = 0;
    if (newStatus === "registered") commission = 500000;
    if (newStatus === "departed") commission = 1500000;

    const updatedProspects = prospects.map(p =>
      p.id === prospectId
        ? { ...p, status: newStatus, commission, bonusEvent: bonus }
        : p
    );
    setProspects(updatedProspects);
    localStorage.setItem("ditoris_prospects", JSON.stringify(updatedProspects));

    // Update affiliate stats
    if (affiliateData) {
      const updatedAffiliate = {
        ...affiliateData,
        totalProspects: updatedProspects.filter(p => p.status === "prospect").length,
        totalRegistered: updatedProspects.filter(p => p.status === "registered").length,
        totalDeparted: updatedProspects.filter(p => p.status === "departed").length,
        pendingCommission: updatedProspects.reduce((sum, p) => sum + p.commission + p.bonusEvent, 0),
        totalCommission: updatedProspects.filter(p => p.status === "departed").reduce((sum, p) => sum + p.commission, 0),
      };
      localStorage.setItem("ditoris_affiliate_data", JSON.stringify(updatedAffiliate));
      setAffiliateData(updatedAffiliate);
    }

    showNotification(`Status prospek "${prospect.name}" diperbarui ke "${getStatusLabel(newStatus)}"!`);
  };

  const handleCopyReferralCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showNotification("Kode referral berhasil disalin!");
  };

  const handleShareWA = (code: string) => {
    const message = `Assalamualaikum! 🌙\n\nJadilah affiliate Travelnesia dan dapatkan commission menarik!\n\nKode referral saya: *${code}*\n\nDaftar di: https://travelnesia.com/affiliate/register\n\nMari bersama mewujudkan impian umroh! 🕌`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleContactProspect = (phone: string, name: string) => {
    const message = `Assalamualaikum ${name}! Ini dari Travelnesia affiliate. Ada update menarik tentang paket umroh!`;
    window.open(`https://wa.me/${phone.replace(/^0/, "62")}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      sessionStorage.removeItem("ditoris_session");
      setLocation("/affiliate/login");
    }
  };

  // Filter prospects
  const filteredProspects = prospects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats calculations
  const stats = {
    totalProspects: affiliateData?.totalProspects || 0,
    totalRegistered: affiliateData?.totalRegistered || 0,
    totalDeparted: affiliateData?.totalDeparted || 0,
    totalCommission: affiliateData?.totalCommission || 0,
    pendingCommission: affiliateData?.pendingCommission || 0,
  };

  if (!session || !affiliateData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Notification Toast */}
      {showNotif && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="h-5 w-5" />
          {showNotifMessage}
        </div>
      )}

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white z-20 shadow-2xl">
        <div className="p-4 border-b border-slate-700">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Travelnesia" className="h-10 w-10 rounded-lg" />
            <div>
              <span className="font-bold">TRAVELNESIA</span>
              <span className="text-xs text-slate-400 block">Affiliate Panel</span>
            </div>
          </Link>
        </div>

        {/* Level Badge */}
        <div className="p-4 border-b border-slate-700">
          <div className={cn("flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r text-white text-sm font-bold", getLevelInfo(affiliateData.level).color)}>
            {getLevelInfo(affiliateData.level).icon}
            {affiliateData.level} Affiliate
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {[
            { id: "dashboard", icon: BarChart3, label: "Dashboard", color: "blue" },
            { id: "prospects", icon: Users, label: "Prospek & Jamaah", color: "purple" },
            { id: "commission", icon: DollarSign, label: "Komisi", color: "yellow" },
            { id: "referral", icon: Share2, label: "Referral Link", color: "pink" },
            { id: "tools", icon: Target, label: "Tools Marketing", color: "green" },
            { id: "settings", icon: Settings, label: "Pengaturan", color: "gray" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm",
                activeTab === item.id
                  ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg"
                  : "hover:bg-slate-700 text-slate-300"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center font-bold">
              {session.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{session.name}</p>
              <p className="text-xs text-slate-400 truncate">{session.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors text-sm"
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
              <h1 className="text-2xl font-bold text-slate-900">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "prospects" && "Prospek & Jamaah"}
                {activeTab === "commission" && "Komisi"}
                {activeTab === "referral" && "Referral Link"}
                {activeTab === "tools" && "Tools Marketing"}
                {activeTab === "settings" && "Pengaturan"}
              </h1>
              <p className="text-slate-500 text-sm">Selamat datang, {session.name}</p>
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
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="h-10 w-10 text-blue-200" />
                    <TrendingUp className="h-6 w-6 text-blue-200" />
                  </div>
                  <p className="text-blue-100 text-sm">Total Prospek</p>
                  <p className="text-4xl font-bold">{stats.totalProspects}</p>
                  <p className="text-blue-200 text-sm mt-2">Calon jamaah potensial</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Package className="h-10 w-10 text-purple-200" />
                    <CheckCircle2 className="h-6 w-6 text-purple-200" />
                  </div>
                  <p className="text-purple-100 text-sm">Terdaftar</p>
                  <p className="text-4xl font-bold">{stats.totalRegistered}</p>
                  <p className="text-purple-200 text-sm mt-2">Jamaah terdaftar</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Trophy className="h-10 w-10 text-green-200" />
                    <Award className="h-6 w-6 text-green-200" />
                  </div>
                  <p className="text-green-100 text-sm">Berangkat</p>
                  <p className="text-4xl font-bold">{stats.totalDeparted}</p>
                  <p className="text-green-200 text-sm mt-2">Sudah berangkat umroh</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="h-10 w-10 text-amber-200" />
                    <Wallet className="h-6 w-6 text-amber-200" />
                  </div>
                  <p className="text-amber-100 text-sm">Total Komisi</p>
                  <p className="text-3xl font-bold">{formatCurrency(stats.totalCommission)}</p>
                  <p className="text-amber-200 text-sm mt-2">Tertunda: {formatCurrency(stats.pendingCommission)}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-4">
                <button
                  onClick={() => { setActiveTab("prospects"); setShowAddProspect(true); }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <UserPlus className="h-7 w-7 text-green-600" />
                  </div>
                  <p className="font-bold text-slate-900">Tambah Prospek</p>
                  <p className="text-sm text-slate-500">Tambah calon jamaah baru</p>
                </button>
                <button
                  onClick={() => setActiveTab("commission")}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                    <DollarSign className="h-7 w-7 text-amber-600" />
                  </div>
                  <p className="font-bold text-slate-900">Klaim Komisi</p>
                  <p className="text-sm text-slate-500">Cairkan commission</p>
                </button>
                <button
                  onClick={() => setActiveTab("referral")}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                    <Share2 className="h-7 w-7 text-pink-600" />
                  </div>
                  <p className="font-bold text-slate-900">Bagikan Link</p>
                  <p className="text-sm text-slate-500">Ajak teman affiliate</p>
                </button>
                <button
                  onClick={() => setActiveTab("tools")}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <Target className="h-7 w-7 text-blue-600" />
                  </div>
                  <p className="font-bold text-slate-900">Tools Marketing</p>
                  <p className="text-sm text-slate-500">Materi promosi</p>
                </button>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Aktivitas Terbaru
                </h3>
                <div className="space-y-4">
                  {prospects.slice(0, 5).map((prospect) => (
                    <div key={prospect.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                          {prospect.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{prospect.name}</p>
                          <p className="text-sm text-slate-500">{prospect.phone} • {prospect.package}</p>
                        </div>
                      </div>
                      <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(prospect.status))}>
                        {getStatusLabel(prospect.status)}
                      </span>
                    </div>
                  ))}
                  {prospects.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p>Belum ada prospek</p>
                      <button
                        onClick={() => setShowAddProspect(true)}
                        className="mt-4 text-primary font-medium hover:underline"
                      >
                        + Tambah Prospek Pertama
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Prospects Tab */}
          {activeTab === "prospects" && (
            <div className="space-y-6">
              {/* Filter & Add */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex gap-2 flex-wrap">
                  {["all", "prospect", "registered", "departed", "cancelled"].map((status) => (
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
                      {status === "all" ? "Semua" : getStatusLabel(status)}
                      {status !== "all" && (
                        <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-slate-200">
                          {prospects.filter(p => p.status === status).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowAddProspect(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2.5 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                  Tambah Prospek
                </button>
              </div>

              {/* Prospects Table */}
              <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Nama</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Paket</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Tanggal</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Komisi</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-slate-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredProspects.map((prospect) => (
                      <tr key={prospect.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {prospect.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{prospect.name}</p>
                              <p className="text-sm text-slate-500">{prospect.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{prospect.package}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{prospect.createdAt}</td>
                        <td className="px-6 py-4">
                          <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(prospect.status))}>
                            {getStatusLabel(prospect.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {prospect.commission > 0 ? (
                            <p className="font-medium text-green-600">{formatCurrency(prospect.commission + prospect.bonusEvent)}</p>
                          ) : (
                            <span className="text-slate-400 text-sm">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleContactProspect(prospect.phone, prospect.name)}
                              className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                              title="Hubungi via WhatsApp"
                            >
                              <MessageCircle className="h-4 w-4 text-green-600" />
                            </button>
                            <button
                              onClick={() => { setSelectedProspect(prospect); setShowDetailModal(true); }}
                              className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                              title="Detail"
                            >
                              <Eye className="h-4 w-4 text-blue-600" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(prospect.id, prospect.status === "prospect" ? "registered" : prospect.status === "registered" ? "departed" : prospect.status)}
                              className={cn(
                                "p-2 rounded-lg transition-colors",
                                prospect.status === "prospect" ? "bg-yellow-100 hover:bg-yellow-200" :
                                prospect.status === "registered" ? "bg-green-100 hover:bg-green-200" :
                                "bg-slate-100 hover:bg-slate-200"
                              )}
                              title="Update Status"
                            >
                              <RefreshCw className={cn("h-4 w-4", prospect.status === "prospect" ? "text-yellow-600" : prospect.status === "registered" ? "text-green-600" : "text-slate-600")} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredProspects.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Tidak ada prospek yang sesuai filter</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Commission Tab */}
          {activeTab === "commission" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
                  <p className="text-green-100 mb-2">Total Komisi Di Cairkan</p>
                  <p className="text-3xl font-bold">{formatCurrency(stats.totalCommission)}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl p-6 shadow-lg">
                  <p className="text-yellow-100 mb-2">Komisi Tertunda</p>
                  <p className="text-3xl font-bold">{formatCurrency(stats.pendingCommission)}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
                  <p className="text-blue-100 mb-2">Estimasi Bonus</p>
                  <p className="text-3xl font-bold">{formatCurrency(stats.totalRegistered * 100000)}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-bold text-lg mb-6">Rincian Komisi</h3>
                <div className="space-y-4">
                  {prospects.filter(p => p.commission > 0).map((prospect) => (
                    <div key={prospect.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium">{prospect.name}</p>
                        <p className="text-sm text-slate-500">{prospect.package}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{formatCurrency(prospect.commission + prospect.bonusEvent)}</p>
                        <p className="text-xs text-slate-500">
                          {prospect.status === "departed" ? "Sudah cair" : "Menunggu"}
                        </p>
                      </div>
                    </div>
                  ))}
                  {prospects.filter(p => p.commission > 0).length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p>Belum ada komisi yang diperoleh</p>
                      <p className="text-sm">Ajak prospek dan dapatkan komisi!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Referral Tab */}
          {activeTab === "referral" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
                <p className="text-white/80 text-sm mb-2">Kode Affiliate Anda</p>
                <div className="flex items-center gap-4">
                  <p className="text-4xl font-bold tracking-wider">{affiliateData.id}</p>
                  <button
                    onClick={() => handleCopyReferralCode(affiliateData.id)}
                    className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
                  >
                    <Copy className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleShareWA(affiliateData.id)}
                  className="flex items-center justify-center gap-3 py-6 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-colors text-lg"
                >
                  <MessageCircle className="h-6 w-6" />
                  Share via WhatsApp
                </button>
                <button
                  onClick={() => {
                    const message = `Jadilah affiliate Travelnesia! Kode: ${affiliateData.id} - Daftar di: https://travelnesia.com/affiliate/register`;
                    window.open(`https://t.me/share/url?url=${encodeURIComponent("https://travelnesia.com/affiliate/register")}&text=${encodeURIComponent(message)}`, "_blank");
                  }}
                  className="flex items-center justify-center gap-3 py-6 bg-blue-500 text-white rounded-2xl font-bold hover:bg-blue-600 transition-colors text-lg"
                >
                  <Send className="h-6 w-6" />
                  Share via Telegram
                </button>
              </div>

              {/* Referral Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-bold text-lg mb-6">Statistik Referral</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-xl p-6 text-center">
                    <p className="text-3xl font-bold text-slate-700">{referralLinks.reduce((sum, l) => sum + l.clicks, 0)}</p>
                    <p className="text-sm text-slate-500">Total Klik</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6 text-center">
                    <p className="text-3xl font-bold text-green-600">{referralLinks.reduce((sum, l) => sum + l.conversions, 0)}</p>
                    <p className="text-sm text-green-600">Konversi</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-6 text-center">
                    <p className="text-3xl font-bold text-amber-600">{formatCurrency(referralLinks.reduce((sum, l) => sum + l.bonus, 0))}</p>
                    <p className="text-sm text-amber-600">Total Bonus</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tools Marketing Tab */}
          {activeTab === "tools" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-bold text-lg mb-6">Materi Promosi</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: "Banner Instagram", desc: "Posting story & feed", icon: "📱" },
                    { name: "Banner WhatsApp", desc: "Status & broadcast", icon: "💬" },
                    { name: "PPT Presentasi", desc: "untuk presentasi offline", icon: "📊" },
                    { name: "Flyer Digital", desc: "Share ke sosmed", icon: "📄" },
                    { name: "Video Promosi", desc: "Reels & TikTok", icon: "🎬" },
                    { name: "Template Chat", desc: "Balasan cepat WA", icon: "💭" },
                  ].map((tool, i) => (
                    <button key={i} className="bg-slate-50 rounded-xl p-6 text-left hover:bg-slate-100 transition-colors group">
                      <span className="text-3xl mb-3 block">{tool.icon}</span>
                      <p className="font-bold group-hover:text-primary transition-colors">{tool.name}</p>
                      <p className="text-sm text-slate-500">{tool.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-4">
                  <Gift className="h-12 w-12" />
                  <div>
                    <p className="text-2xl font-bold">Bonus Affiliate Baru!</p>
                    <p className="text-white/80">Dapatkan Rp 500.000 bonus untuk 5 prospek pertama yang terdaftar!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-bold text-lg mb-6">Pengaturan Akun</h3>

                <div className="flex items-center gap-6 mb-8 pb-8 border-b">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                    {session.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{session.name}</h4>
                    <p className="text-slate-500">{session.email}</p>
                    <div className={cn("inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-bold mt-2 bg-gradient-to-r", getLevelInfo(affiliateData.level).color)}>
                      {getLevelInfo(affiliateData.level).icon}
                      {affiliateData.level} Affiliate
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      value={session.name}
                      disabled
                      className="w-full px-4 py-3 rounded-lg border bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={session.email}
                      disabled
                      className="w-full px-4 py-3 rounded-lg border bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">ID Affiliate</label>
                    <input
                      type="text"
                      value={affiliateData.id}
                      disabled
                      className="w-full px-4 py-3 rounded-lg border bg-slate-50 font-mono"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-4 border border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    Keluar dari Akun
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Tambah Prospek */}
      {showAddProspect && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <UserPlus className="h-6 w-6 text-green-600" />
                Tambah Prospek Baru
              </h3>
              <button onClick={() => setShowAddProspect(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  value={newProspect.name}
                  onChange={(e) => setNewProspect({ ...newProspect, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">No. WhatsApp *</label>
                <input
                  type="tel"
                  value={newProspect.phone}
                  onChange={(e) => setNewProspect({ ...newProspect, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="81234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Paket Minat</label>
                <select
                  value={newProspect.package}
                  onChange={(e) => setNewProspect({ ...newProspect, package: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option>Umroh Hemat</option>
                  <option>Umroh Reguler</option>
                  <option>Umroh Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Catatan</label>
                <textarea
                  value={newProspect.notes}
                  onChange={(e) => setNewProspect({ ...newProspect, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Catatan tentang prospek ini..."
                  rows={3}
                />
              </div>
            </div>
            <div className="p-6 border-t bg-slate-50 flex gap-4">
              <button
                onClick={() => setShowAddProspect(false)}
                className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleAddProspect}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all"
              >
                Simpan Prospek
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Prospek */}
      {showDetailModal && selectedProspect && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold">Detail Prospek</h3>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedProspect.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xl font-bold">{selectedProspect.name}</p>
                  <p className="text-slate-500">{selectedProspect.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500">Paket</p>
                  <p className="font-bold">{selectedProspect.package}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500">Status</p>
                  <span className={cn("px-3 py-1 rounded-full text-xs font-medium inline-block", getStatusColor(selectedProspect.status))}>
                    {getStatusLabel(selectedProspect.status)}
                  </span>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500">Tanggal Input</p>
                  <p className="font-bold">{selectedProspect.createdAt}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500">Komisi</p>
                  <p className="font-bold text-green-600">{selectedProspect.commission > 0 ? formatCurrency(selectedProspect.commission) : "-"}</p>
                </div>
              </div>

              {selectedProspect.notes && (
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500 mb-1">Catatan</p>
                  <p className="text-slate-700">{selectedProspect.notes}</p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleContactProspect(selectedProspect.phone, selectedProspect.name)}
                  className="flex-1 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Hubungi WA
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleUpdateStatus(selectedProspect.id, selectedProspect.status === "prospect" ? "registered" : "departed");
                  }}
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}