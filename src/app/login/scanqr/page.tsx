import QrCodeLogin from "@/components/login/QrCodeLogin";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const continueUrl = (await searchParams).continue
  return (
    <QrCodeLogin continueUrl={continueUrl} />
  )
}