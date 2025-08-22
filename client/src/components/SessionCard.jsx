// src/components/SessionCard.jsx
import React from "react";

const SessionCard = ({ title, description, author, status, onClick }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 text-sm mt-2 line-clamp-3">{description}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">By {author}</span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default SessionCard;
