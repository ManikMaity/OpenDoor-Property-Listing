import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../firebase";

export function checkObjectEmpty(obj) {
    const keys = Object.keys(obj);
    return keys.length === 0;
}

export function handleMutipleFileUpload(files, setImageUrls, setIsUploadError, setUploading, setFiles) {
    if (files.length <= 0 || files.length > 7) {
        setIsUploadError({
            isError: true,
            message: `${files.length <= 0 ? "No files" : "Max 7 files"} selected`
        });
        return;
    }

    setIsUploadError({ isError: false, message: "" });
    setUploading(true);
    
    const promiseImage = [];

    for (let i = 0; i < files.length; i++) {
        promiseImage.push(uploadImageAsPromise(files[i], setIsUploadError));
    };
    
    Promise.all(promiseImage)
        .then((urls) => {
            setImageUrls((prev) => [...prev, ...urls]); // Set image URLs on successful uploads
            setUploading(false);
            setFiles([]);
        })
        .catch(() => {
            setUploading(false); // Ensure loading is reset if any promise fails
        });
}

function uploadImageAsPromise(file, setIsUploadError) {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                if (snapshot.state === "paused") console.log("Upload is paused");
            },
            (error) => {
                setIsUploadError({ isError: true, message: error.message });
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    resolve(downloadURL);
                });
            }
        );
    });
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


function getPathStorageFromUrl(url) {
    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/opendoor-db7d9.appspot.com/o/";

    // Remove the base URL
    let imagePath = url.replace(baseUrl, "");
    
    // Extract the path before any query parameters
    const indexOfEndPath = imagePath.indexOf("?");
    imagePath = imagePath.substring(0, indexOfEndPath);

    // Decode the path to handle any double-encoded characters
    imagePath = decodeURIComponent(imagePath);

    return imagePath;
}


export function deleteImageFromFirebase(url, setDeleting) {
    const storage = getStorage(app);
    const imagePath = getPathStorageFromUrl(url);

    // Create a reference to the file to delete by parsing the URL
    const fileRef = ref(storage, imagePath);

    // Delete the file
    deleteObject(fileRef)
        .then(() => {
            console.log("File deleted successfully");
        })
        .catch((error) => {
            console.error("Error deleting file:", error);
        })
        .finally(() => {
            setDeleting(false);
        });
}


export function reduseTextLength(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
}