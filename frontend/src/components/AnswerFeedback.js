import React, { useState } from "react";
import "./AnswerFeedback.css";

const AnswerFeedback = () => {
  const [liked, setLiked] = useState(null);

  return (
    <div className="flex gap-4 mt-3">
      <button
        onClick={() => setLiked(true)}
        className={`feedback-btn px-3 py-1 rounded ${
          liked
            ? "bg-green-500 text-white"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
      >
        👍 Like
      </button>

      <button
        onClick={() => setLiked(false)}
        className={`feedback-btn px-3 py-1 rounded ${
          liked === false
            ? "bg-red-500 text-white"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
      >
        👎 Dislike
      </button>
    </div>
  );
};

export default AnswerFeedback;
