"use client"

import { useState, ReactNode } from 'react';
import Link from "next/link";
import Html5QrcodePlugin from '../Html5QrcodePlugin'
import ToastBox from '../ToastBox';
import { useRouter } from 'next/navigation'
import { Router } from 'next/router';


export default function QrCodeSignup({ continueUrl }: { continueUrl: string | string[] | undefined }) {
  const router = useRouter()
  let qrCodeId;
  const [scannerActivated, setScannerActivated] = useState(true)

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

  let returnUrl = continueUrl?.toString()
  if (Boolean(returnUrl) && returnUrl != undefined) {
    returnUrl = `?continue=${returnUrl}`
  } else {
    returnUrl = ""
  }

  function returnAction() {
    setScannerActivated(false);
    router.push(`/login${returnUrl}`)
  }

  if (scannerActivated === true) {
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
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />

        <div className="toast toast-end">
          <ToastBox message="To continue, you must scan your QR code." color={"info"} />
          <ToastBox message="If an UI error occurs, refresh this page." color={"info"} />
        </div>
      </div >

    )
  } else {
    return (
      <p>please wait, processing. If it takes more than 5 seconds refresh this page.</p>
    )
  }
}
