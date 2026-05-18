import { useState } from "react";
import { Link } from "wouter";
import { TrendingUp, Users, Gift, Calendar, DollarSign, Copy, ExternalLink, Award, Clock, ChevronRight, BarChart3, LogOut, Settings, Bell, Search, Filter, ChevronDown, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, getMockData, saveMockData, Prospect } from "@/contexts/AuthContext";

// Mock data
const referralLink = "https://ditoris.com/r/AFF-2025-001";

export function AffiliateDashboard() {
  const { affiliate, logout, updateAffiliate } = useAuth();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "prospects" | "commission">("overview");

  if (!affiliate) {
    return null;
  }

  const data = getMockData();
  const prospects = data.prospects.filter((p: Prospect) => p.affiliateId === affiliate.id);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "departed":
        return "bg-green-100 text-green-700";
      case "registered":
        return "bg-blue-100 text-blue-700";
      case "prospect":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "departed":
        return "Berangkat";
      case "registered":
        return "Terdaftar";
      case "prospect":
        return "Prospek";
      case "cancelled":
        return "Batal";
      default:
        return status;
    }
  };

  // Calculate stats
  const totalProspects = prospects.length;
  const totalRegistered = prospects.filter((p: Prospect) => p.status === "registered" || p.status === "departed").length;
  const totalDeparted = prospects.filter((p: Prospect) => p.status === "departed").length;
  const pendingCommission = prospects
    .filter((p: Prospect) => p.status === "registered")
    .reduce((sum: number, p: Prospect) => sum + p.commission + p.bonusEvent, 0);
  const paidCommission = prospects
    .filter((p: Prospect) => p.status === "departed")
    .reduce((sum: number, p: Prospect) => sum + p.commission + p.bonusEvent, 0);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        {/* Top Bar */}
        <div className="container py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Link href="/affiliate" className="flex items-center gap-2 hover:opacity-80">
              <img src="/logo.png" alt="Ditoris" className="h-8 w-8 rounded-lg" />
              <span className="font-bold">DITORIS</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-medium">{affiliate.name}</p>
                <p className="text-xs text-white/70">{affiliate.id}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                {affiliate.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Award className="h-10 w-10 text-yellow-300" />
                <div>
                  <h1 className="text-3xl font-bold">Dashboard Affiliate</h1>
                  <p className="text-white/70">Selamat datang, {affiliate.name}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={cn(
                "rounded-lg px-4 py-2 font-bold",
                affiliate.level === "Gold" && "bg-yellow-400 text-yellow-900",
                affiliate.level === "Silver" && "bg-gray-300 text-gray-800",
                affiliate.level === "Basic" && "bg-gray-200 text-gray-700"
              )}>
                <p className="text-xs opacity-70">Level</p>
                <p>{affiliate.level}</p>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container">
          <div className="flex gap-1">
            {[
              { id: "overview", label: "Overview" },
              { id: "prospects", label: "Prospek & Jamaah" },
              { id: "commission", label: "Komisi" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "px-6 py-4 font-medium border-b-2 transition-colors",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card rounded-xl p-5 border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span className="text-xs text-green-600 font-medium">+2 bulan ini</span>
                </div>
                <p className="text-3xl font-bold">{totalProspects}</p>
                <p className="text-sm text-muted-foreground">Total Prospek</p>
              </div>
              <div className="bg-card rounded-xl p-5 border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold">{totalDeparted}</p>
                <p className="text-sm text-muted-foreground">Jamaah Berangkat</p>
              </div>
              <div className="bg-card rounded-xl p-5 border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-3xl font-bold text-yellow-600">
                  Rp {(pendingCommission / 1000000).toFixed(1)}jt
                </p>
                <p className="text-sm text-muted-foreground">Komisi Tertunda</p>
              </div>
              <div className="bg-card rounded-xl p-5 border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">Cair</span>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  Rp {(paidCommission / 1000000).toFixed(1)}jt
                </p>
                <p className="text-sm text-muted-foreground">Komisi Dibayar</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Referral Link */}
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="font-bold text-lg mb-4">Link Referral Anda</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Bagikan link ini ke calon jamaah. Setiap pendaftaran via link ini akan tercatat otomatis.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={referralLink}
                      readOnly
                      className="flex-1 px-4 py-3 rounded-lg border bg-muted font-mono text-sm"
                    />
                    <button
                      onClick={copyLink}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      {copied ? "Tersalin!" : "Salin"}
                    </button>
                    <a
                      href={`https://wa.me/?text=Halo%2C%20ayo%20umroh%20bareng%20saya%20via%20Ditoris%20Travelnesia!%20%0A%0ARegi%20disini%3A%20${encodeURIComponent(referralLink)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Share
                    </a>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card rounded-xl border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Aktivitas Terbaru</h3>
                    <button
                      onClick={() => setActiveTab("prospects")}
                      className="text-sm text-primary font-medium flex items-center gap-1"
                    >
                      Lihat Semua <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {prospects.slice(0, 5).map((prospect: Prospect, index: number) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            prospect.status === "departed" && "bg-green-100 text-green-600",
                            prospect.status === "registered" && "bg-blue-100 text-blue-600",
                            prospect.status === "prospect" && "bg-yellow-100 text-yellow-600"
                          )}>
                            {prospect.status === "departed" && <Calendar className="h-5 w-5" />}
                            {prospect.status === "registered" && <Users className="h-5 w-5" />}
                            {prospect.status === "prospect" && <TrendingUp className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="font-medium">{prospect.name}</p>
                            <p className="text-sm text-muted-foreground">{prospect.package}</p>
                          </div>
                        </div>
                        <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(prospect.status))}>
                          {getStatusLabel(prospect.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Commission Summary */}
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl p-6">
                  <h3 className="font-bold mb-4">Ringkasan Komisi</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-white/70">Total Komisi Didapat</p>
                      <p className="text-2xl font-bold">
                        Rp {((paidCommission + pendingCommission) / 1000000).toFixed(1)}jt
                      </p>
                    </div>
                    <div className="flex justify-between py-2 border-t border-white/20">
                      <span className="text-sm text-white/70">Sudah Cair</span>
                      <span className="font-medium">
                        Rp {(paidCommission / 1000000).toFixed(1)}jt
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-white/20">
                      <span className="text-sm text-white/70">Tertunda</span>
                      <span className="font-medium">
                        Rp {(pendingCommission / 1000000).toFixed(1)}jt
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-4 pt-4 border-t border-white/20">
                    * Komisi dicairkan setelah pelunasan atau H-14 keberangkatan
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="font-bold mb-4">Aksi Cepat</h3>
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/6281234567890?text=Halo, saya ${affiliate.name} (${affiliate.id}). Ingin update data prospek baru.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors text-green-700"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="font-medium">Input Prospek Baru via WA</span>
                    </a>
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="font-medium">Hubungi Tim Support</span>
                    </a>
                  </div>
                </div>

                {/* Leaderboard Preview */}
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Top Affiliate
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "Siti Nurhaliza", score: 15, rank: 1 },
                      { name: affiliate.name, score: totalDeparted, rank: 2 },
                      { name: "H. Hasan", score: 6, rank: 3 },
                    ].map((top) => (
                      <div key={top.rank} className="flex items-center gap-3">
                        <span className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                          top.rank === 1 && "bg-yellow-400 text-yellow-900",
                          top.rank === 2 && "bg-gray-300 text-gray-700",
                          top.rank === 3 && "bg-amber-600 text-white"
                        )}>
                          {top.rank}
                        </span>
                        <span className="flex-1 font-medium">{top.name}</span>
                        <span className="text-sm text-muted-foreground">{top.score} Jamaah</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Prospects Tab */}
        {activeTab === "prospects" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Prospek & Jamaah</h2>
                <p className="text-muted-foreground">Kelola semua prospek dan jamaah Anda</p>
              </div>
              <a
                href={`https://wa.me/6281234567890?text=Halo, saya ${affiliate.name} (${affiliate.id}). Ingin input prospek baru dengan data: %0A%0ANama:%0AWhatsApp:%0APaket:%0ASumber:`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Tambah Prospek via WA
              </a>
            </div>

            {/* Filter */}
            <div className="bg-card rounded-xl border p-4">
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                  Semua ({prospects.length})
                </button>
                <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium">
                  Prospek ({prospects.filter((p: Prospect) => p.status === "prospect").length})
                </button>
                <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium">
                  Terdaftar ({prospects.filter((p: Prospect) => p.status === "registered").length})
                </button>
                <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium">
                  Berangkat ({prospects.filter((p: Prospect) => p.status === "departed").length})
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Nama</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Paket</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Sumber</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Komisi</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {prospects.map((prospect: Prospect, index: number) => (
                      <tr key={index} className="hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <p className="font-medium">{prospect.name}</p>
                          <p className="text-sm text-muted-foreground">{prospect.phone}</p>
                        </td>
                        <td className="px-4 py-3 text-sm">{prospect.package}</td>
                        <td className="px-4 py-3 text-sm">
                          {prospect.source === "event" && prospect.eventName ? prospect.eventName : prospect.source}
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(prospect.status))}>
                            {getStatusLabel(prospect.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {prospect.commission > 0 ? (
                            <div>
                              <p className="font-medium">Rp {prospect.commission.toLocaleString("id-ID")}</p>
                              {prospect.bonusEvent > 0 && (
                                <p className="text-xs text-muted-foreground">+Bonus Rp {prospect.bonusEvent.toLocaleString("id-ID")}</p>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={`https://wa.me/${prospect.phone.replace(/^0/, "62")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors inline-block"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Commission Tab */}
        {activeTab === "commission" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Riwayat Komisi</h2>
              <p className="text-muted-foreground">Semua komisi yang sudah dan akan diterima</p>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
                <p className="text-green-100 mb-2">Total Komisi</p>
                <p className="text-3xl font-bold">Rp {(paidCommission + pendingCommission).toLocaleString("id-ID")}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                <p className="text-blue-100 mb-2">Sudah Cair</p>
                <p className="text-3xl font-bold">Rp {paidCommission.toLocaleString("id-ID")}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6">
                <p className="text-yellow-100 mb-2">Tertunda</p>
                <p className="text-3xl font-bold">Rp {pendingCommission.toLocaleString("id-ID")}</p>
              </div>
            </div>

            {/* Commission Table */}
            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-bold">Riwayat Komisi</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Jamaah</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Paket</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Komisi</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Bonus</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {prospects.filter((p: Prospect) => p.commission > 0 || p.bonusEvent > 0).map((prospect: Prospect, index: number) => (
                      <tr key={index} className="hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{prospect.name}</td>
                        <td className="px-4 py-3 text-sm">{prospect.package}</td>
                        <td className="px-4 py-3">
                          <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(prospect.status))}>
                            {getStatusLabel(prospect.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">Rp {prospect.commission.toLocaleString("id-ID")}</td>
                        <td className="px-4 py-3 text-sm">
                          {prospect.bonusEvent > 0 ? (
                            <span className="text-green-600">+Rp {prospect.bonusEvent.toLocaleString("id-ID")}</span>
                          ) : "-"}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          Rp {(prospect.commission + prospect.bonusEvent).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-bold text-blue-800 mb-2">Informasi Pembayaran Komisi</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Komisi dicairkan setelah <strong>pelunasan</strong> atau <strong>H-14 keberangkatan</strong></li>
                <li>• Pembayaran dilakukan via <strong>transfer bank</strong> ke rekening affiliate</li>
                <li>• Minimum pencairan: <strong>Rp 500.000</strong></li>
                <li>• Pembayaran dilakukan setiap <strong>akhir bulan</strong> untuk commission yang sudah qualifying</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14"/>
      <path d="M12 5v14"/>
    </svg>
  );
}