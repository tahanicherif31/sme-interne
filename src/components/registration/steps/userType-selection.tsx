"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, DollarSign, User, CheckCircle } from "lucide-react";
import { UserType } from "@/lib/validations/registration";
import { UserTypeOption } from "@/types/registration";
interface Props {
  userType: UserType | "";
  onUserTypeChange: (type: UserType) => void;
}

const USER_TYPE_OPTIONS: UserTypeOption[] = [
  {
    type: "sme",
    title: "SME Owner",
    description: "Small or Medium Enterprise seeking financing and support",
    icon: Building2,
    features: [
      "Access to funding",
      "Training programs",
      "Market access",
      "Mentorship",
    ],
  },
  {
    type: "bank",
    title: "Financial Institution",
    description: "Bank or financial intermediary partnering with Afreximbank",
    icon: DollarSign,
    features: [
      "SME portfolio management",
      "Risk assessment tools",
      "Technical assistance",
      "Reporting",
    ],
  },
  {
    type: "consultant",
    title: "Service Provider",
    description: "Consultant, trainer, or service provider in the ecosystem",
    icon: User,
    features: [
      "Training delivery",
      "Consulting services",
      "Market research",
      "Technical support",
    ],
  },
];

export function UserTypeSelection({ userType, onUserTypeChange }: Props) {
  return (
    <div className="my-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to ESDP
        </h2>
        <p className="text-gray-600">
          Let's start by understanding your role in the ecosystem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {USER_TYPE_OPTIONS.map((option) => (
          <Card
            key={option.type}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
              userType === option.type
                ? "ring-2 ring-secondary/20 bg-secondary/10"
                : ""
            }`}
            onClick={() => onUserTypeChange(option.type)}
          >
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="flex justify-center items-center text-primary mb-2">
                  <option.icon size={36} />
                </div>

                <h3 className="text-lg font-semibold">{option.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {option.description}
                </p>
              </div>
              <div className="my-2">
                {option.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
