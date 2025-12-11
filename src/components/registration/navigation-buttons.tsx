"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

type Props = {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  isSubmitting: boolean;
  onNext: () => void;
  onPrevious: () => void;
};

export function NavigationButtons({
  currentStep,
  totalSteps,
  canProceed,
  isSubmitting,
  onNext,
  onPrevious,
}: Props) {
  return (
    <div className="flex justify-between mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="flex items-center bg-transparent"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      {currentStep === totalSteps ? (
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
          <CheckCircle className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
}
