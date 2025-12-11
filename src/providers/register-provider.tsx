"use client";
import {
  RegisterAction,
  registerActionType,
  RegisterStateType,
  RegisterStepsContext,
} from "@/contexts/register-context";
import React, { useReducer } from "react";

function stepsReducer(state: RegisterStateType, action: RegisterAction) {
  switch (action.type) {
    case registerActionType.INCREASE:
      return {
        ...state,
        count: state.count + 1,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case registerActionType.DECREASE:
      return {
        ...state,
        count: state.count - 1,
      };
    case registerActionType.SUBMIT:
      return {
        ...state,
        submit: true,
      };
    default:
      return state;
  }
}
export default function RegisterContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, dispatch] = useReducer(stepsReducer, {
    count: 2,
    submit: false,
    data: {
      profileInformation: {
        firstName: "",
        lastName: "",
        contactPhone: "",
        email: "",
        contactTitle: "",
      },
      companyInformation: {
        companyName: "",
        websiteURL: "",
        companyContactName: "",
        countryRegistration: "",
        yearRegistration: "",
        registrationAddress: "",
        sector: "",
        companyContactEmail: "",
        companyContactPhone: "",
      },
      businessInformation: {
        aged: "",
        companyExport: "",
        memeberAssociation: "no",
        attendance: "no",
        capacityBuilding: "no",
        founderGender: "",
        yearRegistration: "",
        female: "",
        male: "",
        file: [],
        nameAssociation: "",
      },
      complianceDeclarations: [],
    },
  });
  return (
    <RegisterStepsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RegisterStepsContext.Provider>
  );
}
