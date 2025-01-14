"use server"

import { cookies } from "next/headers";
import getLangPrefByQrCodeId from "./getLangPrefByQrCodeId";
import gtkey from "./gtKey";

export default async function gt(key: string) {
  const cookieStore = await cookies()
  const langPrefCookie = cookieStore.get('langPref')
  let langPref = "en"

  if (langPrefCookie) {
    langPref = langPrefCookie.value
  }

  const keyParts = key.split('.');
  let langKey = gtkey;

  // Traverse the gtkey object using the parts of the key
  for (const part of keyParts) {
    if (langKey[part] !== undefined) {
      langKey = langKey[part];
    } else {
      return "languageTranslationError"; // Return error if any part is not found
    }
  }

  if (langPref in langKey) {
    return (langKey[langPref])
  } else {
    return langKey.ja
  }
}
