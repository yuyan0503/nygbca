import authnicateByQr from "../authnicateByQr";

export default async function checkIfUserInside(qrCodeId: string) {
  try {
    const userData = await authnicateByQr(qrCodeId)
    if (userData.borderCrossCount % 2 === 0) {
      return false
    } else {
      return true
    }
  } catch (err) {
    throw new Error("error, probably the user was not found.")
  }

}