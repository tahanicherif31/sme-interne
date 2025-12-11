export const COUNTRIES = [
    "Nigeria",
    "Kenya",
    "South Africa",
    "Ghana",
    "Egypt",
    "Morocco",
    "Ethiopia",
    "Uganda",
    "Tanzania",
    "Rwanda",
    "Senegal",
    "Ivory Coast",
] as const

export const SECTORS = [
    "Manufacturing",
    "Agriculture",
    "Technology",
    "Healthcare",
    "Education",
    "Financial Services",
    "Tourism",
    "Transport & Logistics",
    "Energy",
    "Mining",
] as const

export const LEGAL_STRUCTURES = [
    { value: "limited", label: "Limited Liability Company" },
    { value: "partnership", label: "Partnership" },
    { value: "sole", label: "Sole Proprietorship" },
    { value: "cooperative", label: "Cooperative" },
] as const

export const EMPLOYEE_RANGES = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-500", label: "201-500 employees" },
] as const

export const REVENUE_RANGES = [
    { value: "under-100k", label: "Under $100,000" },
    { value: "100k-500k", label: "$100,000 - $500,000" },
    { value: "500k-1m", label: "$500,000 - $1,000,000" },
    { value: "1m-5m", label: "$1,000,000 - $5,000,000" },
    { value: "5m-10m", label: "$5,000,000 - $10,000,000" },
] as const

export const EXPORT_EXPERIENCE = [
    { value: "none", label: "No export experience" },
    { value: "planning", label: "Planning to export" },
    { value: "1-2years", label: "1-2 years" },
    { value: "3-5years", label: "3-5 years" },
    { value: "5plus", label: "5+ years" },
] as const

export const CREDIT_HISTORY = [
    { value: "excellent", label: "Excellent" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
    { value: "poor", label: "Poor" },
    { value: "none", label: "No credit history" },
] as const

export const REPAYMENT_PERIODS = [
    { value: "6months", label: "6 months" },
    { value: "1year", label: "1 year" },
    { value: "2years", label: "2 years" },
    { value: "3years", label: "3 years" },
    { value: "5years", label: "5 years" },
] as const

export const REQUIRED_DOCUMENTS = [
    "Certificate of Incorporation",
    "Tax Clearance Certificate",
    "Financial Statements (Last 2 years)",
    "Bank Statements (Last 6 months)",
    "Business Plan",
    "Export Documentation (if applicable)",
] as const
