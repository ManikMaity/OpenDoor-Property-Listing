import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../firebase";
import { set } from "mongoose";

export function checkObjectEmpty(obj) {
    const keys = Object.keys(obj);
    return keys.length === 0;
}


export function handleFileUpload(file, setFileUploading, setFileUploaded, setProgress, setProfileImageLink, setIsUploadError) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    let i = 0;
    uploadTask.on("state_changed", 
    (snapshot) => {
        setFileUploading(true);
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
    }, 
    (error) => {
        setIsUploadError(true);
        setFileUploading(false)
    }, 
    () => {
        setFileUploading(false);
        setIsUploadError(false);
        setFileUploaded(true);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProfileImageLink(downloadURL);
            console.log("File available at", downloadURL);
        });
    }
    );
    
}