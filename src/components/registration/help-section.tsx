import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function HelpSection() {
  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium">Email Support</p>
            <p className="text-gray-600">sme@afreximbank.com</p>
          </div>
          <div>
            <p className="font-medium">Phone Support</p>
            <p className="text-gray-600">+20 2 2461 9800</p>
          </div>
          <div>
            <p className="font-medium">Documentation</p>
            <Link href="" className="text-primary hover:underline">
              View Help Center
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
