"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Html5QrcodePlugin from '../Html5QrcodePlugin';
import ToastBox from '../ToastBox';
import authnicateByQr from '@/lib/authnicateByQr';

export default function QrCodeLogin() {
  const router = useRouter()
  const [scannerActivated, setScannerActivated] = useState(true)
  const [loginError, setLoginError] = useState(false)

  const onNewScanResult = async (decodedText, decodedResult) => {

    const qrCodeId = decodedText.split('/').filter(Boolean).pop()

    try {
      const result = await authnicateByQr(qrCodeId);
      setScannerActivated(false);
      document.cookie = `qrCodeId=${qrCodeId}; path=/`;
      window.location.reload()

    } catch (error) {

      // Handle any errors from authnicateByQr here
      setLoginError(true);

    }

  };

  if (scannerActivated === true) {
    return (
      <>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />

        <div className="toast toast-end">
          {loginError === true ? <ToastBox message="error logging in" color={"info"} /> : null}
          <ToastBox message="To continue, you must log in using QR code." color={"info"} />
        </div>
      </>

    )
  } else {
    return (
      <p>please wait, processing. If it takes more than 5 seconds refresh this page.</p>
    )
  }
}
