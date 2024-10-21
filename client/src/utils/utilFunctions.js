import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../firebase";

export function checkObjectEmpty(obj) {
    const keys = Object.keys(obj);
    return keys.length === 0;
}


export function handleFileUpload(file) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", 
    (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
    }, 
    (error) => {
        console.log(error);
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
        });
    }
    );
    
}