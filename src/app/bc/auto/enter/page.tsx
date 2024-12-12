"use client"

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import Html5QrcodePlugin from '@/components/Html5QrcodePlugin';
import authnicateByQr from '@/lib/authnicateByQr';
import checkIfUserInside from '@/lib/bc/checkIfUserInside';
import updateCountOfQrCodeId from '@/lib/bc/updateCountOfQrCodeId';

export default function Page() {
  const [programState, setProgramState] = useState("before")
  const router = useRouter()

  const onNewScanResult = async (decodedText: any, decodedResult: any) => {
    document.getElementById("html5-qrcode-button-camera-stop")?.click();
    setProgramState("error")
    try {
      const qrCodeId = decodedText.split('/').filter(Boolean).pop()
      const result = await authnicateByQr(qrCodeId);
      const isInside = await checkIfUserInside(qrCodeId)
      if (isInside) {
        throw new Error("already inside!")
      }
      setProgramState("confirmEnter")
      const updatedBorderCrossCount = result.borderCrossCount + 1
      updateCountOfQrCodeId(qrCodeId, updatedBorderCrossCount)
      setTimeout(() => {
        setProgramState("scanning");
        document.getElementById("html5-qrcode-button-camera-stop")?.click();
      }, 10000);
    } catch (err) {
      setProgramState("error")
      if (err instanceof Error) {
        throw new Error(err.message)
      } else {
        throw new Error("an unknown error happened, throwing. ")
      }

    }
  }

  function returnAction() {
    setProgramState("before")
  }

  if (programState == "before") {
    return (
      <div className="relative min-h-screen">
        <Link className="btn btn-square top-2 left-2 z-10 fixed" href="/bc/auto">
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
        </Link>
        <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center min-h-screen">
          <div className="prose">
            <h1 className="mb-4 text-center">Automatic BC enter</h1>
          </div>
          <p className="mb-2">Choose a option</p>
          <button className="btn btn-primary mb-2 w-full" onClick={() => setProgramState("scanning")}>start auto BC</button>
          <Link className="btn btn-neutral mb-2 w-full" href={`/bc/auto`}>back to autoMenu</Link>
        </div>
        <div className="toast toast-end">
          <div className="alert alert-info">
            <span>If camera use do not reset, feel free to refresh this page.</span>
          </div>
        </div>
      </div>
    )
  } else if (programState == "scanning") {
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
          fps={1}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
        <div className="toast toast-end">
          <div className="alert alert-info">
            <span>Please scan your QR Code.</span>
          </div>
          <div className="alert alert-info">
            <span>If you need assisance, feel free to seek help from staff.</span>
          </div>
        </div>
      </div>
    )
  } else if (programState == "confirmEnter") {
    return (

      <div className="relative bg-green-500 text-white min-h-screen">
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
        <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center min-h-screen">
          <div className="prose">
            <h1 className="mb-4 text-center">Allowed</h1>
          </div>
          <p className="mb-2">You are now entering the premises.</p>
        </div>
      </div>
    )
  } else if (programState == "error") {
    return (

      <div className="relative bg-red-500 text-white min-h-screen">
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
        <div className="mx-auto w-full max-w-xs flex flex-col items-center justify-center min-h-screen">
          <div className="prose">
            <h1 className="mb-4 text-center">Denied</h1>
          </div>
          <p className="mb-2">Access denied, please seek assistance.</p>
        </div>
      </div>
    )
  } else {
    return (
      <a>an unknown error occured, please refresh</a>
    )
  }
}