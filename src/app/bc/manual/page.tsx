"use client"

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation'
import getUserDataWithQrCodeId from '@/lib/user/getUserDataWithQrCodeId';
import checkIfUserInside from '@/lib/bc/checkIfUserInside';
import QrCodeScannerPlugin2 from '@/components/QrCodeScannerPlugin2';

export default function Page() {
  const [scannerActivated, setScannerActivated] = useState(true)
  const router = useRouter()

  const onNewScanResult = async (decodedText: any, decodedResult: any) => {
    try {
      const qrCodeId = decodedText.split('/').filter(Boolean).pop()
      const result = await getUserDataWithQrCodeId(qrCodeId);
      const isInside = await checkIfUserInside(qrCodeId)
      setScannerActivated(false)
      router.push(`/bc/manual/${qrCodeId}`)
    } catch (err) {
      console.error("invalid qrCodeId")
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
        </div>
      </div>
    )
  } else {
    return (
      <a>please wait... If this takes more then 5 seconds refresh this page.</a>
    )
  }
}