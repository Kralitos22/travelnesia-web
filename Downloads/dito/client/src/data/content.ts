import { Plane, Building2, Shield, Users, Star, Clock, CheckCircle2 } from "lucide-react";

export const services = [
  {
    icon: Plane,
    title: "Penerbangan Langsung",
    description: "Penerbangan langsung dari Indonesia ke Jeddah dengan maskapai terbaik.",
  },
  {
    icon: Building2,
    title: "Akomodasi bintang 5",
    description: "Hotel bintang 5 di dekat Masjidil Haram dan Masjid Nabawi.",
  },
  {
    icon: Shield,
    title: "Visa & Asuransi",
    description: "Proses visa lengkap dengan asuransi perjalanan premium.",
  },
  {
    icon: Users,
    title: "Grup Kecil",
    description: "Maksimal 25 Jamaah per keberangkatan untuk kenyamanan optimal.",
  },
];

export const features = [
  "Guide berpengalaman bersertifikasi",
  "Makan 3x sehari (buffet halal)",
  "Transportasi AC mewah",
  "Ziarah sejarah Islam",
  "Bimbingan manasik umroh",
  "360° virtual tour hotel",
];

export const packages = [
  {
    name: "Umroh Reguler",
    duration: "9 Hari",
    price: "IDR 28.500.000",
    highlights: ["Hotel Bintang 4/5", "Transportasi AC", "Makan 3x Sehari", "Ziarah Full", "Guide Berpengalaman"],
    badge: "Terpopuler",
  },
  {
    name: "Umroh Premium",
    duration: "12 Hari",
    price: "IDR 45.000.000",
    highlights: ["Hotel Mewah 5 Star", "Suite Room", "Private Transport", "Ziarah Tambahan", "Shopping Tour"],
    badge: "Best Value",
  },
  {
    name: "Haji Furoda",
    duration: "30 Hari",
    price: "IDR 185.000.000",
    highlights: ["Kuota Pemerintah", "Hotel Bintang 5", "Pendampingan Sepanjang", "Transportasi Premium", "Asuransi Komprehensif"],
    badge: "Kuota Terbatas",
  },
];

export const testimonials = [
  {
    name: "H. Ahmad Wijaya",
    location: "Jakarta",
    text: "Alhamdulillah terima kasih Travelnesia! Pelayanannya sangat profesional dan guide-nya sangat sabar membimbing kami.",
    rating: 5,
  },
  {
    name: "Hj. Fatimah Hasan",
    location: "Surabaya",
    text: "Sudah 2 kali umroh dengan Travelnesia, tidak pernah kecewa. Hotel dekat masjid, makan enak, dan organise rapi.",
    rating: 5,
  },
  {
    name: "H. Budi Santoso",
    location: "Bandung",
    text: "Package premium sangat worth it! Kamar hotelnya luas, transportasinya mewah, dan ziyarahnya lengkap.",
    rating: 5,
  },
];