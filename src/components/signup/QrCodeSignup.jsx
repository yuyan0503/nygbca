"use client"

import { useState } from 'react';
import Html5QrcodePlugin from '../Html5QrcodePlugin'
import ToastBox from '../ToastBox';

export default function QrCodeSignup({ children }) {
  const [scannerActivated, setScannerActivated] = useState("true")

  const onNewScanResult = async (decodedText, decodedResult) => {

    const qrCodeId = decodedText.split('/').filter(Boolean).pop()

    try {
      setScannerActivated("waiting");
      document.cookie = `qrCodeId=${qrCodeId}; path=/`;
      setScannerActivated("done");

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
    return (<>{children}</>)
  } else {
    return (
      <p>please wait, processing. If it takes more than 5 seconds refresh this page.</p>
    )
  }
}
