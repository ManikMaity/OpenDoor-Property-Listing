import React from 'react';

function Reactions() {
  const reactions = {
    like: { emoji: "👍" },
    love: { emoji: "❤️" },
    laugh: { emoji: "😂" },
    wow: { emoji: "😮" },
    sad: { emoji: "😢" },
    angry: { emoji: "😡" },
  };

  const handleReaction = (reactionKey) => {
    console.log(`Reaction clicked: ${reactionKey}`);
  };

  return (
      <div className="flex justify-center md:justify-end space-x-4">
        {Object.entries(reactions).map(([key, { emoji }]) => (
          <button
            key={key}
            onClick={() => handleReaction(key)}
            className="flex items-center justify-center leading-none hover:opacity-50 text-gray-600 dark:text-white dark:bg-slate-700 bg-gray-300 rounded-full p-1 hover:bg-gray-200 transition duration-300"
          >
            <span className="text-base">{emoji}</span>
          </button>
        ))}
      </div>
  );
}

export default Reactions;
