"use client"

// file = QrCodeScannerPlugin2.tsx
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useState, useEffect, useRef } from "react";

function createConfig(props: any) {
  let config: any = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
}

/**
 * must have a qrCodeSuccessCallback prop.
 * @throws Error "qrCodeSuccessCallback is required callback." if it is not present.
 */
export default function QrCodeScannerPlugin2(props: any) {

  const qrcodeRegionId = "html5qr-code-full-region";
  const regionRef = useRef(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (!scannerRef.current) {
      // when component mounts
      const config = createConfig(props);
      const verbose = props.verbose === true;
      // Suceess callback is required.
      if (!props.qrCodeSuccessCallback) {
        throw new Error("qrCodeSuccessCallback is required callback.");
      }
      const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
      scannerRef.current = html5QrcodeScanner;
    }

    const scanner = scannerRef.current;
    scanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

    // cleanup function when component will unmount
    return () => {
      scanner.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner. ', error);
      });
    };
  }, [props.qrCodeSuccessCallback, props.qrCodeErrorCallback, props.fps, props.qrbox, props.aspectRatio, props.disableFlip]);

  return <div className="mx-auto max-w-4xl flex-1" ref={regionRef} id={qrcodeRegionId} />;
}