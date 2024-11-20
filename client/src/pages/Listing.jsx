import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import SmallCircleLoader from "../components/Loaders/SmallCircleLoader";
import SecondaryBtn from "../components/Buttons/SecondaryBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

  console.log(data);

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
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      <div className="w-[95%] mx-auto py-3">
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
              <div className="bg-gray-700 h-64 sm:h-[20rem] md:h-[30rem] w-full">
                <img
                  className="w-full h-full object-cover"
                  src={url || "https://via.placeholder.com/150"}
                  alt={"Image: " + index}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Listing;
