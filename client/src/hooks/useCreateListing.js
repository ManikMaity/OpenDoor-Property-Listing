import React, { useState } from 'react'
import { clearFalsyObjValue, deleteImageFromFirebase, handleMutipleFileUpload } from '../utils/utilFunctions';

function useCreateListing() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [propertyType, setPropertyType] = useState("apartment");
    const [address, setAddress] = useState("");
    const [regularPrice, setRegularPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [area, setArea] = useState(0);
    const [parkingSpaces, setParkingSpaces] = useState(0);
    const [furnished, setFurnished] = useState(false);
    const [offer, setOffer] = useState(true);
    const [files, setFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [ytVideoUrl, setYtVideoUrl] = useState("");
    const [facilities, setFacilities] = useState([]);
    const [uploadError, setIsUploadError] = useState({
      isError: false,
      message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [sellType, setSellType] = useState("rent");
    const [submitError, setSubmitError] = useState({
      isError: false,
      message: "",
    });
    const [submitLoading, setSubmitLoading] = useState(false);
  
    const handleRemoveFromPreview = (url, imageIndex) => {
      deleteImageFromFirebase(url, setDeleting);
      setImageUrls((prev) => prev.filter((_, index) => imageIndex !== index));
    };
  
    const clearAllFields = () => {
      setName("");
      setDescription("");
      setPropertyType("apartment");
      setAddress("");
      setRegularPrice(0);
      setDiscountedPrice(0);
      setBathrooms(0);
      setBedrooms(0);
      setArea(0);
      setParkingSpaces(0);
      setFurnished(false);
      setOffer(true);
      setFiles([]);
      setImageUrls([]);
      setYtVideoUrl("");
      setFacilities([]);
      setSellType("rent");
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (imageUrls.length <= 0) {
        setIsUploadError({
          isError: true,
          message: "Please upload at least one image.",
        });
        return;
      }
      const data = {
        name,
        description,
        propertyType,
        address,
        regularPrice : Number(regularPrice),
        discountedPrice : Number(discountedPrice),
        bathrooms : Number(bathrooms),
        bedrooms : Number(bedrooms),
        area : Number(area),
        parkingSpaces : Number(parkingSpaces),
        furnished,
        offer,
        imageUrls,
        ytVideoUrl,
        facilities,
        sellType,
      };
      if (data.regularPrice < data.discountedPrice) {
        setSubmitError({
          isError: true,
          message: "Regular price cannot be less than discounted price.",
        });
        return;
      }
      const filteredData = data;
      console.log(filteredData);
      try {
        setSubmitLoading(true)
        const response = await fetch("/api/listing/create", {
          method: "POST",
          body: JSON.stringify(filteredData),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const result = await response.json()
        console.log(result, "result");
        if (result.success === false){
          setSubmitError({
            isError: true, 
            message: result.message
          })
        }
        else {
          setSubmitError({
            isError: false, 
            message: ""
          })
          clearAllFields();
        }
      }
      catch(err){
        setSubmitError({
          isError: true, 
          message: err.message
        })
        
      }
      finally{
        setSubmitLoading(false)
      }
    };
  
    const handleImageUpload = () => {
      if (
        imageUrls.length >= 7 ||
        files.length > 7 ||
        files.length + imageUrls.length > 7
      ) {
        setIsUploadError({ isError: true, message: "Max 7 images allowed" });
        return;
      }
      handleMutipleFileUpload(
        files,
        setImageUrls,
        setIsUploadError,
        setIsLoading,
        setFiles
      );
    };


    return {
        name, setName,
        description, setDescription,
        propertyType, setPropertyType,
        address, setAddress,
        regularPrice, setRegularPrice,
        discountedPrice, setDiscountedPrice,
        bathrooms, setBathrooms,
        bedrooms, setBedrooms,
        area, setArea,
        parkingSpaces, setParkingSpaces,
        furnished, setFurnished,
        offer, setOffer,
        files, setFiles,
        imageUrls, setImageUrls,
        ytVideoUrl, setYtVideoUrl,
        facilities, setFacilities,
        sellType, setSellType,
        uploadError, setIsUploadError,
        isLoading, setIsLoading,
        deleting, setDeleting,
        submitError, setSubmitError,
        submitLoading, setSubmitLoading,
        handleSubmit,
        handleImageUpload,
        handleRemoveFromPreview,
        clearAllFields,
        handleMutipleFileUpload
    }
}

export default useCreateListing
