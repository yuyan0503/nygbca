"use client"

import { useState, ReactNode } from 'react';
import Html5QrcodePlugin from '../Html5QrcodePlugin'
import ToastBox from '../ToastBox';
import { useRouter } from 'next/navigation'
import { Router } from 'next/router';


export default function QrCodeSignup({ continueUrl }: { continueUrl: string | string[] | undefined }) {
  const router = useRouter()
  let qrCodeId;
  const [scannerActivated, setScannerActivated] = useState("true")

  const onNewScanResult = async (decodedText: any, decodedResult: any) => {

    qrCodeId = decodedText.split('/').filter(Boolean).pop()

    try {
      if (typeof continueUrl == "string") {
        router.push(`/login/signupform?qrcode=${qrCodeId}&continue=${continueUrl}`)
      } else {
        router.push(`/login/signupform?qrcode=${qrCodeId}`)
      }

    } catch (error) {
      // Handle any errors from authnicateByQr here
      console.error(error)
    }
  };

  if (scannerActivated === "true") {
    return (
      <>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />

        <div className="toast toast-end">
          <ToastBox message="To continue, you must scan your QR code." color={"info"} />
        </div>
      </>

    )
  } else if (scannerActivated == "done") {

  } else {
    return (
      <p>please wait, processing. If it takes more than 5 seconds refresh this page.</p>
    )
  }
}
