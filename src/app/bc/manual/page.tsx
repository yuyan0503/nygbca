"use client"

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation'
import Html5QrcodePlugin from '@/components/Html5QrcodePlugin';
import authnicateByQr from '@/lib/authnicateByQr';
import checkIfUserInside from '@/lib/bc/checkIfUserInside';

export default function Page() {
  const [scannerActivated, setScannerActivated] = useState(true)
  const router = useRouter()

  const onNewScanResult = async (decodedText: any, decodedResult: any) => {
    try {
      const qrCodeId = decodedText.split('/').filter(Boolean).pop()
      const result = await authnicateByQr(qrCodeId);
      const isInside = await checkIfUserInside(qrCodeId)
      router.push(`/bc/manual/${qrCodeId}`)
    } catch (err) {
      console.error("invalid qrCodeId")
    }
  }

  if (scannerActivated == true) {
    return (
      <>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
      </>


    )
  }
}