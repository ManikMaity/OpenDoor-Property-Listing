import React from 'react';
import useFetchQuery from '../../hooks/useFetchQuery';
import { useParams } from 'react-router-dom';
import DotLoader from '../Loaders/DotLoader';
import useFetch from '../../hooks/useFetch';

function Reactions() {

  const {id} = useParams()

  const {loading, data : listingLikeData, error, handleRefetch} = useFetchQuery(`/api/listing/likes/${id}`)

  const {loading : createLikeLoading, data : createLikeData, error : createLikeError, handlePostData } = useFetch(`/api/listing/like`)

  const reactions = {
    like: { emoji: "👍" },
    dislike: { emoji: "👎" },
    funny: { emoji: "😂" },
    wow: { emoji: "😮" },
    engry: { emoji: "😡" },
  };

  console.log(listingLikeData)

  const handleReaction = async (reactionKey) => {
    console.log(`Reaction clicked: ${reactionKey}`);
    await handlePostData({listing: id, likeType: reactionKey})
  };

  if (loading) {
    return <div className='flex justify-center md:justify-end space-x-4'><DotLoader/></div>;
  }

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
          </button>
        ))}
      </div>
  );
}

export default Reactions;
