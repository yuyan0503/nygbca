"use client"

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation'
import Link from "next/link";
import Html5QrcodePlugin from '../Html5QrcodePlugin';
import ToastBox from '../ToastBox';
import doesQrCodeIdExist from '@/lib/doesQrCodeIdExist';

export default function QrCodeLogin({ continueUrl }: { continueUrl: string | string[] | undefined }) {
  const router = useRouter()
  const [scannerActivated, setScannerActivated] = useState(true)
  const [loginError, setLoginError] = useState(false)

  const onNewScanResult = async (decodedText: any, decodedResult: any) => {
    try {
      const qrCodeId = decodedText.split('/').filter(Boolean).pop()
      const isQrCodeLegit = await doesQrCodeIdExist(qrCodeId);

      if (isQrCodeLegit) {
        setScannerActivated(false);
        document.cookie = `qrCodeId=${qrCodeId}; path=/`;
      } else {
        setLoginError(true)
      }
    } catch (error) {
      // Handle any errors here
      setLoginError(true);
    }
    const redirectUrl = continueUrl?.toString()

    if (Boolean(redirectUrl) && redirectUrl != undefined) {
      redirect(redirectUrl)
    } else {
      redirect("/dashboard")
    }
  };

  function returnAction() {
    setScannerActivated(false);
    let returnUrl = continueUrl?.toString()
    if (Boolean(returnUrl) && returnUrl != undefined) {
      returnUrl = `?continue=${returnUrl}`
    } else {
      returnUrl = ""
    }
    redirect(`/login${returnUrl}`)
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
          {loginError === true ? <ToastBox message="error logging in" color={"info"} /> : null}
          <ToastBox message="To continue, you must log in using QR code." color={"info"} />
          <ToastBox message="If an UI error occurs, refresh this page." color={"info"} />
        </div>
      </div>
    )
  } else {
    return (
      <p>please wait, processing. If it takes more than 5 seconds refresh this page.</p>
    )
  }
}
