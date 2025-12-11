import { z } from "zod";

/**
 * Reusable password validation schema that enforces:
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 * - At least 1 special character (@$!%*?&#)
 * 
 * Shows a single comprehensive error message with all requirements
 * 
 * @param options - Optional configuration for error messages
 * @returns Zod string schema with password validation
 */
export const passwordSchema = (options?: {
    requiredMessage?: string;
    requirementsMessage?: string;
}) => {
    const {
        requiredMessage = "validation.requiredField",
        requirementsMessage = "validation.passwordRequirements",
    } = options || {};

    return z
        .string()
        .min(1, requiredMessage)
        .refine(
            (val) => {
                if (val.length < 8) return false;
                if (!/[A-Z]/.test(val)) return false;
                if (!/[a-z]/.test(val)) return false;
                if (!/\d/.test(val)) return false;
                if (!/[@$!%*?&#]/.test(val)) return false;
                return true;
            },
            {
                message: requirementsMessage,
            }
        );
};

/**
 * Simplified password schema for use with translation functions
 * Uses a single error message key for all validation errors
 */
export const createPasswordSchema = (t?: (key: string) => string) => {
    const getMessage = (key: string) => {
        if (t) {
            try {
                return t(key);
            } catch {
                return key;
            }
        }
        return key;
    };

    return z
        .string()
        .min(1, getMessage("validation.requiredField"))
        .refine(
            (val) => {
                if (val.length < 8) return false;
                if (!/[A-Z]/.test(val)) return false;
                if (!/[a-z]/.test(val)) return false;
                if (!/\d/.test(val)) return false;
                if (!/[@$!%*?&#]/.test(val)) return false;
                return true;
            },
            {
                message: getMessage("validation.passwordRequirements"),
            }
        );
};

