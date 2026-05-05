import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  occupation: string;
  instagram: string;
  level: "Basic" | "Silver" | "Gold";
  joinDate: string;
  totalProspects: number;
  totalRegistered: number;
  totalDeparted: number;
  pendingCommission: number;
  paidCommission: number;
  totalCommission: number;
  status: "active" | "dormant" | "inactive";
}

export interface Prospect {
  id: string;
  affiliateId: string;
  name: string;
  phone: string;
  package: string;
  status: "prospect" | "registered" | "departed" | "cancelled";
  source: "event" | "walk_in" | "referral" | "social_media";
  eventName?: string;
  createdAt: string;
  registeredAt?: string;
  departureDate?: string;
  commission: number;
  bonusEvent: number;
  notes: string;
}

interface AuthContextType {
  affiliate: Affiliate | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (data: Omit<Affiliate, "id" | "joinDate" | "level" | "status" | "totalProspects" | "totalRegistered" | "totalDeparted" | "pendingCommission" | "paidCommission" | "totalCommission"> & { password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateAffiliate: (data: Partial<Affiliate>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_USERS = [
  { email: "affiliate@ditoris.com", password: "demo123", id: "AFF-2025-001" },
  { email: "demo@ditoris.com", password: "demo123", id: "AFF-2025-002" },
];

// Mock data storage
const getMockData = (): { affiliates: Affiliate[]; prospects: Prospect[] } => {
  const stored = localStorage.getItem("ditoris_affiliate_data");
  if (stored) {
    return JSON.parse(stored);
  }

  const initialData = {
    affiliates: [
      {
        id: "AFF-2025-001",
        name: "Ahmad Fauzi",
        email: "affiliate@ditoris.com",
        phone: "081234567890",
        city: "Jakarta",
        occupation: "Pengurus Masjid",
        instagram: "@ahmad_fauzi",
        level: "Gold",
        joinDate: "2025-01-15",
        totalProspects: 15,
        totalRegistered: 12,
        totalDeparted: 8,
        pendingCommission: 4500000,
        paidCommission: 12000000,
        totalCommission: 16500000,
        status: "active",
      },
      {
        id: "AFF-2025-002",
        name: "Siti Nurhaliza",
        email: "demo@ditoris.com",
        phone: "081298765432",
        city: "Surabaya",
        occupation: "Top Affiliate",
        instagram: "@siti_nurhaliza",
        level: "Gold",
        joinDate: "2025-02-20",
        totalProspects: 25,
        totalRegistered: 20,
        totalDeparted: 15,
        pendingCommission: 7500000,
        paidCommission: 25000000,
        totalCommission: 32500000,
        status: "active",
      },
    ] as Affiliate[],
    prospects: [
      {
        id: "PROS-001",
        affiliateId: "AFF-2025-001",
        name: "Budi Santoso",
        phone: "081345678901",
        package: "Umroh Reguler 9 Hari",
        status: "registered",
        source: "event",
        eventName: "Event Surabaya April 2026",
        createdAt: "2026-04-20",
        registeredAt: "2026-04-25",
        commission: 750000,
        bonusEvent: 300000,
        notes: "Sudah DP 5jt",
      },
      {
        id: "PROS-002",
        affiliateId: "AFF-2025-001",
        name: "Siti Aminah",
        phone: "081367890123",
        package: "Umroh Premium 12 Hari",
        status: "departed",
        source: "event",
        eventName: "Event Jakarta Maret 2026",
        createdAt: "2026-03-15",
        registeredAt: "2026-03-20",
        departureDate: "2026-04-15",
        commission: 1000000,
        bonusEvent: 500000,
        notes: "Sudah berangkat, komisi cair H-14",
      },
      {
        id: "PROS-003",
        affiliateId: "AFF-2025-001",
        name: "Hasan Wijaya",
        phone: "081389012345",
        package: "Umroh Reguler 9 Hari",
        status: "prospect",
        source: "walk_in",
        createdAt: "2026-04-28",
        commission: 0,
        bonusEvent: 0,
        notes: "Interested, follow up needed",
      },
    ] as Prospect[],
  };

  localStorage.setItem("ditoris_affiliate_data", JSON.stringify(initialData));
  return initialData;
};

const saveMockData = (data: { affiliates: Affiliate[]; prospects: Prospect[] }) => {
  localStorage.setItem("ditoris_affiliate_data", JSON.stringify(data));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedSession = sessionStorage.getItem("ditoris_session");
    if (storedSession) {
      const data = getMockData();
      const user = data.affiliates.find((a) => a.email === JSON.parse(storedSession).email);
      if (user) {
        setAffiliate(user);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const demoUser = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (demoUser) {
      const data = getMockData();
      const user = data.affiliates.find((a) => a.id === demoUser.id);
      if (user) {
        setAffiliate(user);
        sessionStorage.setItem("ditoris_session", JSON.stringify({ email: user.email }));
        return { success: true, message: "Login berhasil!" };
      }
    }

    return { success: false, message: "Email atau password salah!" };
  };

  const register = async (data: Omit<Affiliate, "id" | "joinDate" | "level" | "status" | "totalProspects" | "totalRegistered" | "totalDeparted" | "pendingCommission" | "paidCommission" | "totalCommission"> & { password: string }): Promise<{ success: boolean; message: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const allData = getMockData();

    // Check if email exists
    if (allData.affiliates.find((a) => a.email === data.email)) {
      return { success: false, message: "Email sudah terdaftar!" };
    }

    // Create new affiliate
    const newAffiliate: Affiliate = {
      id: `AFF-${new Date().getFullYear()}-${String(allData.affiliates.length + 1).padStart(3, "0")}`,
      ...data,
      level: "Basic",
      joinDate: new Date().toISOString().split("T")[0],
      totalProspects: 0,
      totalRegistered: 0,
      totalDeparted: 0,
      pendingCommission: 0,
      paidCommission: 0,
      totalCommission: 0,
      status: "active",
    };

    allData.affiliates.push(newAffiliate);
    saveMockData(allData);

    setAffiliate(newAffiliate);
    sessionStorage.setItem("ditoris_session", JSON.stringify({ email: newAffiliate.email }));

    return { success: true, message: "Registrasi berhasil! Selamat datang, " + data.name };
  };

  const logout = () => {
    setAffiliate(null);
    sessionStorage.removeItem("ditoris_session");
  };

  const updateAffiliate = (data: Partial<Affiliate>) => {
    if (affiliate) {
      const updated = { ...affiliate, ...data };
      setAffiliate(updated);

      // Save to localStorage
      const allData = getMockData();
      const index = allData.affiliates.findIndex((a) => a.id === affiliate.id);
      if (index !== -1) {
        allData.affiliates[index] = updated;
        saveMockData(allData);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        affiliate,
        isAuthenticated: !!affiliate,
        isLoading,
        login,
        register,
        logout,
        updateAffiliate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Export for use in other components
export { getMockData, saveMockData };
export type { Prospect };