import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"

export async function setPlantImage(uid, file) {
    try {
        const imageRef = ref(storage, `plants/${uid}`)
        const resUpload = await uploadBytes(imageRef, file)
        // console.log(resUpload);
        return resUpload
    } catch (error) {
        console.log(error)
    }
}

export async function getPictureUrl(uid) {
    try {
        const imageRef = ref(storage, `plants/${uid}`)
        const url = await getDownloadURL(imageRef)
        return url
    } catch (error) {
        console.log(error)
    }
}

export async function setUserImage(uid, file) {
    try {
        const imageRef = ref(storage, `users/${uid}`)
        const resUpload = await uploadBytes(imageRef, file)
        return resUpload
    } catch (error) {
        console.log(error)
    }
}


export async function getPictureUrlUser(uid) {
    try {
        const imageRef = ref(storage, `users/${uid}`)
        const url = await getDownloadURL(imageRef)
        return url
    } catch (error) {
        console.log(error)
    }
}