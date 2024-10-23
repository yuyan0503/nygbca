"use client"

import Link from 'next/link'
import { useState } from 'react'
import QrCodeLogin from './QrCodeLogin'
import QrCodeIdLogin from './QrCodeIdLogin'

export default function LoginForm({ children }) {
  const [loginMethod, setLoginMethod] = useState("unset")
  if (loginMethod == "unset") {
    return (
      <div>
        <button className="btn btn-primary" onClick={() => setLoginMethod("qrCode")}>continue with QR code</button>
        <hr />
        <p>not working?</p>
        <button className="btn" onClick={() => setLoginMethod("qrCodeId")}>log in with your QR code ID</button>
        <hr />
        <p>Don't have an account?</p>
        <Link role="button" className="btn" href="/login/signup">Create new account</Link>
      </div>
    )
  } else if (loginMethod == "qrCode") {
    return (
      <QrCodeLogin />
    )
  } else if (loginMethod == "qrCodeId") {
    return (
      <>{children}</>
    )
  } else {
    return ("error")
  }

}