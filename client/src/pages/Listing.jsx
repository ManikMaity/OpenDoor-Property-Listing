import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import SmallCircleLoader from "../components/Loaders/SmallCircleLoader";
import SecondaryBtn from "../components/Buttons/SecondaryBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import PrimaryBtn from "../components/Buttons/PrimaryBtn";
import {
  FaBed,
  FaBath,
  FaCar,
  FaRulerCombined,
  FaCouch,
  FaHouseUser,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ytUrlToEmbed } from "../utils/utilFunctions";

function Listing() {
  const { id } = useParams();
  const navigator = useNavigate();

  const { data, loading, error, handleDataFech } = useFetch(
    `/api/listing/data/${id}`
  );
  useEffect(() => {
    handleDataFech();
  }, [id]);

  const handleGoHome = () => {
    navigator("/");
  };


  if (!data) {
    if (error?.isError) {
      return (
        <div className="min-h-screen px-4 w-full bg-gray-100 flex flex-col justify-center items-center gap-4 dark:bg-gray-900">
          <h1 className="text-xl md:text-2xl text-center font-bold text-red-500">
            {error.message || "Something went wrong"}
          </h1>
          <SecondaryBtn onBtnClick={handleGoHome} style="max-w-sm">
            Go Home
          </SecondaryBtn>
        </div>
      );
    } else if (loading) {
      return (
        <div className="min-h-screen w-full bg-gray-100 grid place-content-center dark:bg-gray-900">
          <SmallCircleLoader big={true} />
        </div>
      );
    } else {
      return (
        <div className="min-h-screen w-full bg-gray-100 grid place-content-center dark:bg-gray-900">
          <SmallCircleLoader big={true} />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen px-[2%] w-full bg-gray-100 dark:bg-gray-900">
      <div className=" mx-auto py-3 relative">
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {data?.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-700 h-64 sm:h-[20rem] md:h-[28rem] w-full">
                <img
                  className="w-full h-full object-cover"
                  src={url || "https://via.placeholder.com/150"}
                  alt={"Image: " + index}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="px-4 md:px-8 shadow-lg shadow-gray-400 text-white font-semibold rounded-md absolute bottom-8 right-5 z-20 py-1 md:py-2 bg-blue-600 inline-block">
          {data?.sellType?.toLowerCase() == "rent"
            ? "Available for Rent"
            : "Available for Sale"}
        </div>
      </div>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <div className="flex md:flex-row flex-col gap-3 justify-between">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold">
                {data?.name || "Property Name"}
              </h1>
              <p className="text-gray-600 mt-2 dark:text-gray-400 flex items-center justify-start gap-2">
                <IoLocation />
                {data?.address || "Please content the seller"}
              </p>
            </div>
            <div>
              {data?.offer && data?.discountedPrice ? (
                <div className="text-2xl flex flex-col font-bold text-green-500">
                  ₹{data?.discountedPrice?.toLocaleString()}
                  <span className="ml-4 line-through text-gray-500 text-xl">
                    ₹{data?.regularPrice?.toLocaleString()}
                  </span>
                </div>
              ) : (
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ₹{data.regularPrice.toLocaleString() || "Unknown"}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 text-lg gap-3 md:gap-5">
            <div className="flex items-center gap-3 justify-center flex-wrap rounded-lg border border-gray-600 p-2 md:p-3">
              <FaBed className="text-2xl text-blue-500" />
              <span>
                <strong>Bedrooms:</strong> {data.bedrooms}
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center flex-wrap rounded-lg border border-gray-600 p-2 md:p-3">
              <FaBath className="text-2xl text-blue-500" />
              <span>
                <strong>Bathrooms:</strong> {data.bathrooms}
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center flex-wrap rounded-lg border border-gray-600 p-2 md:p-3">
              <FaCar className="text-2xl text-blue-500" />
              <span>
                <strong>Parking:</strong> {data.parkingSpaces}
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center flex-wrap rounded-lg border border-gray-600 p-2 md:p-3">
              <FaRulerCombined className="text-2xl   text-blue-500" />
              <span>
                <strong>Area:</strong> {data.area} sq ft
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center flex-wrap rounded-lg border border-gray-600 p-2 md:p-3">
              <FaCouch className="text-2xl text-blue-500" />
              <span>
                <strong>Furnished:</strong> {data.furnished ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center flex-wrap rounded-lg border border-gray-600 p-2 md:p-3">
              <FaHouseUser className="text-2xl text-blue-500" />
              <strong>Type:</strong> {data.propertyType}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">About the Property</h2>
            <p className="text-gray-600 mt-2 dark:text-gray-400">
              {data.description || "Description not available"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data?.facilities && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Facilities</h2>
                <ul className="flex flex-wrap gap-3 list-none text-gray-600 dark:text-gray-400">
                  {data?.facilities.map((facility, index) => (
                    <li
                      key={index}
                      className="bg-blue-500 bg-opacity-30 sm:py-2 sm:px-4 py-1 px-2 rounded-full "
                    >
                      {facility}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data?.ytVideoUrl && (
              <div className="grid">
                <h2 className="text-2xl font-semibold mb-4">Video Tour</h2>
                <iframe
                  src={data?.ytVideoUrl && ytUrlToEmbed(data?.ytVideoUrl)}
                  title="YouTube video player"
                  allowFullScreen
                  className="h-64 w-full"
                ></iframe>
              </div>
            )}

            <div className="p-3 rounded-md border border-gray-600 w-full max-w-lg">
              <h2 className="text-2xl font-semibold">Contect</h2>
              <div className="">
                <p className="text-black mt-2 dark:text-white">
                  Owner:{" "}
                  <span className="font-semibold">
                    {data?.userRef?.username || "Unknown"}
                  </span>
                </p>
                <a
                  className="text-blue-500 underline"
                  href={`mailto:${data?.userRef?.email}?subject=${
                    "Listing Id: " + data?._id
                  }`}
                  target="_blank"
                >
                  Mail Owner
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;
