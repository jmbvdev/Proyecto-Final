import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"

export async function setPlantImage(uid, file) {
    try {
        const imageRef = ref(storage, `imgPlantas/${uid}`)
        const resUpload = await uploadBytes(imageRef, file)
        // console.log(resUpload);
        return resUpload
    } catch (error) {
        console.log(error)
    }
}

export async function getPictureUrl(uid) {
    try {
        const imageRef = ref(storage, `imgPlantas/${uid}`)
        const url = await getDownloadURL(imageRef)
        return url
    } catch (error) {
        console.log(error)
    }
}
