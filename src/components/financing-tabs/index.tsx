/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Calculator,
  CheckCircle,
  ArrowRight,
  Shield,
  Percent,
  Calendar,
  Download,
  Eye,
  Search,
  Zap,
  Target,
  Star,
  FileText,
  BarChart3,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  applicationProcess,
  financingProducts,
  partnerBanks,
  successStories,
} from "./tabs-data";

export default function FinancingTabs() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [loanAmount, setLoanAmount] = useState(250000);
  const [loanTerm, setLoanTerm] = useState(36);
  const [interestRate] = useState(8.5);

  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm;
    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - loanAmount;
  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="grid w-full grid-cols-6">
          {[
            { value: "overview", label: "Overview" },
            { value: "products", label: "Products" },
            { value: "calculator", label: "Calculator" },
            { value: "process", label: "Process" },
            { value: "partners", label: "Partners" },
            { value: "success", label: "Success Stories" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-primary"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div>
          {activeTab === "overview" && (
            <div>
              {/* Featured Products */}
              <section className=" mb-12 ">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Popular Financing Products
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {financingProducts
                    .filter((product) => product.popular)
                    .map((product) => (
                      <Card
                        key={product.id}
                        className="hover:shadow-lg transition-shadow relative"
                      >
                        {product.popular && (
                          <Badge className="absolute top-4 right-4 bg-orange-500">
                            Most Popular
                          </Badge>
                        )}
                        <CardContent className="p-6">
                          <div
                            className={`w-12 h-12 ${product.color} rounded-lg flex items-center justify-center mb-4`}
                          >
                            <product.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            {product.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {product.description}
                          </p>

                          <div className="space-y-2 text-sm mb-4">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span className="font-medium">
                                {product.minAmount} - {product.maxAmount}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Term:</span>
                              <span className="font-medium">
                                {product.term}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Interest Rate:
                              </span>
                              <span className="font-medium">
                                {product.interestRate}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <h4 className="font-medium text-sm">
                              Key Features:
                            </h4>
                            {product.features
                              .slice(0, 3)
                              .map((feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-center text-sm text-gray-600"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                  {feature}
                                </div>
                              ))}
                          </div>

                          <Button className="w-full">
                            Apply Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </section>

              {/* Why Choose Us */}
              <section className=" mb-12 ">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Choose Afreximbank SME Financing?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Competitive Rates",
                      description:
                        "Industry-leading interest rates starting from 5.5%",
                      icon: Percent,
                      color: "bg-blue-500",
                    },
                    {
                      title: "Fast Approval",
                      description:
                        "Quick decision-making with digital processes",
                      icon: Zap,
                      color: "bg-green-500",
                    },
                    {
                      title: "Flexible Terms",
                      description:
                        "Customized repayment schedules to match your cash flow",
                      icon: Calendar,
                      color: "bg-purple-500",
                    },
                    {
                      title: "Expert Support",
                      description:
                        "Dedicated relationship managers and business advisory",
                      icon: Users,
                      color: "bg-orange-500",
                    },
                  ].map((benefit, index) => (
                    <Card
                      key={index}
                      className="text-center hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div
                          className={`w-16 h-16 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                        >
                          <benefit.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Eligibility Requirements */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  General Eligibility Requirements
                </h2>
                <Card>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">
                          Business Requirements
                        </h3>
                        <div className="space-y-3">
                          {[
                            "Registered business in Africa",
                            "Minimum 2 years in operation",
                            "Annual revenue of $50,000+",
                            "Valid business licenses",
                            "Audited financial statements",
                          ].map((requirement, index) => (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                              <span>{requirement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4">
                          Financial Requirements
                        </h3>
                        <div className="space-y-3">
                          {[
                            "Good credit history",
                            "Positive cash flow",
                            "Debt-to-equity ratio < 70%",
                            "Bank statements (6 months)",
                            "Tax compliance certificates",
                          ].map((requirement, index) => (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                              <span>{requirement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          )}
          {activeTab === "products" && (
            <div>
              {/* Filter and Search */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search financing products..."
                    className="pl-10"
                  />
                </div>
                <Select
                  value={selectedProduct}
                  onValueChange={setSelectedProduct}
                >
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="working-capital">
                      Working Capital
                    </SelectItem>
                    <SelectItem value="export">Export Finance</SelectItem>
                    <SelectItem value="equipment">Equipment Finance</SelectItem>
                    <SelectItem value="trade">Trade Finance</SelectItem>
                    <SelectItem value="green">Green Finance</SelectItem>
                    <SelectItem value="growth">Growth Capital</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Products Grid */}
              <div className="grid gap-6">
                {financingProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-6">
                        <div
                          className={`w-16 h-16 ${product.color} rounded-lg flex items-center justify-center`}
                        >
                          <product.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-2xl font-semibold">
                              {product.title}
                            </h3>
                            {product.popular && (
                              <Badge className="bg-orange-500">Popular</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">
                            {product.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div>
                              <p className="text-sm text-gray-600">
                                Loan Amount
                              </p>
                              <p className="font-semibold">
                                {product.minAmount} - {product.maxAmount}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Loan Term</p>
                              <p className="font-semibold">{product.term}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Interest Rate
                              </p>
                              <p className="font-semibold">
                                {product.interestRate}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Processing
                              </p>
                              <p className="font-semibold">5-15 days</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h4 className="font-semibold mb-3">
                                Key Features
                              </h4>
                              <div className="space-y-2">
                                {product.features.map((feature, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center text-sm"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">
                                Eligibility
                              </h4>
                              <div className="space-y-2">
                                {product.eligibility.map(
                                  (requirement, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center text-sm"
                                    >
                                      <Shield className="w-4 h-4 text-blue-500 mr-2" />
                                      {requirement}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-4">
                            <Button>
                              Apply Now
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              Learn More
                            </Button>
                            <Button variant="outline">
                              <Calculator className="w-4 h-4 mr-2" />
                              Calculate
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {activeTab === "calculator" && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Loan Calculator
                </h2>
                <p className="text-xl text-gray-600">
                  Calculate your monthly payments and total loan cost
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calculator Inputs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Details</CardTitle>
                    <CardDescription>
                      Adjust the parameters to see your loan estimates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Loan Amount (USD)
                      </label>
                      <Input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        min="10000"
                        max="10000000"
                        step="1000"
                      />
                      <div className="mt-2">
                        <input
                          type="range"
                          min="10000"
                          max="1000000"
                          step="1000"
                          value={loanAmount}
                          onChange={(e) =>
                            setLoanAmount(Number(e.target.value))
                          }
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>$10K</span>
                          <span>$1M</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Loan Term (Months)
                      </label>
                      <Input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        min="6"
                        max="120"
                        step="1"
                      />
                      <div className="mt-2">
                        <input
                          type="range"
                          min="6"
                          max="120"
                          step="1"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>6 months</span>
                          <span>10 years</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Interest Rate (%)
                      </label>
                      <Input
                        type="number"
                        value={interestRate}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Estimated rate based on current market conditions
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Loan Purpose
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select loan purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="working-capital">
                            Working Capital
                          </SelectItem>
                          <SelectItem value="equipment">
                            Equipment Purchase
                          </SelectItem>
                          <SelectItem value="expansion">
                            Business Expansion
                          </SelectItem>
                          <SelectItem value="export">Export Finance</SelectItem>
                          <SelectItem value="inventory">
                            Inventory Financing
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Calculator Results */}
                <Card>
                  <CardHeader>
                    <CardTitle>Loan Summary</CardTitle>
                    <CardDescription>
                      Your estimated loan details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Monthly Payment</p>
                        <p className="text-2xl font-bold text-blue-600">
                          $
                          {monthlyPayment.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Interest</p>
                        <p className="text-2xl font-bold text-green-600">
                          $
                          {totalInterest.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Amount</span>
                        <span className="font-semibold">
                          ${loanAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest</span>
                        <span className="font-semibold">
                          $
                          {totalInterest.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Total Payment</span>
                        <span className="font-bold text-lg">
                          $
                          {totalPayment.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Principal</span>
                        <span>
                          {((loanAmount / totalPayment) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={(loanAmount / totalPayment) * 100}
                        className="h-2"
                      />
                      <div className="flex justify-between text-sm">
                        <span>Interest</span>
                        <span>
                          {((totalInterest / totalPayment) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button className="w-full">
                        Apply for This Loan
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" className="w-full mt-2">
                        <Download className="w-4 h-4 mr-2" />
                        Download Estimate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Loan Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Compare Loan Options</CardTitle>
                  <CardDescription>
                    See how different terms affect your payments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Term</th>
                          <th className="text-left p-2">Monthly Payment</th>
                          <th className="text-left p-2">Total Interest</th>
                          <th className="text-left p-2">Total Payment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[12, 24, 36, 48, 60].map((term) => {
                          const monthlyRate = interestRate / 100 / 12;
                          const payment =
                            (loanAmount *
                              monthlyRate *
                              Math.pow(1 + monthlyRate, term)) /
                            (Math.pow(1 + monthlyRate, term) - 1);
                          const totalPay = payment * term;
                          const interest = totalPay - loanAmount;

                          return (
                            <tr
                              key={term}
                              className={`border-b ${
                                term === loanTerm ? "bg-blue-50" : ""
                              }`}
                            >
                              <td className="p-2">{term} months</td>
                              <td className="p-2">
                                $
                                {payment.toLocaleString("en-US", {
                                  maximumFractionDigits: 0,
                                })}
                              </td>
                              <td className="p-2">
                                $
                                {interest.toLocaleString("en-US", {
                                  maximumFractionDigits: 0,
                                })}
                              </td>
                              <td className="p-2">
                                $
                                {totalPay.toLocaleString("en-US", {
                                  maximumFractionDigits: 0,
                                })}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === "process" && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Application Process
                </h2>
                <p className="text-xl text-gray-600">
                  Simple steps to get your SME financing approved
                </p>
              </div>

              {/* Process Steps */}
              <div className="space-y-8">
                {applicationProcess.map((step, index) => (
                  <Card
                    key={step.step}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold">
                              {step.title}
                            </h3>
                            <Badge variant="outline">{step.duration}</Badge>
                          </div>
                          <p className="text-gray-600 mb-4">
                            {step.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                            {step.tasks.map((task, taskIndex) => (
                              <div
                                key={taskIndex}
                                className="flex items-center text-sm"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                {task}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Required Documents */}
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                  <CardDescription>
                    Prepare these documents for a smooth application process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-4">Business Documents</h4>
                      <div className="space-y-3">
                        {[
                          "Certificate of Incorporation",
                          "Business Registration Certificate",
                          "Tax Identification Number",
                          "Business License",
                          "Memorandum & Articles of Association",
                          "Board Resolution (for loan application)",
                        ].map((doc, index) => (
                          <div key={index} className="flex items-center">
                            <FileText className="w-4 h-4 text-blue-500 mr-3" />
                            <span className="text-sm">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4">
                        Financial Documents
                      </h4>
                      <div className="space-y-3">
                        {[
                          "Audited Financial Statements (2 years)",
                          "Management Accounts (latest)",
                          "Bank Statements (6 months)",
                          "Cash Flow Projections",
                          "Business Plan",
                          "Tax Clearance Certificate",
                        ].map((doc, index) => (
                          <div key={index} className="flex items-center">
                            <BarChart3 className="w-4 h-4 text-green-500 mr-3" />
                            <span className="text-sm">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips for Success */}
              <Card>
                <CardHeader>
                  <CardTitle>Tips for a Successful Application</CardTitle>
                  <CardDescription>
                    Increase your chances of approval with these recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Prepare Complete Documentation",
                        description:
                          "Ensure all required documents are current, accurate, and properly certified",
                        icon: FileText,
                      },
                      {
                        title: "Maintain Good Credit History",
                        description:
                          "Keep your business and personal credit records clean and up-to-date",
                        icon: Star,
                      },
                      {
                        title: "Present a Clear Business Plan",
                        description:
                          "Show how the loan will be used and how it will generate returns",
                        icon: Target,
                      },
                    ].map((tip, index) => (
                      <div key={index} className="text-center">
                        <tip.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">{tip.title}</h4>
                        <p className="text-gray-600 text-sm">
                          {tip.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === "partners" && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Partner Financial Institutions
                </h2>
                <p className="text-xl text-gray-600">
                  Access financing through our network of trusted partner banks
                  across Africa
                </p>
              </div>

              {/* Partner Banks Grid */}
              <div className="grid gap-6">
                {partnerBanks.map((bank, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="w-24 h-12 bg-gray-100 rounded flex items-center justify-center">
                            <img
                              src={bank.logo || "/placeholder.svg"}
                              alt={bank.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">
                              {bank.name}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {bank.country}
                              </div>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                {bank.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">
                            {bank.disbursed}
                          </p>
                          <p className="text-sm text-gray-600">
                            Total Disbursed
                          </p>
                          <p className="text-sm text-gray-600">
                            {bank.smes} SMEs Financed
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">
                          Available Products:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {bank.products.map((product, productIndex) => (
                            <Badge key={productIndex} variant="outline">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <Button>
                          Apply Through {bank.name.split(" ")[0]}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Partner Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Benefits of Our Partner Network</CardTitle>
                  <CardDescription>
                    Why working with our partners gives you an advantage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Local Expertise",
                        description:
                          "Partners understand local market conditions and regulatory requirements",
                        icon: MapPin,
                      },
                      {
                        title: "Streamlined Process",
                        description:
                          "Pre-approved credit lines and simplified application procedures",
                        icon: Zap,
                      },
                      {
                        title: "Ongoing Support",
                        description:
                          "Relationship management and business advisory services",
                        icon: Users,
                      },
                    ].map((benefit, index) => (
                      <div key={index} className="text-center">
                        <benefit.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === "success" && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  SME Success Stories
                </h2>
                <p className="text-xl text-gray-600">
                  See how African SMEs have grown their businesses with our
                  financing solutions
                </p>
              </div>

              {/* Success Stories */}
              <div className="grid gap-8">
                {successStories.map((story, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <img
                            src={story.image || "/placeholder.svg"}
                            alt={story.company}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <h3 className="text-2xl font-semibold">
                              {story.company}
                            </h3>
                            <Badge variant="outline">{story.sector}</Badge>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-1" />
                              {story.country}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Founder</p>
                              <p className="font-medium">{story.founder}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Loan Amount
                              </p>
                              <p className="font-medium text-green-600">
                                {story.loanAmount}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Loan Type</p>
                              <p className="font-medium">{story.loanType}</p>
                            </div>
                          </div>

                          <p className="text-lg text-gray-700 mb-4">
                            "{story.impact}"
                          </p>

                          <Button variant="outline">
                            Read Full Story
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Impact Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Our Impact Across Africa</CardTitle>
                  <CardDescription>
                    Measurable results from our SME financing programs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-blue-600 mb-2">
                        8,750
                      </h3>
                      <p className="text-gray-600">SMEs Financed</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-green-600 mb-2">
                        125,000
                      </h3>
                      <p className="text-gray-600">Jobs Created</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-purple-600 mb-2">
                        $2.1B
                      </h3>
                      <p className="text-gray-600">Economic Impact</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-orange-600 mb-2">
                        42
                      </h3>
                      <p className="text-gray-600">Countries Reached</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonials */}
              <Card>
                <CardHeader>
                  <CardTitle>What Our Clients Say</CardTitle>
                  <CardDescription>
                    Testimonials from satisfied SME clients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-blue-50 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        "Afreximbank's financing enabled us to expand our
                        operations across West Africa. The process was smooth
                        and the support exceptional."
                      </p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          KA
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold">Kwame Asante</p>
                          <p className="text-sm text-gray-600">
                            CEO, TechnoAfrica Solutions
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-green-50 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        "The green financing option was perfect for our
                        renewable energy project. Competitive rates and
                        excellent advisory support."
                      </p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                          FA
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold">Fatima Al-Rashid</p>
                          <p className="text-sm text-gray-600">
                            Founder, Green Energy Ltd
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </Tabs>
    </>
  );
}
