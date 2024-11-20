import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useCreateListing from "../hooks/useCreateListing";
import SmallCircleLoader from "../components/Loaders/SmallCircleLoader";
import SecondaryBtn from "../components/Buttons/SecondaryBtn";
import PrimaryBtn from "../components/Buttons/PrimaryBtn";
import useFetch from "../hooks/useFetch";

function UpdateListing() {
  const { id } = useParams();
  const navigator = useNavigate();

  const {
    name,
    setName,
    description,
    setDescription,
    propertyType,
    setPropertyType,
    address,
    setAddress,
    regularPrice,
    setRegularPrice,
    discountedPrice,
    setDiscountedPrice,
    bathrooms,
    setBathrooms,
    bedrooms,
    setBedrooms,
    area,
    setArea,
    parkingSpaces,
    setParkingSpaces,
    furnished,
    setFurnished,
    offer,
    setOffer,
    setFiles,
    imageUrls,
    setImageUrls,
    ytVideoUrl,
    setYtVideoUrl,
    facilities,
    setFacilities,
    sellType,
    setSellType,
    uploadError,
    isLoading,
    deleting,
    handleImageUpload,
    handleRemoveFromPreview,
  } = useCreateListing();

  const { handleDataFech, data, error } = useFetch(
    `/api/listing/data/${id}`
  );

  const {
    handlePostData,
    loading: postDataLoading,
    data: postData,
    error: postDataError,
    setError : setPostDataError
  } = useFetch(`/api/listing/edit/${id}`);


  useEffect(() => {
    handleDataFech();
    console.log(data);
  }, []);

  useEffect(() => {
    console.log(data);
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setPropertyType(data.propertyType);
      setAddress(data.address);
      setRegularPrice(data.regularPrice);
      setDiscountedPrice(data.discountedPrice);
      setBathrooms(data.bathrooms);
      setBedrooms(data.bedrooms);
      setArea(data.area);
      setParkingSpaces(data.parkingSpaces);
      setFurnished(data.furnished);
      setOffer(data.offer);
      setFacilities(data.facilities);
      setSellType(data.sellType);
      setYtVideoUrl(data.ytVideoUrl || "");
      setImageUrls(data.imageUrls);
    }
  }, [data]);


  const handleUpdateListing = async () => {
    if (imageUrls.length <= 0) {
      setPostDataError({
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
      setPostDataError({
        isError: true,
        message: "Regular price cannot be less than discounted price.",
      });
      return;
    }
    await handlePostData(data);
    navigator(`/listing/${id}`)
  }

  return (
    <div className="flex flex-col justify-center items-center screenHeight bg-gray-100 dark:bg-gray-900">
      <form className="w-full p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Update Listing
        </h2>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="flex  w-full flex-col gap-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Property Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter property name"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter property description"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                rows="4"
                required
              />
            </div>

            {/* Property Type Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="house">House</option>
                <option value="land">Land</option>
                <option value="duplex">Duplex</option>
                <option value="bungalow">Bungalow</option>
                <option value="townhouse">Townhouse</option>
                <option value="studio">Studio</option>
                <option value="penthouse">Penthouse</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Address Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter property address"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            {/* Price Inputs */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Regular Price
                </label>
                <input
                  type="number"
                  value={regularPrice}
                  onChange={(e) => setRegularPrice(e.target.value)}
                  placeholder="Enter regular price"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
              {offer && (
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Discounted Price
                  </label>
                  <input
                    type="number"
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                    placeholder="Enter discounted price"
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
              )}
            </div>

            {/* Bathrooms & Bedrooms Inputs */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bathrooms
                </label>
                <input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  placeholder="Number of bathrooms"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bedrooms
                </label>
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  placeholder="Number of bedrooms"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              {/* Area Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Area (sq ft)
                </label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Enter area"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>

              {/* Parking Spaces Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Parking Spaces
                </label>
                <input
                  type="number"
                  value={parkingSpaces}
                  onChange={(e) => setParkingSpaces(e.target.value)}
                  placeholder="Enter number of parking spaces"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  required
                />
              </div>
            </div>

            {/* Furnished & Offer Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={furnished}
                  onChange={() => setFurnished(!furnished)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Furnished
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={offer}
                  onChange={() => setOffer(!offer)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Offer
                </label>
              </div>

              <div className="flex items-center gap-2 bg-slate-700 p-2 rounded-md">
                <input
                  type="radio"
                  name="sellType"
                  id="sellType"
                  value="rent"
                  checked={sellType === "rent"}
                  onChange={(e) => setSellType(e.target.value)}
                />
                <label
                  htmlFor="sellType"
                  className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Rent
                </label>
                <input
                  type="radio"
                  name="sellType"
                  id="sellType"
                  value="sale"
                  checked={sellType === "sale"}
                  onChange={(e) => setSellType(e.target.value)}
                />
                <label
                  htmlFor="sellType"
                  className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Sale
                </label>
              </div>
            </div>

            {/* Image preview */}
            <div className="flex gap-3 flex-wrap">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative w-24 h-24 z-10">
                  <img
                    src={url}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full w-5 h-5 text-center text-sm text-gray-800 hover:bg-red-400 hover:text-white"
                    onClick={() => handleRemoveFromPreview(url, index)}
                    disabled={deleting}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4">
          {/* Image Upload Input */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Images
            </label>
            <div className="flex gap-4 w-full">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
                className="w-3/4 px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <SecondaryBtn style="mt-1 w-1/4" onBtnClick={handleImageUpload}>
                {isLoading ? <SmallCircleLoader big={true} /> : "Upload"}
              </SecondaryBtn>
            </div>
          </div>

          {/* YouTube Video URL Input */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              YouTube Video URL (optional)
            </label>
            <input
              type="url"
              value={ytVideoUrl}
              onChange={(e) => setYtVideoUrl(e.target.value)}
              placeholder="Enter YouTube video URL"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Facilities Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Facilities (comma-separated)
          </label>
          <input
            type="text"
            value={facilities.join(", ")}
            onChange={(e) =>
              setFacilities(
                e.target.value.split(",").map((item) => item.trim())
              )
            }
            placeholder="Enter facilities (comma-separated)"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        {/* Error Message */}
        {uploadError.isError && (
          <p className="text-red-500">😵 {uploadError.message}</p>
        )}
        {postDataError.isError && (
          <p className="text-red-500">😵 {postDataError.message}</p>
        )}
        {error.isError && <p className="text-red-500">😵 {error.message}</p>}
        {/* Submit Button */}
        <PrimaryBtn
          onBtnClick={handleUpdateListing}
          disabled={postDataLoading || isLoading}
        >
          {postDataLoading ? <SmallCircleLoader big={true} /> : "Update"}
        </PrimaryBtn>

        {/* Link to go back */}
        <div className="text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UpdateListing;
