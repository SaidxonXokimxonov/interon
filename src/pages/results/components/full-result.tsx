import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../redux/store";
import { getSingleResult } from "../../../redux/reducers/results";
import { FaCheckCircle, FaTimesCircle, FaTrophy, FaChartBar, FaListAlt } from "react-icons/fa";

function Result() {
  const dispatch = useDispatch<AppDispatch>();
  const { result } = useSelector((state: RootState) => state.results);
  const { resultId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (resultId) {
      dispatch(getSingleResult(resultId));
    }
  }, [dispatch, resultId]);

  if (Object.keys(result).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-medium text-gray-700">Loading your results...</h2>
          <p className="text-gray-500 mt-2">Please wait while we fetch your test details</p>
        </div>
      </div>
    );
  }

  // Calculate score percentage
  const scorePercentage = Math.round((result.score / result.totalQuestion) * 100);
  
  // Determine performance category
  let performance = "";
  let performanceColor = "";
  if (scorePercentage >= 90) {
    performance = "Outstanding!";
    performanceColor = "text-purple-600";
  } else if (scorePercentage >= 75) {
    performance = "Excellent!";
    performanceColor = "text-green-600";
  } else if (scorePercentage >= 60) {
    performance = "Good Job!";
    performanceColor = "text-blue-600";
  } else if (scorePercentage >= 50) {
    performance = "Fair";
    performanceColor = "text-yellow-600";
  } else {
    performance = "Needs Improvement";
    performanceColor = "text-orange-600";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {result.testName}
                </h2>
                <p className="text-blue-100 mt-1">
                  Completed on {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full">
                  <FaListAlt className="text-white mr-2" />
                  <span className="font-medium">
                    {result.totalQuestion} Questions
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Overall Score */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaTrophy className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 font-medium">Overall Score</h3>
                    <p className="text-2xl font-bold text-gray-800">
                      {result.score} <span className="text-gray-500 text-base">/ {result.totalQuestion}</span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <FaChartBar className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 font-medium">Performance</h3>
                    <p className={`text-xl font-bold ${performanceColor}`}>
                      {performance}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Your Score</h3>
            <span className="text-blue-600 font-bold">{scorePercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="h-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500" 
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FaListAlt className="mr-2 text-indigo-600" />
              Detailed Answers
            </h2>
          </div>
          
          <div className="p-6">
            {result.answers?.map((item, idx) => (
              <div 
                key={idx} 
                className={`mb-5 p-5 rounded-xl border-l-4 ${
                  item.isCorrect 
                    ? "bg-green-50 border-l-green-500" 
                    : "bg-red-50 border-l-red-500"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">
                      <span className="text-indigo-600 mr-2">{idx + 1}.</span>
                      {item.question}
                    </p>
                    <div className="mt-3 flex items-center">
                      <div className={`mr-3 ${item.isCorrect ? "text-green-600" : "text-red-500"}`}>
                        {item.isCorrect ? (
                          <FaCheckCircle className="text-xl" />
                        ) : (
                          <FaTimesCircle className="text-xl" />
                        )}
                      </div>
                      <p className={`text-sm ${item.isCorrect ? "text-green-700" : "text-red-700"}`}>
                        <span className="font-medium">Selected:</span> {item.selected}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white px-3 py-1 rounded-full text-xs font-semibold border">
                    {item.isCorrect ? "Correct" : "Incorrect"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <button onClick={()=> navigate(`/user/tests/${result.testId}`)} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
            Review Test Again
          </button>
          <button onClick={()=> navigate('/user/results')} className="cursor-pointer px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl shadow hover:bg-gray-50 transition-all">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;