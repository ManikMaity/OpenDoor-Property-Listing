import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { useParams } from "react-router-dom";
import SecondaryBtn from "../components/Buttons/SecondaryBtn";
import { LuPanelLeftClose } from "react-icons/lu";
import SelectInput from "../components/Select/SelectInput";
import TextInput from "../components/Input/TextInput";
import PriceRangeSlider from "../components/PriceSlider/PriceRangeSlider";
import PrimaryBtn from "../components/Buttons/PrimaryBtn";
import SearchContent from "./SearchContent";

function Search() {
  const { searchText } = useParams();
  const [filterPanelOpen, setFilterPanelOpen] = useState(true);

  const [propertyType, setPropertyType] = useState("all");
  const [location, setLocation] = useState("");

  const propertyTypesArray = [
    { label: "All", value: "all" },
    { label: "Apartment", value: "apartment" },
    { label: "Villa", value: "villa" },
    { label: "House", value: "house" },
    { label: "Land", value: "land" },
    { label: "Duplex", value: "duplex" },
    { label: "Bungalow", value: "bungalow" },
    { label: "Townhouse", value: "townhouse" },
    { label: "Studio", value: "studio" },
    { label: "Penthouse", value: "penthouse" },
  ];

  return (
    <div className="bg-gray-100 flex dark:bg-gray-900 min-h-[calc(100vh-68px)] dark:text-white">
      <div
        className={`${
          filterPanelOpen ? "md:w-1/5 w-2/5 opacity-100  p-2" : "w-0 opacity-0"
        } dark:bg-gray-950 bg-gray-200 transition-all duration-300 ease-in-out `}
      >
        <form className="flex flex-col gap-3">
          <SelectInput
            options={propertyTypesArray}
            label="Property Type"
            value={propertyType}
            setValue={setPropertyType}
            styleObj={{ padding: "5px 10px" }}
          />
          <TextInput styleObj={{padding: "5px 10px"}} text={location} setText={setLocation} placeholder="Enter property location"/>

          <PriceRangeSlider/>

          <div className="flex gap-1">
            <SecondaryBtn styleObj={{width : "50%"}}>Cancel</SecondaryBtn>
            <PrimaryBtn styleObj={{width : "50%"}}>Filter</PrimaryBtn>
          </div>
        </form>
      </div>
      <div
        className={`${
          filterPanelOpen ? "md:w-4/5 w-3/5" : "w-full"
        } relative transition-all duration-300 ease-in-out`}
      >
        <div className="absolute top-0 left-0 z-10">
          <SecondaryBtn
            styleObj={{ width: "50px", margin: "5px" }}
            onBtnClick={() => setFilterPanelOpen(!filterPanelOpen)}
          >
            {filterPanelOpen ? <LuPanelLeftClose /> : <IoFilter />}
          </SecondaryBtn>
        </div>
        <SearchContent/>
      </div>
    </div>
  );
}

export default Search;
