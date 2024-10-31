import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../firebase";
import { set } from "mongoose";

export function checkObjectEmpty(obj) {
    const keys = Object.keys(obj);
    return keys.length === 0;
}

export function handleMutipleFileUpload(files, setProfileImagesLink, setIsUploadError) {
    if (files.length <= 0 || files.length > 7) {
        setIsUploadError({
            isError : true,
            message : `${files.length <= 0 ? "No files" : "Max 7 files"} selected`
        });
        return;
    }
    const storage = getStorage(app);
    const promises = [];
    files.forEach(file => {
        promises.push(storeImage(file, storage, setFilesUploading, setFilesUploaded, setProgress, setProfileImagesLink, setIsUploadError));
    })


}

async function storeImage(file, storage, setFilesUploading, setFilesUploaded, setProgress, setProfileImagesLink, setIsUploadError) {
    return new Promise((resolve, reject) => {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (error) => {
                setIsUploadError({
                    isError : true,
                    message : error.message
                })
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    
                });
            }
        )
    })
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

export function clearFalsyObjValue(obj) {
    const keys = Object.keys(obj);
    keys.forEach(key => {
        if (!obj[key]){
            delete obj[key];
        }
    })
    return obj
}

