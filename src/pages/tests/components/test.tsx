import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { getSingleTests } from "../../../redux/reducers/tests";
import { useNavigate, useParams } from "react-router-dom";

import {
  addResults,
  setCurrentResult,
  setLoading,
  type Answer,
  type Result,
} from "../../../redux/reducers/results";
import toast from "react-hot-toast";

export default function Test() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { singleTest } = useSelector((state: RootState) => state.tests);
  const { loading: resultLoading } = useSelector(
    (state: RootState) => state.results
  );

  const { testId } = useParams();
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [testName, setTestName] = useState("");

  const userJson = localStorage.getItem("user");
  const userData = userJson ? JSON.parse(userJson) : null;

  async function finishTest() {
    const today = new Date().toISOString().split("T")[0];
    const now = new Date();
    const currentTime = now.toLocaleTimeString("en-GB"); // format: "HH:MM:SS"
    const score = answers.filter((item) => item.isCorrect === true);
    dispatch(setLoading(true));

    const sortedAnswers: Answer[] = singleTest.questions.map((q: any) => {
      const match = answers.find((a) => a.questionId === q.id);
      return {
        questionId: q.id,
        question: q.question,
        selected: match?.selected ?? "",
        isCorrect: match?.isCorrect ?? false,
      };
    });

    console.log(sortedAnswers);

    const obj: Result = {
      testId: testId ? testId : "",
      userId: userData.uid,
      answers: sortedAnswers,
      score: score.length,
      testName: testName,
      date: today,
      time: currentTime,
      totalQuestion: singleTest.questions.length,
    };

    dispatch(setCurrentResult(obj));
    const res = await dispatch(addResults(obj));
    if (res) {
      dispatch(setLoading(false));
      toast.success("Test Finished");
      setTimeout(() => {
        navigate("/user/currentResult");
      }, 0);
    }
  }

  useEffect(() => {
    dispatch(getSingleTests(testId as string));
  }, []);

  const handleOptionSelect = (
    questionId: string,
    answer: string,
    question: string,
    correctAnswer: string,
    title: string
  ) => {
    const isCorrect = answer === correctAnswer;
    console.log(singleTest);

    setAnswers((prev) => {
      const existing = prev.find((item) => item.questionId === questionId);

      if (existing) {
        return prev.map((item) =>
          item.questionId === questionId
            ? { ...item, selected: answer, isCorrect }
            : item
        );
      } else {
        return [
          ...prev,
          {
            questionId,
            selected: answer,
            isCorrect,
            question,
            testName: title,
          },
        ];
      }
    });
    setTestName(title);
  };

  if (!singleTest.id)
    return (
      <div className="grid place-items-center h-[80vh]">
        <h1 className="text-3xl">...Loading</h1>
      </div>
    );

  return (
    <div className="w-[80%] mx-auto py-[50px]">
      {singleTest?.questions?.map((item, idx) => {
        return (
          <div key={item.id} className="mb-10 pb-6 border-b border-gray-200">
            <h2 className="mb-4 text-xl font-semibold text-blue-800 flex items-start gap-2">
              <span className="text-blue-500 font-bold">{idx + 1}.</span>{" "}
              <pre>
                <code>
                  {item.question}
                </code>
              </pre>
            </h2>

            <div className="space-y-3">
              {item.options?.map((option) => (
                <label
                  key={option}
                  className="block w-full p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition duration-200"
                >
                  <input
                    type="radio"
                    name={`question-${item.id}`}
                    value={option}
                    onChange={() =>
                      handleOptionSelect(
                        String(item.id),
                        option,
                        item.question,
                        item.correctAnswer,
                        singleTest.title
                      )
                    }
                    checked={
                      answers.find((a) => a.questionId === String(item.id))
                        ?.selected === option
                    }
                    className="mr-3"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        );
      })}

      <button
        onClick={finishTest}
        disabled={resultLoading}
        className="hover:bg-[#1447E6]  disabled:cursor-not-allowed disabled:opacity-50 hover:text-white transition-all border cursor-pointer block border-[#1447E6] text-[#1447E6] rounded px-5 py-2 mt-5 mx-auto"
      >
        {resultLoading ? "loading..." : "submit"}
      </button>
    </div>
  );
}
