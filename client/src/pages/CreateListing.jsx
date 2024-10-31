import React, { useState } from "react";
import { Link } from "react-router-dom";
import PrimaryBtn from "../components/Buttons/PrimaryBtn";
import SecondaryBtn from "../components/Buttons/SecondaryBtn";

const CreateListing = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [area, setArea] = useState("");
  const [parkingSpaces, setParkingSpaces] = useState("");
  const [furnished, setFurnished] = useState(false);
  const [offer, setOffer] = useState(false);
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [ytVideoUrl, setYtVideoUrl] = useState("");
  const [facilities, setFacilities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle listing creation logic here
    console.log({
      name,
      description,
      propertyType,
      address,
      regularPrice,
      discountedPrice,
      bathrooms,
      bedrooms,
      area,
      parkingSpaces,
      furnished,
      offer,
      files,
      ytVideoUrl,
      facilities,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center screenHeight bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="w-full p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Create Listing
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
            <input
              type="text"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              placeholder="Enter property type (e.g., Apartment)"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
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

          {/* Area Input */}
          <div>
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
          <div>
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
          <SecondaryBtn style="mt-1 w-1/4">Upload</SecondaryBtn>
          </div>
        </div>

        {/* YouTube Video URL Input */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            YouTube Video URL
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
            Facilities
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

        {/* Submit Button */}
        <PrimaryBtn onBtnClick={handleSubmit}>Create Listing</PrimaryBtn>
          

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
};

export default CreateListing;
