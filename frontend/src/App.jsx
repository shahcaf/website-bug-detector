import { useState } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view';
import { FaSearch, FaSpinner, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

function App() {
  const [url, setUrl] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3001/api/scan', { url });
      setReport(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to scan website');
      console.error('Scan error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 0.9) return 'text-green-500';
    if (score >= 0.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const renderScore = (score) => {
    const percentage = Math.round(score * 100);
    return (
      <div className="flex items-center">
        <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
          <div 
            className={`h-2.5 rounded-full ${getScoreColor(score).replace('text-', 'bg-')}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium">{percentage}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Website Bug Detector</h1>
          <p className="text-gray-600">Scan any website for performance, accessibility, and SEO issues</p>
        </header>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website URL (e.g., https://example.com)"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Scanning...
                </>
              ) : (
                'Scan Website'
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {report && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Scan Results for {report.url}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {Object.entries(report.lighthouse.categories).map(([key, category]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{category.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(category.score)}`}>
                          {Math.round(category.score * 100)}
                        </span>
                      </div>
                      {renderScore(category.score)}
                    </div>
                  ))}
                </div>

                {report.screenshot && (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Screenshot</h3>
                    <div className="border rounded-lg overflow-hidden shadow-sm">
                      <img 
                        src={report.screenshot} 
                        alt={`Screenshot of ${report.url}`}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Report</h3>
                  <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
                    <ReactJson 
                      src={report.lighthouse} 
                      theme="monokai"
                      displayDataTypes={false}
                      collapsed={2}
                      style={{ fontSize: '14px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
