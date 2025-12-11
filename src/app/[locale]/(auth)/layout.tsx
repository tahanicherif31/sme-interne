import ReCaptchaProvider from "@/providers/recaptcha-provider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReCaptchaProvider>{children}</ReCaptchaProvider>;
}
