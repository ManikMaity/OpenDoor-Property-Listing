import React, { useState } from "react";
import TextInput from "../Input/TextInput";

const PriceRangeSlider = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };
  

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  return (
    <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1">
            <TextInput inputTextType="number" text={minPrice} setText={setMinPrice} styleObj={{padding: "0px 10px"}} placeholder="Min value"/>
            <TextInput inputTextType="number" placeholder="Max value"/>
        </div>
      <div className="w-full max-w-lg">
        <div className="flex justify-between text-gray-500 text-sm mb-2">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={minPrice}
            onChange={handleMinChange}
            className="absolute h-2 w-full appearance-none bg-transparent pointer-events-none z-10"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={maxPrice}
            onChange={handleMaxChange}
            className="absolute h-2 w-full appearance-none bg-transparent pointer-events-none z-10"
          />
          <div className="relative w-full h-2 bg-gray-200 rounded">
            <div
              className="absolute h-2 bg-blue-500 rounded"
              style={{
                left: `${minPrice}%`,
                width: `${maxPrice - minPrice}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
