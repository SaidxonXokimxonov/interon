import React from "react";
import { useNavigate } from "react-router-dom";

interface Answer {
  questionId: string;
  isCorrect: boolean;
  selected: string;
  question: string;
}

interface Result {
  id?: string;
  answers: Answer[];
  score: number;
  testId: string;
  userId: string;
  testName: string;
  date: string;
  totalQuestion: number;
}

interface Props {
  result?: Result;
}

const ResultStats: React.FC<Props> = ({ result }) => {
  const navigate = useNavigate();

  if (!result?.id)
    return (
      <div className="text-center p-8 text-red-500">
        Error: Result data not available
      </div>
    );

  const percentage = Math.round((result.score / result.totalQuestion) * 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const correctColor =
    percentage >= 80
      ? "from-green-500 to-emerald-500"
      : percentage >= 60
      ? "from-cyan-500 to-blue-500"
      : "from-orange-500 to-amber-500";

  return (
    <div
      onClick={() => navigate(`/user/results/${result.id}`)}
      className="relative bg-gradient-to-br  from-white to-gray-50 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 rounded-2xl p-6 w-full max-w-md border border-gray-200 group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-r from-emerald-50 to-green-50 rounded-tr-full" />

      <div className="absolute top-4 right-4 text-xs bg-white text-gray-600 px-3 py-1.5 rounded-full font-medium shadow-sm border border-gray-100 z-10">
        {result.date}
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4 mt-2 group-hover:text-blue-700 transition line-clamp-2 z-10 relative">
        {result.testName}
      </h2>

      <div className="flex flex-col md:flex-row gap-6 items-center mt-6 z-10 relative">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              strokeLinecap="round"
              stroke={`url(#${correctColor.replace(/\s/g, "-")})`}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 50 50)"
            />
            <defs>
              <linearGradient
                id={correctColor.replace(/\s/g, "-")}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={correctColor.split(" ")[0].replace("from-", "")}
                />
                <stop
                  offset="100%"
                  stopColor={correctColor.split(" ")[1].replace("to-", "")}
                />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">
              {percentage}%
            </span>
            <span className="text-xs text-gray-500 mt-[-4px]">Score</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Correct Answers</span>
                <span className="font-medium text-gray-800">
                  {result.score}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${(result.score / result.totalQuestion) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Total Questions</span>
                <span className="font-medium text-gray-800">
                  {result.totalQuestion}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="px-4 cursor-pointer py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]">
          View Detailed Results
        </button>
      </div>
    </div>
  );
};

export default ResultStats;
