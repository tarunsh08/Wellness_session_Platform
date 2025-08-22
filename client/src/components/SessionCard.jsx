import React from "react";
import { Link } from "react-router-dom";

const SessionCard = ({ session }) => {
  if (!session) {
    console.warn("SessionCard: No session provided");
    return null;
  }

  const { 
    _id = null, 
    title = 'Untitled Session', 
    type = 'No type specified', 
    status = 'draft', 
    content = '', 
    createdAt = new Date().toISOString() 
  } = session;
  
  const preview = content ? 
    (content.length > 100 ? content.substring(0, 100) + '...' : content) : 
    'No content yet';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{type}</p>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{preview}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{new Date(createdAt).toLocaleDateString()}</span>
          {_id && (
            <Link 
              to={`/create-session/${_id}`}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Edit →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
