import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import {
  Wallet, Landmark, Plus, ArrowUpRight, ArrowDownRight, History, CreditCard,
  Building2, CheckCircle2, Clock, AlertCircle, ChevronRight, TrendingUp,
  Calendar, Target, Sparkles, ArrowRight, Banknote, Receipt, Gift, Shield, User,
  Share2, Award, Trophy, Star, Zap, Settings, Edit2, Camera, X, Copy, QrCode,
  TrendingDown, Bell, LogOut, ChevronLeft, BarChart3, Calculator, GiftIcon,
  Send, MessageCircle, Mail, CalendarCheck, Flame, Crown, Medal, Gem
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface UserSession {
  email: string;
  name: string;
  phone?: string;
  loginAt: string;
}

interface TabunganData {
  id: string;
  name: string;
  email: string;
  phone: string;
  saldo: number;
  target: number;
  targetUmroh: string;
  progress: number;
  tier: string;
  bulan: number;
  nextTarget: number;
  createdAt: string;
}

interface Transaction {
  id: number;
  type: "setor" | "withdraw";
  amount: number;
  date: string;
  status: "success" | "pending";
  note: string;
}

// Achievement Types
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  target: number;
  unlocked: boolean;
  unlockedAt?: string;
  reward: string;
}

// Referral Types
interface ReferralData {
  code: string;
  totalInvites: number;
  successfulReferrals: number;
  bonusEarned: number;
}

// Helper function untuk mendapatkan data tabungan dari localStorage
const getTabunganData = (session: UserSession): TabunganData => {
  const savedTabungan = localStorage.getItem("ditoris_tabungan_data");
  if (savedTabungan) {
    const parsed = JSON.parse(savedTabungan);
    // Update nama & email dari session terbaru
    return {
      ...parsed,
      name: session.name,
      email: session.email,
      phone: session.phone || parsed.phone,
    };
  }
  // Default data baru
  return {
    id: "JAM-" + Date.now().toString().slice(-6),
    name: session.name,
    email: session.email,
    phone: session.phone || "",
    saldo: 0,
    target: 35000000,
    targetUmroh: "Umroh Reguler 2026",
    progress: 0,
    tier: "Bronze",
    bulan: 0,
    nextTarget: 50000000,
    createdAt: new Date().toISOString().split("T")[0],
  };
};

// Helper function untuk mendapatkan history transaksi
const getHistory = (): Transaction[] => {
  const saved = localStorage.getItem("ditoris_tabungan_history");
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
};

// Helper untuk menyimpan history
const saveTransaction = (transaction: Omit<Transaction, "id">) => {
  const history = getHistory();
  const newTransaction = {
    ...transaction,
    id: Date.now(),
  };
  history.unshift(newTransaction);
  localStorage.setItem("ditoris_tabungan_history", JSON.stringify(history.slice(0, 50)));

  // Update saldo
  const sessionStr = localStorage.getItem("ditoris_jamaah_session");
  if (sessionStr) {
    const session: UserSession = JSON.parse(sessionStr);
    const tabungan = getTabunganData(session);
    tabungan.saldo = transaction.type === "setor"
      ? tabungan.saldo + transaction.amount
      : tabungan.saldo + transaction.amount;
    tabungan.progress = Math.min(100, Math.round((tabungan.saldo / tabungan.target) * 100));
    if (transaction.type === "setor") {
      tabungan.bulan += 1;
    }
    localStorage.setItem("ditoris_tabungan_data", JSON.stringify(tabungan));
  }
};

export default function TabunganJamaah() {
  const [, setLocation] = useLocation();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Data user dari session
  const [selectedBank, setSelectedBank] = useState<"bca" | "bni" | "mandiri" | "bri" | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawReason, setWithdrawReason] = useState("Kebutuhan mendesak");
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);

  // Data user dari session
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [tabungan, setTabungan] = useState<TabunganData | null>(null);
  const [history, setHistory] = useState<Transaction[]>([]);

  // New feature states
  const [activeTabJamaah, setActiveTabJamaah] = useState<"dashboard" | "setor" | "tarik" | "history" | "target" | "profile" | "achievement" | "calculator" | "referral">("dashboard");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editProfile, setEditProfile] = useState({ name: "", phone: "", address: "" });
  const [showShareModal, setShowShareModal] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [calculatorMonthly, setCalculatorMonthly] = useState(500000);
  const [calculatorTarget, setCalculatorTarget] = useState(35000000);
  const [calculatorResult, setCalculatorResult] = useState<{ months: number; total: number; monthlyNeeded: number } | null>(null);

  // Referral data from localStorage
  const [referralData, setReferralData] = useState<ReferralData>({
    code: "",
    totalInvites: 0,
    successfulReferrals: 0,
    bonusEarned: 0,
  });

  // Achievements from localStorage
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Check session & load data
  useEffect(() => {
    const sessionStr = localStorage.getItem("ditoris_jamaah_session");
    if (!sessionStr) {
      setLocation("/jamaah/login");
      return;
    }

    const sessionData: UserSession = JSON.parse(sessionStr);
    setUserSession(sessionData);
    setEditProfile({ name: sessionData.name, phone: sessionData.phone || "", address: "" });

    // Load tabungan data
    const tabunganData = getTabunganData(sessionData);
    setTabungan(tabunganData);

    // Load history
    setHistory(getHistory());

    // Load Referral Data
    const savedReferral = localStorage.getItem("ditoris_referral_data");
    if (savedReferral) {
      setReferralData(JSON.parse(savedReferral));
    } else {
      // Generate new referral code
      const newCode = "TN" + sessionData.name.toUpperCase().replace(/\s/g, "").slice(0, 4) + Date.now().toString().slice(-4);
      const newReferral = { code: newCode, totalInvites: 0, successfulReferrals: 0, bonusEarned: 0 };
      localStorage.setItem("ditoris_referral_data", JSON.stringify(newReferral));
      setReferralData(newReferral);
    }

    // Load Achievements
    const savedAchievements = localStorage.getItem("ditoris_achievements");
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    } else {
      // Initialize achievements
      const initialAchievements: Achievement[] = [
        { id: "first_save", name: "Penyimpan Pertama", description: "Lakukan setoran pertama", icon: <Star className="h-5 w-5" />, progress: 0, target: 1, unlocked: false, reward: "Badge Penyimpan Baru" },
        { id: "consistent_3", name: "Konsisten 3 Bulan", description: "Setor selama 3 bulan berturut-turut", icon: <Flame className="h-5 w-5" />, progress: 0, target: 3, unlocked: false, reward: "Rp 50.000 bonus" },
        { id: "consistent_6", name: "Konsisten 6 Bulan", description: "Setor selama 6 bulan berturut-turut", icon: <Trophy className="h-5 w-5" />, progress: 0, target: 6, unlocked: false, reward: "Rp 150.000 bonus" },
        { id: "millionaire", name: "Jutaanan", description: "Capai saldo Rp 1.000.000", icon: <Gem className="h-5 w-5" />, progress: 0, target: 1000000, unlocked: false, reward: "Rp 250.000 bonus" },
        { id: "ten_million", name: "Puluhan Juta", description: "Capai saldo Rp 10.000.000", icon: <Crown className="h-5 w-5" />, progress: 0, target: 10000000, unlocked: false, reward: "Rp 500.000 bonus" },
        { id: "target_reached", name: "Sasaran Tercapai", description: "Capai 100% target tabungan", icon: <Target className="h-5 w-5" />, progress: 0, target: 100, unlocked: false, reward: "Voucher Umroh Hemat" },
      ];
      localStorage.setItem("ditoris_achievements", JSON.stringify(initialAchievements));
      setAchievements(initialAchievements);
    }
  }, [setLocation]);

  // Refresh data after transactions
  const refreshData = () => {
    if (userSession) {
      const newTabungan = getTabunganData(userSession);
      setTabungan(newTabungan);
      setHistory(getHistory());

      // Update achievements based on new balance
      const savedAchievements = localStorage.getItem("ditoris_achievements");
      if (savedAchievements) {
        let updatedAchievements: Achievement[] = JSON.parse(savedAchievements);

        // Update "first_save" achievement
        if (history.length === 0 && newTabungan.saldo > 0) {
          updatedAchievements = updatedAchievements.map(a =>
            a.id === "first_save" ? { ...a, progress: 1, unlocked: true, unlockedAt: new Date().toISOString() } : a
          );
        }

        // Update "millionaire" achievement
        if (newTabungan.saldo >= 1000000) {
          updatedAchievements = updatedAchievements.map(a =>
            a.id === "millionaire" ? { ...a, progress: newTabungan.saldo, unlocked: true, unlockedAt: new Date().toISOString() } : a
          );
        } else {
          updatedAchievements = updatedAchievements.map(a =>
            a.id === "millionaire" ? { ...a, progress: newTabungan.saldo } : a
          );
        }

        // Update "ten_million" achievement
        if (newTabungan.saldo >= 10000000) {
          updatedAchievements = updatedAchievements.map(a =>
            a.id === "ten_million" ? { ...a, progress: newTabungan.saldo, unlocked: true, unlockedAt: new Date().toISOString() } : a
          );
        } else {
          updatedAchievements = updatedAchievements.map(a =>
            a.id === "ten_million" ? { ...a, progress: newTabungan.saldo } : a
          );
        }

        // Update "consistent" achievements based on bulan
        if (newTabungan.bulan >= 3) {
          updatedAchievements = updatedAchievements.map(a =>
            a.id === "consistent_3" ? { ...a, progress: newTabungan.bulan, unlocked: true, unlockedAt: new Date().toISOString() } : a
          );
        } else {
          updatedAchievements = updatedAchievements.map(a =>
            a.id === "consistent_3" ? { ...a, progress: newTabungan.bulan } : a
          );
        }

        if (newTabungan.bulan >= 6) {
          updatedAchievements = updatedAchievements.map(a =>
            a.id === "consistent_6" ? { ...a, progress: newTabungan.bulan, unlocked: true, unlockedAt: new Date().toISOString() } : a
          );
        } else {
          updatedAchievements = updatedAchievements.map(a =>
            a.id === "consistent_6" ? { ...a, progress: newTabungan.bulan } : a
          );
        }

        // Update "target_reached" achievement
        if (newTabungan.progress >= 100) {
          updatedAchievements = updatedAchievements.map(a =>
            a.id === "target_reached" ? { ...a, progress: newTabungan.progress, unlocked: true, unlockedAt: new Date().toISOString() } : a
          );
        } else {
          updatedAchievements = updatedAchievements.map(a =>
            a.id === "target_reached" ? { ...a, progress: newTabungan.progress } : a
          );
        }

        localStorage.setItem("ditoris_achievements", JSON.stringify(updatedAchievements));
        setAchievements(updatedAchievements);
      }
    }
  };

  // Helper functions
  const showNotification = (message: string) => {
    setNotifMessage(message);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 3000);
  };

  const handleSaveProfile = () => {
    if (!editProfile.name.trim()) {
      alert("Nama tidak boleh kosong!");
      return;
    }
    const sessionStr = localStorage.getItem("ditoris_jamaah_session");
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      const updatedSession = { ...session, name: editProfile.name, phone: editProfile.phone };
      localStorage.setItem("ditoris_jamaah_session", JSON.stringify(updatedSession));
      setUserSession(updatedSession);

      // Update tabungan data
      const tabunganData = getTabunganData(updatedSession);
      tabunganData.name = editProfile.name;
      tabunganData.phone = editProfile.phone;
      localStorage.setItem("ditoris_tabungan_data", JSON.stringify(tabunganData));

      showNotification("Profil berhasil diperbarui!");
      setShowProfileModal(false);
    }
  };

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralData.code);
    showNotification("Kode referral berhasil disalin!");
  };

  const handleShareWA = () => {
    const message = `Assalamualaikum! 🌙\n\nSaya sedang menabung untuk umroh di Travelnesia. Yuk ikutan juga!\n\nGunakan kode referral saya: *${referralData.code}*\n\nDaftar di: https://travelnesia.com/register\n\nTabungan Umroh mudah & tanpa bunga! 🕌`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleCalculator = () => {
    const result = {
      months: Math.ceil(calculatorTarget / calculatorMonthly),
      total: calculatorTarget,
      monthlyNeeded: calculatorMonthly,
    };
    setCalculatorResult(result);
  };

  const handleSelectTarget = (target: number, name: string) => {
    if (userSession) {
      const tabunganData = getTabunganData(userSession);
      tabunganData.target = target;
      tabunganData.targetUmroh = name;
      tabunganData.progress = Math.min(100, Math.round((tabunganData.saldo / target) * 100));
      localStorage.setItem("ditoris_tabungan_data", JSON.stringify(tabunganData));
      setTabungan(tabunganData);
      showNotification(`Target berhasil diubah ke ${name}!`);
      setActiveTabJamaah("dashboard");
    }
  };

  const handleUpgradeTarget = () => {
    setActiveTabJamaah("target");
  };

  const getTierInfo = (saldo: number) => {
    if (saldo >= 20000000) return { name: "Gold", color: "from-yellow-400 to-amber-500", icon: <Crown className="h-5 w-5" /> };
    if (saldo >= 10000000) return { name: "Silver", color: "from-gray-300 to-gray-400", icon: <Medal className="h-5 w-5" /> };
    if (saldo >= 5000000) return { name: "Bronze", color: "from-orange-400 to-orange-500", icon: <Award className="h-5 w-5" /> };
    return { name: "Starter", color: "from-slate-300 to-slate-400", icon: <Star className="h-5 w-5" /> };
  };

  const getUnlockedCount = () => achievements.filter(a => a.unlocked).length;

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleSetor = () => {
    const numAmount = parseInt(amount);
    if (!amount || numAmount < 100000) {
      alert("Minimal setoran Rp 100.000");
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    if (!selectedBank) {
      alert("Pilih metode pembayaran terlebih dahulu");
      return;
    }
    // Simpan transaksi
    const numAmount = parseInt(amount);
    saveTransaction({
      type: "setor",
      amount: numAmount,
      date: new Date().toISOString().split("T")[0],
      status: "success",
      note: "Setoran tabungan"
    });

    setShowPaymentModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setAmount("");
    setSelectedBank(null);

    // Refresh data
    refreshData();
  };

  const handleWithdraw = () => {
    const numAmount = parseInt(withdrawAmount);
    if (!withdrawAmount || numAmount < 50000) {
      alert("Minimal penarikan Rp 50.000");
      return;
    }
    if (numAmount > (tabungan?.saldo || 0)) {
      alert("Saldo tidak mencukupi");
      return;
    }
    if (!withdrawAccount) {
      alert("Masukkan nomor rekening tujuan");
      return;
    }

    // Simpan transaksi penarikan
    saveTransaction({
      type: "withdraw",
      amount: -numAmount,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      note: `Penarikan: ${withdrawReason}`
    });

    setShowWithdrawSuccess(true);
    setTimeout(() => setShowWithdrawSuccess(false), 3000);
    setWithdrawAmount("");
    setWithdrawAccount("");

    // Refresh data
    refreshData();
  };

  const banks = [
    { id: "bca", name: "BCA", logo: "🏦", va: "88012" + Math.random().toString().slice(2, 10) },
    { id: "bni", name: "BNI", logo: "🏛️", va: "88013" + Math.random().toString().slice(2, 10) },
    { id: "mandiri", name: "Mandiri", logo: "🏪", va: "88014" + Math.random().toString().slice(2, 10) },
    { id: "bri", name: "BRI", logo: "🏤", va: "88015" + Math.random().toString().slice(2, 10) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="Travelnesia" className="h-10 w-10 rounded-lg" />
                <div>
                  <span className="font-bold text-lg">TRAVELNESIA</span>
                  <span className="text-xs text-slate-500 block">Tabungan Umroh</span>
                </div>
              </a>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Bell className="h-6 w-6 text-slate-600" />
              {getUnlockedCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {getUnlockedCount()}
                </span>
              )}
            </button>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Selamat datang,</p>
                <p className="font-bold text-slate-900">{userSession?.name || "Loading..."}</p>
              </div>

              {/* Tier Badge */}
              <div className={cn(
                "hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r text-white text-xs font-bold",
                getTierInfo(tabungan?.saldo || 0).color
              )}>
                {getTierInfo(tabungan?.saldo || 0).icon}
                {getTierInfo(tabungan?.saldo || 0).name}
              </div>

              <button
                onClick={() => setShowProfileModal(true)}
                className="w-12 h-12 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg hover:shadow-lg transition-shadow"
              >
                {userSession?.name?.charAt(0).toUpperCase() || <User className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {showNotif && (
        <div className="fixed top-20 right-4 z-50 bg-white rounded-xl shadow-2xl border p-4 w-80 animate-in slide-in-from-top">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">Notifikasi</h3>
            <button onClick={() => setShowNotif(false)} className="p-1 hover:bg-slate-100 rounded">
              <X className="h-4 w-4" />
            </button>
          </div>
          {achievements.filter(a => a.unlocked).length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Achievement baru!</p>
              {achievements.filter(a => a.unlocked).slice(0, 3).map(a => (
                <div key={a.id} className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                  <span className="text-lg">{a.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{a.name}</p>
                    <p className="text-xs text-slate-500">{a.reward}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Tidak ada notifikasi baru</p>
          )}
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="h-5 w-5" />
          Transaksi berhasil! Saldo akan bertambah setelah verifikasi.
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8 flex gap-2 overflow-x-auto">
          {[
            { id: "dashboard", label: "Dashboard", icon: Wallet },
            { id: "setor", label: "Setor", icon: Plus },
            { id: "tarik", label: "Tarik", icon: ArrowUpRight },
            { id: "history", label: "Riwayat", icon: History },
            { id: "target", label: "Target", icon: Target },
            { id: "achievement", label: "Achievement", icon: Trophy },
            { id: "calculator", label: "Kalkulator", icon: Calculator },
            { id: "referral", label: "Referral", icon: GiftIcon },
            { id: "profile", label: "Profil", icon: User },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabJamaah(tab.id as typeof activeTabJamaah)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap",
                activeTabJamaah === tab.id
                  ? "bg-gradient-to-r from-primary to-green-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTabJamaah === "dashboard" && (
          <div className="space-y-8">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-primary via-blue-600 to-green-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-white/80 text-sm">Saldo Tabungan</p>
                    <p className="text-5xl font-bold">{formatCurrency(tabungan?.saldo || 0)}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Landmark className="h-10 w-10" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-white/70 text-xs">Target</p>
                    <p className="font-bold">{formatCurrency(tabungan?.target || 0)}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-white/70 text-xs">Progress</p>
                    <p className="font-bold">{tabungan?.progress || 0}%</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-white/70 text-xs">Bulan Menabung</p>
                    <p className="font-bold">{tabungan?.bulan || 0} bln</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveTabJamaah("setor")}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Plus className="h-7 w-7 text-green-600" />
                </div>
                <p className="font-bold text-slate-900">Setor</p>
                <p className="text-sm text-slate-500">Tambah tabungan</p>
              </button>

              <button
                onClick={() => setActiveTabJamaah("tarik")}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <ArrowUpRight className="h-7 w-7 text-blue-600" />
                </div>
                <p className="font-bold text-slate-900">Tarik</p>
                <p className="text-sm text-slate-500">Ambil tabungan</p>
              </button>

              <button
                onClick={() => setActiveTabJamaah("target")}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                  <Target className="h-7 w-7 text-amber-600" />
                </div>
                <p className="font-bold text-slate-900">Target</p>
                <p className="text-sm text-slate-500">Atur target umroh</p>
              </button>

              <button
                onClick={() => setActiveTabJamaah("history")}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <History className="h-7 w-7 text-purple-600" />
                </div>
                <p className="font-bold text-slate-900">Riwayat</p>
                <p className="text-sm text-slate-500">Lihat transaksi</p>
              </button>
            </div>

            {/* Progress & Tips */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Progress */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Progress Menabung
                </h3>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-bold text-primary">{tabungan?.progress || 0}%</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${tabungan?.progress || 0}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                    <span className="text-sm text-slate-600">💰 Sudah Ditabung</span>
                    <span className="font-bold text-green-600">{formatCurrency(tabungan?.saldo || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-slate-600">🎯 Sisa Target</span>
                    <span className="font-bold text-slate-900">{formatCurrency((tabungan?.target || 0) - (tabungan?.saldo || 0))}</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  Tips Menabung
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: "💡", title: "Setor rutin setiap bulan", desc: "Otomatis jadi kebiasaan" },
                    { icon: "🎁", title: "Bonus 5% untuk setoran rutin", desc: "Setor setiap tanggal 1-5" },
                    { icon: "📈", title: "Naikkan nominal bertahap", desc: "Tambah Rp 100.000/bulan" },
                    { icon: "🏆", title: "Klaim challenge bulanan", desc: "Dapat cashback hingga 10%" },
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                      <span className="text-2xl">{tip.icon}</span>
                      <div>
                        <p className="font-medium text-slate-900">{tip.title}</p>
                        <p className="text-sm text-slate-500">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Target Info */}
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-white/80 text-sm">Target Berikutnya</p>
                  <p className="text-3xl font-bold">{formatCurrency(tabungan?.nextTarget || 50000000)}</p>
                  <p className="text-white/80 mt-1">Umroh Hemat - Target 6 bulan</p>
                </div>
                <button
                  onClick={handleUpgradeTarget}
                  className="bg-white text-amber-600 px-6 py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors flex items-center gap-2"
                >
                  Upgrade Target
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold">{tabungan?.bulan || 0}</p>
                <p className="text-sm text-slate-500">Bulan Menabung</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold">{getUnlockedCount()}/{achievements.length}</p>
                <p className="text-sm text-slate-500">Achievement</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-amber-600" />
                </div>
                <p className="text-2xl font-bold">{getTierInfo(tabungan?.saldo || 0).name}</p>
                <p className="text-sm text-slate-500">Tier Saat Ini</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GiftIcon className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold">{referralData.successfulReferrals}</p>
                <p className="text-sm text-slate-500">Referral Sukses</p>
              </div>
            </div>
          </div>
        )}

        {/* Setor Tab */}
        {activeTabJamaah === "setor" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Plus className="h-6 w-6 text-green-600" />
                </div>
                Setor Tabungan
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Jumlah Setoran</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-lg">Rp</span>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                      placeholder="500.000"
                      className="w-full pl-12 pr-4 py-4 text-2xl font-bold rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-0 outline-none"
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-2">Minimal: Rp 100.000</p>
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex flex-wrap gap-2">
                  {[100000, 250000, 500000, 750000, 1000000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val.toString())}
                      className={cn(
                        "px-4 py-2 rounded-lg font-medium transition-colors",
                        amount === val.toString()
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      )}
                    >
                      {formatCurrency(val)}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Catatan (opsional)</label>
                  <input
                    type="text"
                    placeholder="Contoh: Setoran bulanan Mei 2026"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-0 outline-none"
                  />
                </div>

                <button
                  onClick={handleSetor}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-5 w-5" />
                  Bayar Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tarik Tab */}
        {activeTabJamaah === "tarik" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowUpRight className="h-6 w-6 text-blue-600" />
                </div>
                Tarik Tabungan
              </h2>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Informasi Penarikan</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Penarikan akan diproses dalam 1x24 jam kerja. Biaya admin Rp 15.000 per transaksi.
                      Saldo tersedia: <strong>{formatCurrency(tabungan?.saldo || 0)}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Jumlah Penarikan</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-lg">Rp</span>
                    <input
                      type="text"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value.replace(/\D/g, ""))}
                      placeholder="500.000"
                      className="w-full pl-12 pr-4 py-4 text-2xl font-bold rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-0 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Alasan Penarikan</label>
                  <select
                    value={withdrawReason}
                    onChange={(e) => setWithdrawReason(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-0 outline-none"
                  >
                    <option>Kebutuhan mendesak</option>
                    <option>Urusan keluarga</option>
                    <option>Ganti target tabungan</option>
                    <option>Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nomor Rekening Tujuan</label>
                  <input
                    type="text"
                    value={withdrawAccount}
                    onChange={(e) => setWithdrawAccount(e.target.value)}
                    placeholder="Masukkan nomor rekening"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-0 outline-none"
                  />
                </div>

                <button
                  onClick={handleWithdraw}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Banknote className="h-5 w-5" />
                  Ajukan Penarikan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTabJamaah === "history" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Riwayat Transaksi</h2>

              <div className="space-y-4">
                {history.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <History className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <p>Belum ada transaksi</p>
                    <p className="text-sm">Mulai menabung untuk melihat riwayat</p>
                  </div>
                ) : (
                  history.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center",
                        item.type === "setor" ? "bg-green-100" : "bg-red-100"
                      )}>
                        {item.type === "setor" ? (
                          <ArrowDownRight className="h-6 w-6 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-6 w-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.note}</p>
                        <p className="text-sm text-slate-500">{item.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "font-bold",
                        item.amount > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {item.amount > 0 ? "+" : ""}{formatCurrency(item.amount)}
                      </p>
                      <span className="text-xs text-green-600 flex items-center gap-1 justify-end">
                        <CheckCircle2 className="h-3 w-3" />
                        {item.status === "success" ? "Berhasil" : "Pending"}
                      </span>
                    </div>
                  </div>
                ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Target Tab */}
        {activeTabJamaah === "target" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-2">Pengaturan Target Umroh</h2>
              <p className="text-slate-500 mb-8">Pilih paket umroh yang sesuai dengan impian Anda</p>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: "Umroh Hemat", price: 35000000, months: 18, popular: false, desc: "Paket ekonomis untuk umroh pertama", features: ["Transportasi kelas ekonomi", "Hotel bintang 3", "Makan 2x sehari", "Ziarah standar"] },
                  { name: "Umroh Reguler", price: 50000000, months: 24, popular: true, desc: "Paket paling populer", features: ["Transportasi kelas bisnis", "Hotel bintang 4", "Makan 3x sehari", "Ziarah lengkap", "Pendamping eksklusif"] },
                  { name: "Umroh Premium", price: 85000000, months: 36, popular: false, desc: "Pengalaman umroh eksklusif", features: ["Transportasi first class", "Hotel bintang 5", "Makan premium", "Ziarah eksklusif", "Private tour", "Gift box special"] },
                ].map((pkg) => (
                  <div key={pkg.name} className={cn(
                    "border-2 rounded-2xl p-6 relative transition-all hover:shadow-xl",
                    pkg.popular ? "border-primary shadow-lg" : "border-slate-200"
                  )}>
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                        TERPOPULER
                      </div>
                    )}
                    <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                    <p className="text-sm text-slate-500 mb-3">{pkg.desc}</p>
                    <p className="text-3xl font-bold text-primary mb-1">{formatCurrency(pkg.price)}</p>
                    <p className="text-sm text-slate-500 mb-4">Target {pkg.months} bulan</p>
                    <div className="space-y-2 mb-6">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      Cicilan: <strong>{formatCurrency(Math.ceil(pkg.price / pkg.months))}/bulan</strong>
                    </p>
                    <button
                      onClick={() => handleSelectTarget(pkg.price, pkg.name)}
                      className={cn(
                        "w-full py-3 rounded-xl font-bold transition-all hover:scale-105",
                        pkg.popular
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      )}
                    >
                      Pilih Target Ini
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievement Tab */}
        {activeTabJamaah === "achievement" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Achievement</h2>
                  <p className="text-slate-500">{getUnlockedCount()} dari {achievements.length} achievement terbuka</p>
                </div>
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle
                      cx="40" cy="40" r="36"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(getUnlockedCount() / achievements.length) * 226} 226`}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={cn(
                      "relative p-6 rounded-2xl border-2 transition-all",
                      achievement.unlocked
                        ? "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300"
                        : "bg-slate-50 border-slate-200"
                    )}
                  >
                    {achievement.unlocked && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        ✓ Terbuka
                      </div>
                    )}
                    <div className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center mb-4",
                      achievement.unlocked ? "bg-amber-100" : "bg-slate-200"
                    )}>
                      <span className={achievement.unlocked ? "" : "grayscale opacity-50"}>
                        {achievement.icon}
                      </span>
                    </div>
                    <h3 className="font-bold mb-1">{achievement.name}</h3>
                    <p className="text-sm text-slate-500 mb-3">{achievement.description}</p>

                    {/* Progress Bar */}
                    {achievement.id.includes("consistent") || achievement.id.includes("million") || achievement.id.includes("ten_million") ? (
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">Progress</span>
                          <span className="font-medium">{achievement.id.includes("ten_million") || achievement.id.includes("million")
                            ? formatCurrency(Math.min(achievement.progress, achievement.target))
                            : `${achievement.progress}/${achievement.target}`
                          }</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              achievement.unlocked ? "bg-green-500" : "bg-primary"
                            )}
                            style={{ width: `${Math.min(100, (achievement.progress / achievement.target) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ) : null}

                    <div className="flex items-center gap-2 text-xs text-amber-600">
                      <GiftIcon className="h-4 w-4" />
                      {achievement.reward}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Calculator Tab */}
        {activeTabJamaah === "calculator" && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <Calculator className="h-8 w-8 text-primary" />
                Kalkulator Tabungan
              </h2>
              <p className="text-slate-500 mb-8">Hitung berapa lama dan berapa yang perlu ditabung setiap bulan</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Target Tabungan</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-lg">Rp</span>
                    <input
                      type="text"
                      value={calculatorTarget.toLocaleString("id-ID")}
                      onChange={(e) => setCalculatorTarget(parseInt(e.target.value.replace(/\D/g, "")) || 0)}
                      className="w-full pl-12 pr-4 py-4 text-2xl font-bold rounded-xl border-2 border-slate-200 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[35000000, 50000000, 75000000, 100000000].map((val) => (
                      <button
                        key={val}
                        onClick={() => setCalculatorTarget(val)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                          calculatorTarget === val
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        )}
                      >
                        {formatCurrency(val)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Setoran Bulanan</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-lg">Rp</span>
                    <input
                      type="text"
                      value={calculatorMonthly.toLocaleString("id-ID")}
                      onChange={(e) => setCalculatorMonthly(parseInt(e.target.value.replace(/\D/g, "")) || 0)}
                      className="w-full pl-12 pr-4 py-4 text-2xl font-bold rounded-xl border-2 border-slate-200 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[250000, 500000, 750000, 1000000, 1500000].map((val) => (
                      <button
                        key={val}
                        onClick={() => setCalculatorMonthly(val)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                          calculatorMonthly === val
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        )}
                      >
                        {formatCurrency(val)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCalculator}
                  className="w-full py-4 bg-gradient-to-r from-primary to-green-600 text-white rounded-xl font-bold text-lg hover:from-primary/90 hover:to-green-700 transition-all shadow-lg"
                >
                  Hitung
                </button>

                {calculatorResult && (
                  <div className="bg-gradient-to-br from-primary to-green-600 rounded-2xl p-8 text-white">
                    <h3 className="font-bold text-xl mb-6 text-center">Hasil Perhitungan</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white/10 rounded-xl p-4 text-center">
                        <p className="text-white/70 text-sm mb-1">Target</p>
                        <p className="text-2xl font-bold">{formatCurrency(calculatorResult.total)}</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 text-center">
                        <p className="text-white/70 text-sm mb-1">Setoran/bulan</p>
                        <p className="text-2xl font-bold">{formatCurrency(calculatorResult.monthlyNeeded)}</p>
                      </div>
                    </div>
                    <div className="mt-6 bg-white/20 rounded-xl p-6 text-center">
                      <p className="text-white/70 text-sm mb-2">Estimasi waktu pencapaian</p>
                      <p className="text-4xl font-bold">{calculatorResult.months} Bulan</p>
                      <p className="text-white/70 mt-2">({Math.floor(calculatorResult.months / 12)} tahun {calculatorResult.months % 12} bulan)</p>
                    </div>
                    <button
                      onClick={() => handleSelectTarget(calculatorResult.total, "Custom Target")}
                      className="w-full mt-6 py-3 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors"
                    >
                      Gunakan Target Ini
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Referral Tab */}
        {activeTabJamaah === "referral" && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <GiftIcon className="h-8 w-8 text-purple-500" />
                Program Referral
              </h2>
              <p className="text-slate-500 mb-8">Ajak teman bergabung dan dapatkan bonus menarik!</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-blue-600">{referralData.totalInvites}</p>
                  <p className="text-sm text-blue-600">Total Undangan</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-green-600">{referralData.successfulReferrals}</p>
                  <p className="text-sm text-green-600">Berhasil</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-amber-600">{formatCurrency(referralData.bonusEarned)}</p>
                  <p className="text-sm text-amber-600">Bonus Didapat</p>
                </div>
              </div>

              {/* Referral Code */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-8">
                <p className="text-white/80 text-sm mb-2">Kode Referral Anda</p>
                <div className="flex items-center gap-4">
                  <p className="text-3xl font-bold tracking-wider">{referralData.code}</p>
                  <button
                    onClick={handleCopyReferralCode}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Copy className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-white/60 text-sm mt-3">Bagikan kode ini ke teman-teman Anda</p>
              </div>

              {/* Share Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={handleShareWA}
                  className="flex items-center justify-center gap-3 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="h-6 w-6" />
                  Share via WhatsApp
                </button>
                <button
                  onClick={() => {
                    const message = `Assalamualaikum! Saya sedang menabung untuk umroh di Travelnesia. Yuk ikutan juga! Kode referral: ${referralData.code} - Daftar di: https://travelnesia.com/register`;
                    window.open(`https://t.me/share/url?url=${encodeURIComponent("https://travelnesia.com/register")}&text=${encodeURIComponent(message)}`, "_blank");
                  }}
                  className="flex items-center justify-center gap-3 py-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
                >
                  <Send className="h-6 w-6" />
                  Share via Telegram
                </button>
              </div>

              {/* How it works */}
              <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-bold mb-4">Cara Kerja Program Referral</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Bagikan Kode", desc: "Bagikan kode referral Anda ke teman" },
                    { step: 2, title: "Teman Mendaftar", desc: "Teman mendaftar menggunakan kode Anda" },
                    { step: 3, title: "Mulai Menabung", desc: "Teman Anda mulai menabung" },
                    { step: 4, title: "Dapat Bonus", desc: "Anda dapat Rp 100.000 per referral sukses" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTabJamaah === "profile" && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Settings className="h-8 w-8 text-slate-600" />
                Pengaturan Profil
              </h2>

              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white font-bold text-4xl">
                    {userSession?.name?.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{userSession?.name}</h3>
                  <p className="text-slate-500">{userSession?.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={cn("px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r", getTierInfo(tabungan?.saldo || 0).color)}>
                      {getTierInfo(tabungan?.saldo || 0).name} Member
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={editProfile.name}
                      onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      value={userSession?.email || ""}
                      disabled
                      className="w-full pl-12 pr-4 py-3 rounded-lg border bg-slate-50 text-slate-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Email tidak dapat diubah</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nomor WhatsApp</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">+62</span>
                    <input
                      type="tel"
                      value={editProfile.phone}
                      onChange={(e) => setEditProfile({ ...editProfile, phone: e.target.value })}
                      className="w-full pl-14 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="81234567890"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="w-full py-4 bg-gradient-to-r from-primary to-green-600 text-white rounded-xl font-bold hover:from-primary/90 hover:to-green-700 transition-all shadow-lg"
                >
                  Simpan Perubahan
                </button>
              </div>

              {/* Logout */}
              <div className="mt-8 pt-8 border-t">
                <button
                  onClick={() => {
                    if (confirm("Apakah Anda yakin ingin keluar?")) {
                      localStorage.removeItem("ditoris_jamaah_session");
                      window.location.href = "/jamaah/login";
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-4 border border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Keluar dari Akun
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              Pilih Metode Pembayaran
            </h3>

            <div className="mb-6 p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-500">Total Pembayaran</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(parseInt(amount || "0"))}</p>
            </div>

            <div className="space-y-3 mb-6">
              {banks.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => setSelectedBank(bank.id as typeof selectedBank)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors",
                    selectedBank === bank.id
                      ? "border-primary bg-primary/5"
                      : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{bank.logo}</span>
                    <div className="text-left">
                      <p className="font-bold">{bank.name}</p>
                      <p className="text-sm text-slate-500">Virtual Account</p>
                    </div>
                  </div>
                  {selectedBank === bank.id && (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  )}
                </button>
              ))}
            </div>

            {selectedBank && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Virtual Account {banks.find(b => b.id === selectedBank)?.name}:</strong>
                </p>
                <p className="text-2xl font-bold text-blue-600 font-mono">
                  {banks.find(b => b.id === selectedBank)?.va}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Bayar melalui aplikasi {banks.find(b => b.id === selectedBank)?.name} atau ATM
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedBank(null);
                }}
                className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handlePayment}
                disabled={!selectedBank}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Konfirmasi Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}