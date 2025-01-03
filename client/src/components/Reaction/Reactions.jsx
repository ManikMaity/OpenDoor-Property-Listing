import React, { useEffect, useState } from 'react';
import useFetchQuery from '../../hooks/useFetchQuery';
import { useParams } from 'react-router-dom';
import DotLoader from '../Loaders/DotLoader';
import useFetch from '../../hooks/useFetch';

function Reactions() {

  const {id} = useParams()
  const [likesCount, setLikesCount] = useState({
    like: 0,
    dislike: 0,
    funny: 0,
    wow: 0,
    engry: 0
  })


  const {data : listingLikeData, error, handleRefetch} = useFetchQuery(`/api/listing/likes/${id}`)

  const {loading : createLikeLoading, data : createLikeData, error : createLikeError, handlePostData } = useFetch(`/api/listing/like`)

  const reactions = {
    like: { emoji: "👍" },
    dislike: { emoji: "👎" },
    funny: { emoji: "😂" },
    wow: { emoji: "😮" },
    engry: { emoji: "😡" },
  };

  useEffect(() => {
    if (listingLikeData?.likesCount){
      setLikesCount(listingLikeData?.likesCount)
    }
  }, [listingLikeData])

  const handleReaction = async (reactionKey) => {
    console.log(`Reaction clicked: ${reactionKey}`);
    setLikesCount(prevState => ({
      ...prevState,
      [reactionKey]: prevState[reactionKey] + 1
    }))
    await handlePostData({listing: id, likeType: reactionKey})
    handleRefetch();
  };

  if (error?.isError) {
    return <div className='flex justify-center md:justify-end space-x-4'>Error: {error.message}</div>;
  }

  return (
      <div className="flex justify-center md:justify-end space-x-4">
        {Object.entries(reactions).map(([key, { emoji }]) => (
          <button
            key={key}
            onClick={() => handleReaction(key)}
            className="flex items-center justify-center leading-none brightness-90 text-gray-600 dark:text-white dark:bg-slate-700 bg-gray-300 hover:scale-150 rounded-full p-1 hover:brightness-150 transition duration-300"
          >
            <span className="text-base">{emoji}</span>
            <span className='text-sm'>{likesCount[key]}</span>
          </button>
        ))}
      </div>
  );
}

export default Reactions;
