import getAllGroupOfUuser from "../user/getAllGroupOfUser";

export default async function checkIfAllowedBc(qrCodeId: string) {
  try{
    const userData = await getAllGroupOfUuser(qrCodeId)
    const masterData = userData.masterGroup
    const slaveData = userData.slaveGroup
    const hasBorderControlPermission = masterData.some(user => user.isAllowedBorderControl === true) || slaveData.some(user => user.isAllowedBorderControl === true)
    return hasBorderControlPermission
  }catch(err){
    throw new Error("an error occured, most likely because the user associated with the qrCodeId does not exist. ")
  }

}