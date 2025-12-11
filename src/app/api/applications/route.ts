import { ApplicationCreated, ApplicationRequest } from "@/types/common";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const applicationData: ApplicationRequest = await request.json();

    // Basic validation
    const required = [
      "businessInformation",
      "companyInformation",
      "complianceDeclarations",
      "profileInformation",
    ];
    for (const field of required) {
      if (!applicationData[field as keyof ApplicationRequest]) {
        return NextResponse.json(
          {
            message: "Validation failed",
            details: `${field} is required`,
          },
          { status: 400 }
        );
      }
    }

    // Validate business information required fields
    const businessRequired = [
      "file",
      "yearRegistration",
      "companyExport",
      "founderGender",
      "aged",
      "male",
      "female",
    ];
    for (const field of businessRequired) {
      if (
        applicationData.businessInformation[
          field as keyof typeof applicationData.businessInformation
        ] === undefined
      ) {
        return NextResponse.json(
          {
            message: "Validation failed",
            details: `businessInformation.${field} is required`,
          },
          { status: 400 }
        );
      }
    }

    // Validate company information required fields
    const companyRequired = [
      "companyName",
      "companyContactName",
      "countryRegistration",
      "yearRegistration",
      "registrationAddress",
      "sector",
      "companyContactEmail",
      "companyContactPhone",
    ];
    for (const field of companyRequired) {
      if (
        !applicationData.companyInformation[
          field as keyof typeof applicationData.companyInformation
        ]
      ) {
        return NextResponse.json(
          {
            message: "Validation failed",
            details: `companyInformation.${field} is required`,
          },
          { status: 400 }
        );
      }
    }

    // Validate profile information required fields
    const profileRequired = [
      "firstName",
      "lastName",
      "contactTitle",
      "email",
      "contactPhone",
    ];
    for (const field of profileRequired) {
      if (
        !applicationData.profileInformation[
          field as keyof typeof applicationData.profileInformation
        ]
      ) {
        return NextResponse.json(
          {
            message: "Validation failed",
            details: `profileInformation.${field} is required`,
          },
          { status: 400 }
        );
      }
    }

    // Set default website URL if empty or null
    if (!applicationData.businessInformation.typeSponsorship ||
        applicationData.businessInformation.typeSponsorship.trim() === '') {
        applicationData.businessInformation.typeSponsorship = '';
    }

    // Call external API
    const apiUrl =
      process.env.SME_API_URL ||
      "https://your-api-id.execute-api.eu-west-1.amazonaws.com";
    const idempotencyKey = request.headers.get("idempotency-key");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (idempotencyKey) {
      headers["Idempotency-Key"] = idempotencyKey;
    }

    const response = await fetch(`${apiUrl}/applications`, {
      method: "POST",
      headers,
      body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      return NextResponse.json(error, { status: response.status });
    }

    const applicationResponse: ApplicationCreated = await response.json();
    return NextResponse.json(applicationResponse, { status: 201 });
  } catch (error) {
    console.error("Application creation error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
