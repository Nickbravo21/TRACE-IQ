import React, { useState } from 'react';

const LogTable = ({ logs, loading, onExplainLog, onLoadMore, hasMore }) => {
  const [expandedLog, setExpandedLog] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleRowClick = (logId) => {
    setExpandedLog(expandedLog === logId ? null : logId);
  };

  if (logs.length === 0 && !loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Errors Found</h3>
        <p className="text-gray-600">
          No error logs found for this project. Start sending error data to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Error Logs</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Error Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Occurred At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <React.Fragment key={log.id}>
                <tr 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(log.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {truncateText(log.message)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {truncateText(log.url, 50)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {formatDate(log.occurred_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExplainLog(log.id);
                      }}
                      disabled={!!log.explanation}
                      className="text-blue-600 hover:text-blue-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      {log.explanation ? 'Explained' : 'Explain'}
                    </button>
                  </td>
                </tr>
                
                {expandedLog === log.id && (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Full Error Message:</h4>
                          <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                            {log.message}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Stack Trace:</h4>
                          <pre className="text-xs text-gray-700 bg-white p-3 rounded border overflow-x-auto whitespace-pre-wrap">
                            {log.stack_trace}
                          </pre>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Details:</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">URL:</span> {log.url}
                            </div>
                            <div>
                              <span className="font-medium">User Agent:</span> {truncateText(log.user_agent, 60)}
                            </div>
                            <div>
                              <span className="font-medium">Occurred:</span> {formatDate(log.occurred_at)}
                            </div>
                            <div>
                              <span className="font-medium">Logged:</span> {formatDate(log.created_at)}
                            </div>
                          </div>
                        </div>
                        
                        {log.explanation && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                              AI Explanation:
                              {log.explanationCached && (
                                <span className="ml-2 text-xs text-green-600">(Cached)</span>
                              )}
                            </h4>
                            <div className="text-sm text-gray-700 bg-blue-50 p-3 rounded border border-blue-200">
                              <pre className="whitespace-pre-wrap font-sans">{log.explanation}</pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      {loading && (
        <div className="px-6 py-4 text-center text-gray-500">
          Loading logs...
        </div>
      )}
      
      {hasMore && !loading && (
        <div className="px-6 py-4 text-center border-t border-gray-200">
          <button
            onClick={onLoadMore}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default LogTable;