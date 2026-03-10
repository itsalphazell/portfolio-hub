import type { ContactLinks } from "@/lib/types";

function getOptionalPublicUrl(envName: string) {
  const value = process.env[envName]?.trim();
  return value ? value : undefined;
}

export const contactLinks: ContactLinks = {
  email: "thomas.cere@outlook.fr",
  bookingUrl: getOptionalPublicUrl("NEXT_PUBLIC_BOOKING_URL"),
  github: "https://github.com/itsalphazell",
  linkedin: getOptionalPublicUrl("NEXT_PUBLIC_LINKEDIN_URL"),
};
