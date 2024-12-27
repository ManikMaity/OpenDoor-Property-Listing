import React from 'react'
import { useParams } from 'react-router-dom'

function SearchContent() {

    const {searchText} = useParams();

  return (
    <div className='h-full w-full'>
        <h3 className="text-center text-lg md:text-xl mt-1">Search Result for <span className="text-blue-500 font-bold">{searchText}</span></h3>
    </div>
  )
}

export default SearchContent
