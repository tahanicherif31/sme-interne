import {
  ArrowRight,
  Wheat,
  Factory,
  Zap,
  Shirt,
  Hammer,
  Plane,
  Stethoscope,
  Smartphone,
  CreditCard,
  GraduationCap,
  Lightbulb,
  TrendingUp,
  Users,
  FileText,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  MapPin,
} from "lucide-react";
export const cardData = {
  prioritySectors: [
    {
      icon: Wheat,
      title: "Agriculture & Agro-processing",
      description:
        "Farm-to-fork value chains, food processing, and agricultural technology solutions",
    },
    {
      icon: Factory,
      title: "Manufacturing",
      description:
        "Light manufacturing, industrial production, and value-added processing",
    },
    {
      icon: Zap,
      title: "Energy & Infrastructure",
      description:
        "Renewable energy, power generation, and infrastructure development",
    },
    {
      icon: Shirt,
      title: "Textiles & Fashion",
      description:
        "Garment manufacturing, fashion design, and textile production",
    },
    {
      icon: Hammer,
      title: "Construction & Real Estate",
      description:
        "Construction services, building materials, and property development",
    },
    {
      icon: Plane,
      title: "Transport & Logistics",
      description:
        "Freight services, logistics solutions, and transportation networks",
    },
    {
      icon: Stethoscope,
      title: "Healthcare & Pharmaceuticals",
      description:
        "Medical devices, pharmaceutical manufacturing, and health services",
    },
    {
      icon: Smartphone,
      title: "Technology & Innovation",
      description:
        "Fintech, digital solutions, and technology-enabled services",
    },
  ],
  smeServices: [
    {
      icon: CreditCard,
      title: "SME Financing",
      description:
        "Access to credit lines, guarantees, and venture capital for export-oriented SMEs",
      href: "/financing",
    },
    {
      icon: GraduationCap,
      title: "Capacity Building",
      description:
        "Incubation programs, training workshops, and technical assistance",
      href: "/incubation",
    },
    {
      icon: Lightbulb,
      title: "Market Access",
      description:
        "Integration with Africa Trade Gateway and export market linkages",
      href: "/market-access",
    },
    {
      icon: TrendingUp,
      title: "Policy Advocacy",
      description: "Support for regulatory compliance and policy development",
      href: "/",
    },
  ],
};
export const heroStats = [
  {
    value: "$25B+",
    label: "Trade Finance Facilitated",
    subtext: "Supporting African trade since 1993",
  },
  {
    value: "54",
    label: "African Countries Served",
    subtext: "Pan-African development reach",
  },
  {
    value: "10,000+",
    label: "SMEs to be Supported",
    subtext: "By 2026 through our programme",
  },
  {
    value: "$520M",
    label: "Committed Investment",
    subtext: "Dedicated to SME growth",
  },
];

export const journeySteps = [
  {
    step: "1",
    title: "Become Export-Ready",
    description:
      "Get the knowledge, tools, and support you need to confidently enter new markets.",
    icon: CheckCircle,
  },
  {
    step: "2",
    title: "Access Tailored Finance",
    description:
      "Unlock funding solutions, including trade finance and factoring, designed to grow your export potential.",
    icon: Clock,
  },
  {
    step: "3",
    title: "Get Digitally Validated",
    description:
      "Build trust with buyers and investors through secure digital KYC and business verification",
    icon: AlertCircle,
  },
  {
    step: "4",
    title: "Connect & Expand Your Network",
    description:
      "Join a Global African SME ecosystem to access new markets, partners, and global value chains",
    icon: TrendingUp,
  },
];

export const impactHighlights = [
  {
    title: "Trade Finance Leadership",
    description: "Africa's largest multilateral trade finance institution",
    icon: DollarSign,
  },
  {
    title: "Continental Coverage",
    description: "Operations across all 54 African Union member states",
    icon: MapPin,
  },
  {
    title: "SME Transformation",
    description: "Dedicated $520M programme for small business growth",
    icon: TrendingUp,
  },
];
