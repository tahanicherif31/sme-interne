import {
  BusinessInformationStepType,
  CompanyInformationStepType,
  ComplianceDeclarationsStepType,
  ProfileInformationStepType,
} from "@/validation/register";
import { createContext, useContext } from "react";

export type RegisterStateType = {
  count: number;
  submit: boolean;
  data: {
    profileInformation: ProfileInformationStepType;
    companyInformation: CompanyInformationStepType;
    businessInformation: BusinessInformationStepType;
  } & ComplianceDeclarationsStepType;
};

export const registerActionType = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  SUBMIT: "SUBMIT",
} as const;

export type RegisterAction =
  | {
      type: typeof registerActionType.INCREASE;
      payload: {
        [K in keyof RegisterStateType["data"]]: {
          [K2 in K]: RegisterStateType["data"][K2];
        };
      }[keyof RegisterStateType["data"]];
    }
  | {
      type: typeof registerActionType.DECREASE;
    }
  | {
      type: typeof registerActionType.SUBMIT;
    };

type StepsContextType = RegisterStateType & {
  dispatch: React.Dispatch<RegisterAction>;
};
export const RegisterStepsContext = createContext<StepsContextType>(
  {} as StepsContextType
);
export function useRegisterContext() {
  const context = useContext(RegisterStepsContext);
  if (!context) {
    throw Error(
      "'useRegisterContext' must be used within 'RegisterContextProvider'"
    );
  }
  return context;
}
