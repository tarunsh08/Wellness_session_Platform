import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
    description = '',
    createdAt = new Date().toISOString() 
  } = session;
  
  // Use description if available, otherwise use content for preview
  const previewText = description || content;
  const preview = previewText ? 
    (previewText.length > 120 ? previewText.substring(0, 120) + '...' : previewText) : 
    'No content yet';

  const navigate = useNavigate();

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="p-6">
        {/* Header with status badge */}
        <div onClick={() => navigate(`/session/${_id}`)} className="flex justify-between items-start mb-4 cursor-pointer">
          <h3 className="text-lg font-semibold text-neutral-100 group-hover:text-neutral-50 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
            status === 'published' 
              ? 'bg-green-900/20 text-green-300 border-green-700/50' 
              : status === 'draft'
              ? 'bg-yellow-900/20 text-yellow-300 border-yellow-700/50'
              : 'bg-neutral-700/50 text-neutral-300 border-neutral-600/50'
          }`}>
            {status}
          </span>
        </div>

        {/* Session type */}
        {type && (
          <p className="text-sm text-neutral-400 mb-3">
            {type}
          </p>
        )}

        {/* Preview content */}
        <p className="text-neutral-300 text-sm mb-5 line-clamp-3 leading-relaxed">
          {preview}
        </p>

        {/* Footer with date and edit link */}
        <div className="flex justify-between items-center pt-4 border-t border-neutral-700">
          <span className="text-xs text-neutral-500">
            {new Date(createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          {_id && (
            <Link 
              to={`/create-session/${_id}`}
              className="inline-flex items-center text-sm text-neutral-300 hover:text-neutral-100 font-medium transition-colors duration-300 group/link"
            >
              Edit
              <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;