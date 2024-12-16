import React from "react";

function AllComments() {
    // TODO - Separate the comment and resplies to to separate compo
  const comments = [
    {
      id: 1,
      name: "John Doe",
      date: "December 15, 2024",
      profileImage: "https://via.placeholder.com/50",
      text: "This is a sample comment. Tailwind CSS makes styling effortless!",
      replies: [
        {
          id: 1,
          name: "Alice Brown",
          date: "December 16, 2024",
          text: "Absolutely agree with you!",
        },
        {
          id: 2,
          name: "Mark Lee",
          date: "December 17, 2024",
          text: "Couldn’t have said it better!",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "December 16, 2024",
      profileImage: "https://via.placeholder.com/50",
      text: "I completely agree! React and Tailwind are a great combination.",
      replies: [
        {
          id: 1,
          name: "Michael Green",
          date: "December 17, 2024",
          text: "React is awesome for reusable components!",
        },
      ],
    },
  ];

  return (
    <div className="mx-auto mt-6 rounded-lg shadow-md">
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="md:p-4 p-2 bg-slate-800 rounded-lg border border-gray-500 space-y-4"
          >
            {/* Comment */}
            <div className="flex items-start space-x-4">
              <img
                src={comment.profileImage}
                alt={`${comment.name} profile`}
                className="md:w-12 md:h-12 h-8 w-8 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{comment.name}</h3>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700 dark:text-white mt-2">
                  {comment.text}
                </p>
              </div>
            </div>

            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="mt-4 space-y-3 text-gray-700 dark:text-white">
                {comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="flex items-start space-x-4 ml-4 md:ml-6 bg-slate-700 p-3 rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-2 justify-between">
                        <img
                          src={comment.profileImage}
                          alt={`${reply.name} profile`}
                          className="md:w-12 md:h-12 h-8 w-8 rounded-full"
                        />
                        <h4 className="font-medium">{reply.name}</h4>
                        <span className="text-sm">{reply.date}</span>
                      </div>
                      <p className="mt-1">{reply.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllComments;
