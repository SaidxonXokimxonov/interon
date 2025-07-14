import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResults } from "./../../redux/reducers/results";
import type { RootState, AppDispatch } from "./../../redux/store";
import ResultStats from "./components/result-stats";
import DatePicker from "../../components/date";

export default function Results() {
  const dispatch = useDispatch<AppDispatch>();
  const { results } = useSelector((state: RootState) => state.results);
  const [selectedDate, setSelectedDate] = useState(getDate);
  const userJson = localStorage.getItem("user");
  const userData = userJson ? JSON.parse(userJson) : null;

  useEffect(() => {
    dispatch(getResults());
    console.log(results);
  }, []);

  function getDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 0-based
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function setDate(d: string) {
    setSelectedDate(() => d);
    return d;
  }

  const filteredResults = userData
    ? results
        .filter((item) => item.userId === userData.uid)
        .sort((a, b) => {
          const today = new Date().toISOString().split("T")[0]; // "2025-07-04" misol uchun
          const dateA = new Date(`${today}T${a.time}`).getTime();
          const dateB = new Date(`${today}T${b.time}`).getTime();
          return dateB - dateA;
        })
    : [];

  if (filteredResults.length == 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#eaf6ff] py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start mb-10">
            <div className="w-60 max-w-2xl h-20 bg-white/80 rounded-2xl shadow-md animate-pulse"></div>
          </div>
          <div className="flex flex-wrap w-full gap-5 justify-between">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="relative w-[32%] bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl p-6 max-w-md border border-gray-200 animate-pulse overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-r from-emerald-50 to-green-50 rounded-tr-full" />

                <div className="absolute top-4 right-4 h-6 w-20 bg-gray-200 rounded-full z-10" />

                <div className="h-6 w-3/4 bg-gray-300 rounded mb-4 mt-2 z-10 relative" />

                <div className="flex flex-col md:flex-row gap-6 items-center mt-6 z-10 relative">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-gray-200" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-12 h-6 bg-gray-300 rounded mb-1" />
                      <div className="w-10 h-4 bg-gray-200 rounded" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <div className="w-24 h-4 bg-gray-200 rounded" />
                        <div className="w-10 h-4 bg-gray-300 rounded" />
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-300 h-2 rounded-full w-2/3" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <div className="w-24 h-4 bg-gray-200 rounded" />
                        <div className="w-10 h-4 bg-gray-300 rounded" />
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-300 h-2 rounded-full w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="px-4 py-2 bg-gray-300 rounded-full w-40 mx-auto h-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  // Asosiy kontent - 3 tadan qatorga
  return (
    <div className="w-full px-4 py-8">
      <DatePicker selectedDate={selectedDate} setSelectedDate={setDate} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map((item) => {
          if (item.date == selectedDate) {
            return <ResultStats key={item.id} result={item} />;
          }
        })}
      </div>
    </div>
  );
}
