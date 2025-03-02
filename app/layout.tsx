import ToastProvider from "@/components/ToastProvider";
import "./globals.css";

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import ClientOnly from "@/components/ClientOnly";
import RainbowKitProvider from "@/components/RainbowKitProvider";

import mongooseConnect from "@/lib/mongoose";
import Company from "@/models/Company";
import WarningPopup from "@/components/common/WarningPopup";
import TawkChat from "./TawkChat";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "500", "700"],
  preload: true,
  style: ["italic", "normal"],
});

export const getCompanyData = async () => {
  await mongooseConnect();
  let initialCompany: CompanyProps | null;
  const companies = await Company.find<CompanyProps>({});

  if (companies.length <= 0) {
    const newCompany = new Company({ name: "Enter company name" });
    const savedCompany = await newCompany.save();
    initialCompany = savedCompany;
  } else {
    initialCompany = companies[0];
  }
  const plainObject: CompanyProps = JSON.parse(
    JSON.stringify(initialCompany) || "{}"
  );
  return plainObject;
};

export async function generateMetadata(): Promise<Metadata> {
  await mongooseConnect();
  const companies = await Company.find<CompanyProps>({});
  const company = companies[0];

  return {
    title: company?.head?.title || "Not set",

    icons: company?.head?.iconUrl.startsWith("https")
      ? company?.head?.iconUrl
      : company?.head?.iconUrl.replace("http", "https") || "/logo.png",

    description: company?.head?.description || "Not set",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = await getCompanyData();

  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>iWON | Community winners</title>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </head>

        <body className={`${nunito.className} min-h-screen`}>
          <WarningPopup />

          <ClientOnly companyData={company}>
            <RainbowKitProvider>
              <ToastProvider />
              {children}
            </RainbowKitProvider>
          </ClientOnly>

          <TawkChat />
        </body>
      </html>
    </AuthProvider>
  );
}