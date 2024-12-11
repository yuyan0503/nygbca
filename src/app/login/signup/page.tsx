import QrCodeSignup from "@/components/signup/QrCodeSignup"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const continueUrl = (await searchParams).continue
  return (
    <QrCodeSignup continueUrl={continueUrl} />

  )
}