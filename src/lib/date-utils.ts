/**
 * Get ordinal suffix for a number based on locale
 * @param n - The number to get ordinal for
 * @param locale - The locale code (en, fr, pt, ar)
 * @returns The number with appropriate ordinal suffix
 */
export function getOrdinal(n: number, locale: string): string {
    switch (locale) {
        case "fr": {
            // French: Just return the number (French typically doesn't use ordinals in dates)
            return n.toString();
        }
        case "pt": {
            // Portuguese: 1º, 2º, 3º, 4º, etc.
            return `${n}º`;
        }
        case "ar": {
            // Arabic: Just return the number (Arabic numerals are typically used without ordinals in dates)
            return n.toString();
        }
        case "en":
        default: {
            // English: 1st, 2nd, 3rd, 4th, etc.
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        }
    }
}

/**
 * Format a date range from ISO date strings
 * @param startDate - Start date as ISO string
 * @param endDate - End date as ISO string (optional)
 * @param locale - The locale code for formatting
 * @returns Formatted date range string
 */
export function formatDateRange(
    startDate: string,
    endDate: string,
    locale: string
): string {
    if (!startDate) return "";

    try {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : null;

        if (end && start.getTime() !== end.getTime()) {
            // Date range
            const startDay = start.getDate();
            const startMonth = start.toLocaleDateString(locale, { month: "long" });
            const startYear = start.getFullYear();

            const endDay = end.getDate();
            const endMonth = end.toLocaleDateString(locale, { month: "long" });
            const endYear = end.getFullYear();

            if (startMonth === endMonth && startYear === endYear) {
                return `${getOrdinal(startDay, locale)} - ${getOrdinal(
                    endDay,
                    locale
                )} ${startMonth} ${startYear}`;
            } else {
                return `${getOrdinal(
                    startDay,
                    locale
                )} ${startMonth} ${startYear} - ${getOrdinal(
                    endDay,
                    locale
                )} ${endMonth} ${endYear}`;
            }
        } else {
            // Single date
            const day = start.getDate();
            const month = start.toLocaleDateString(locale, { month: "long" });
            const year = start.getFullYear();
            return `${getOrdinal(day, locale)} ${month} ${year}`;
        }
    } catch {
        return startDate;
    }
}
