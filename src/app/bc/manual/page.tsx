"use client"

import { useState } from 'react';
import { redirect, useSearchParams, useRouter } from 'next/navigation'
import QrCodeScannerPlugin2 from '@/components/QrCodeScannerPlugin2';
import doesQrCodeIdExist from '@/lib/doesQrCodeIdExist';
import ToastBox from '@/components/ToastBox';

export default function Page() {
  const [scannerActivated, setScannerActivated] = useState(true)
  const router = useRouter()

  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const isQrCodeError = Boolean(status)

  const onNewScanResult = async (decodedText: any, decodedResult: any) => {
    try {
      setScannerActivated(false)
      const qrCodeId = decodedText.split('/').filter(Boolean).pop()
      const isQrCodeLegit = await doesQrCodeIdExist(qrCodeId)

      if (isQrCodeLegit) {
        router.push(`/bc/manual/${qrCodeId}`)
      } else {
        router.push(`/bc/manual?status=qrcodeerror`)
      }
    } catch (err) {
      router.push(`/bc/manual?status=qrcodeerror`)
    }
  }

  function returnAction() {
    setScannerActivated(false);
    redirect(`/bc`)
  }

  if (scannerActivated == true) {
    return (
      <div className="relative">
        <button className="btn btn-square top-2 left-2 z-10 fixed" onClick={returnAction}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <QrCodeScannerPlugin2
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
        <div className="toast toast-end">
          <div className="alert alert-info">
            <span>If an UI error occurs, refresh this page.</span>
          </div>
          {isQrCodeError ? <ToastBox message="Error: cannot find qrCodeId" color="info" /> : <></>}
        </div>
      </div>
    )
  } else {
    return (
      <a>please wait... If this takes more then 5 seconds refresh this page.</a>
    )
  }
}