export type RiskLevel = "Low" | "Medium" | "High"

export interface Basin {
  id: string
  name: string
  nameAssamese: string
  currentRainfall: number
  predictedRisk: RiskLevel
  drainageBlockage: number
  lastUpdated: string
  coordinates: { x: number; y: number }
}

export interface CitizenReport {
  id: string
  message: string
  messageAssamese: string
  location: string
  locationAssamese: string
  timestamp: string
  type: "waterlogging" | "drain" | "road" | "other"
  verified: boolean
}

export interface RainfallData {
  time: string
  rainfall: number
  predicted: number
}

export const basins: Basin[] = [
  {
    id: "jalukbari",
    name: "Jalukbari (Main)",
    nameAssamese: "জালুকবাৰী (মুখ্য)",
    currentRainfall: 45.2,
    predictedRisk: "High",
    drainageBlockage: 72,
    lastUpdated: "2 mins ago",
    coordinates: { x: 35, y: 30 }
  },
  {
    id: "maligaon",
    name: "Maligaon",
    nameAssamese: "মালিগাঁও",
    currentRainfall: 32.8,
    predictedRisk: "Medium",
    drainageBlockage: 45,
    lastUpdated: "3 mins ago",
    coordinates: { x: 55, y: 45 }
  },
  {
    id: "fancy-bazar",
    name: "Fancy Bazar",
    nameAssamese: "ফেঞ্চী বজাৰ",
    currentRainfall: 18.5,
    predictedRisk: "Low",
    drainageBlockage: 28,
    lastUpdated: "1 min ago",
    coordinates: { x: 65, y: 60 }
  },
  {
    id: "bharalumukh",
    name: "Bharalumukh",
    nameAssamese: "ভৰলুমুখ",
    currentRainfall: 38.1,
    predictedRisk: "Medium",
    drainageBlockage: 55,
    lastUpdated: "4 mins ago",
    coordinates: { x: 45, y: 70 }
  }
]

export const citizenReports: CitizenReport[] = [
  {
    id: "1",
    message: "Severe waterlogging at TU road junction",
    messageAssamese: "টিইউ পথৰ সংযোগস্থলত তীব্ৰ জলবদ্ধতা",
    location: "Jalukbari",
    locationAssamese: "জালুকবাৰী",
    timestamp: "5 mins ago",
    type: "waterlogging",
    verified: true
  },
  {
    id: "2",
    message: "Blocked drain near Gauhati University gate",
    messageAssamese: "গুৱাহাটী বিশ্ববিদ্যালয়ৰ গেটৰ ওচৰত নলাৰ অৱৰোধ",
    location: "Jalukbari",
    locationAssamese: "জালুকবাৰী",
    timestamp: "12 mins ago",
    type: "drain",
    verified: true
  },
  {
    id: "3",
    message: "Water level rising on MG Road",
    messageAssamese: "এম জি পথত পানীৰ স্তৰ বাঢ়িছে",
    location: "Fancy Bazar",
    locationAssamese: "ফেঞ্চী বজাৰ",
    timestamp: "18 mins ago",
    type: "waterlogging",
    verified: false
  },
  {
    id: "4",
    message: "Drainage overflow near railway station",
    messageAssamese: "ৰেলৱে ষ্টেচনৰ ওচৰত নলাৰ পানী উফন্দি পৰিছে",
    location: "Maligaon",
    locationAssamese: "মালিগাঁও",
    timestamp: "25 mins ago",
    type: "drain",
    verified: true
  },
  {
    id: "5",
    message: "Road submerged near Nehru Stadium",
    messageAssamese: "নেহৰু ষ্টেডিয়ামৰ ওচৰত পথ পানীত ডুবিছে",
    location: "Bharalumukh",
    locationAssamese: "ভৰলুমুখ",
    timestamp: "32 mins ago",
    type: "road",
    verified: true
  },
  {
    id: "6",
    message: "Pothole causing water accumulation",
    messageAssamese: "গাঁতে পানী জমা কৰাইছে",
    location: "Maligaon",
    locationAssamese: "মালিগাঁও",
    timestamp: "45 mins ago",
    type: "other",
    verified: false
  }
]

export const rainfallData: RainfallData[] = [
  { time: "12:00", rainfall: 8, predicted: 10 },
  { time: "13:00", rainfall: 15, predicted: 18 },
  { time: "14:00", rainfall: 28, predicted: 25 },
  { time: "15:00", rainfall: 42, predicted: 38 },
  { time: "16:00", rainfall: 35, predicted: 40 },
  { time: "17:00", rainfall: 45, predicted: 48 }
]

export const translations = {
  en: {
    dashboard: "Dashboard",
    liveMap: "Live Map",
    analytics: "Analytics",
    citizenReports: "Citizen Reports",
    settings: "Settings",
    systemOnline: "System: ONLINE",
    lastUpdated: "Last Updated:",
    justNow: "Just now",
    highestRiskArea: "Highest Risk Area",
    riskLevel: "Risk Level",
    currentRainfall: "Current Rainfall",
    drainageBlockage: "Drainage Blockage",
    rainfallTrend: "Rainfall Trend (Last 6 Hours)",
    zoneStatus: "Zone Status",
    recentReports: "Recent Citizen Reports",
    actionCenter: "Action Center",
    triggerAlert: "Trigger Municipal Alert",
    exportReport: "Export Report",
    viewSOP: "View SOP",
    sdgBadge: "Supporting SDG 13: Climate Action",
    actual: "Actual (mm)",
    predicted: "Predicted (mm)"
  },
  as: {
    dashboard: "ডেছব'ৰ্ড",
    liveMap: "লাইভ মেপ",
    analytics: "বিশ্লেষণ",
    citizenReports: "নাগৰিক প্ৰতিবেদন",
    settings: "ছেটিংছ",
    systemOnline: "চিষ্টেম: অনলাইন",
    lastUpdated: "শেষ আপডেট:",
    justNow: "এইমাত্ৰ",
    highestRiskArea: "সৰ্বাধিক বিপদসংকুল এলেকা",
    riskLevel: "বিপদৰ স্তৰ",
    currentRainfall: "বৰ্তমান বৰষুণ",
    drainageBlockage: "নিষ্কাশন অৱৰোধ",
    rainfallTrend: "বৰষুণৰ ধাৰা (শেষ ৬ ঘণ্টা)",
    zoneStatus: "জ'ন স্থিতি",
    recentReports: "শেহতীয়া নাগৰিক প্ৰতিবেদন",
    actionCenter: "কাৰ্য কেন্দ্ৰ",
    triggerAlert: "পৌৰসভা সতৰ্কবাণী প্ৰেৰণ কৰক",
    exportReport: "প্ৰতিবেদন এক্সপ'ৰ্ট কৰক",
    viewSOP: "এছ অ' পি চাওক",
    sdgBadge: "এছ ডি জি ১৩ সমৰ্থন: জলবায়ু কাৰ্য",
    actual: "প্ৰকৃত (মি.মি.)",
    predicted: "অনুমানিত (মি.মি.)"
  }
}
