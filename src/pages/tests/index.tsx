import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTests, sendMessages } from "./../../redux/reducers/tests";
import type { RootState, AppDispatch } from "./../../redux/store";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { faker } from "@faker-js/faker";
import toast from "react-hot-toast";

export default function Tests() {
  const dispatch = useDispatch<AppDispatch>();
  const [messageValue, setMessageValue] = useState("");
  const [messageModal, setMessageModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredTests, setFilteredTests] = useState<any[]>([]);
  const { tests, error } = useSelector((state: RootState) => state.tests);
  const navigate = useNavigate();

  async function sendMessageToBase() {
    const email = auth.currentUser?.email || "";
    const res = await dispatch(
      sendMessages({
        id: faker.string.uuid(),
        email: email,
        message: messageValue,
      })
    );

    if (res) {
      toast.success("message sended");
    }

    setMessageModal(false);
    setMessageValue("");
  }

  useEffect(() => {
    dispatch(getTests());
  }, []);

  useEffect(() => {
    const filtered = tests.filter(
      (test) =>
        test?.title?.toLowerCase().includes(search.toLowerCase()) &&
        test.questions.length > 0
    );
    setFilteredTests(filtered);
  }, [search, tests]);

  if (tests.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#eaf6ff] py-12 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-2xl h-14 bg-white/80 rounded-2xl shadow-md animate-pulse"></div>
          </div>
          <div className="flex flex-wrap justify-start gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
              <div className="animate-pulse group relative bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl w-[23%] shadow-lg overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-indigo-200"></div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100"></div>
                    <div className="h-5 w-16 bg-blue-100 rounded-full"></div>
                  </div>

                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-8 w-24 bg-blue-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#eaf6ff]">
        <div className="max-w-md text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-red-100">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Tests
          </h2>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => dispatch(getTests())}
            className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-xl transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#eaf6ff] py-12 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="relative max-w-2xl mx-auto mb-16">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search tests by name..."
            className="w-full px-6 py-4 rounded-2xl border border-gray-200 shadow-lg bg-white/80 backdrop-blur-md placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all"
          />
          <div className="absolute right-3 top-[18px]">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {filteredTests.length} tests
            </div>
          </div>
        </div>

        {filteredTests.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-7xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No tests found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Try adjusting your search term or explore all available tests by
              clearing the search field
            </p>
            <button
              onClick={() => setSearch("")}
              className="bg-gradient-to-r  from-blue-600 to-indigo-500  text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-xl transition-all duration-200"
            >
              View All Tests
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="group relative bg-white/90 backdrop-blur-xl border border-blue-100 hover:border-blue-300 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-indigo-500 text-xl mb-4">
                      {test.icon || "🧠"}
                    </div>
                    <div className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                      {test.questions.length}{" "}
                      {test.questions.length === 1 ? "question" : "questions"}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition line-clamp-2">
                    {test.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                    {test.description ||
                      "Test your knowledge with this challenging quiz"}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      {test.category || "General Knowledge"}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/user/tests/${test.id}`);
                      }}
                      className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-xl transition-all duration-200 group-hover:scale-105"
                    >
                      Start Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Can't find what you're looking for?
            <button
              onClick={() => setMessageModal(true)}
              className="ml-2 cursor-pointer text-blue-600 font-medium hover:underline"
            >
              Suggest a new test
            </button>
          </p>
        </div>

        {messageModal ? (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Enter your message
              </h2>

              <textarea
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                rows={6}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                placeholder="Type something..."
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setMessageModal(false)}
                  className="cursor-pointer px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={sendMessageToBase}
                  className="cursor-pointer px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
