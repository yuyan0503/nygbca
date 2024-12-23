"use client"

import { useEffect } from 'react';

export default function SwInstall() {
  useEffect(() => {
    window.addEventListener('load', () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
      };
    })
  }, [])
  return (<></>)
}