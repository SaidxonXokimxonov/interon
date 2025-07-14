import { NavLink } from "react-router-dom";

export function Home() {
  const userJson = localStorage.getItem("user");
  const userData = userJson ? JSON.parse(userJson) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="max-w-3xl space-y-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight">
          Ace Your Technical Interview
        </h1>

        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Master real-world frontend interview questions. Build confidence and
          excel in your next career opportunity.
        </p>

        <div className="pt-4">
          {userData ? (
            <NavLink
              to="user/tests"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Practicing →
            </NavLink>
          ) : (
            <p className="text-blue-800 bg-blue-100/80 inline-block px-5 py-2.5 rounded-full text-sm font-medium">
              Login to access all interview questions
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
        {[
          {
            icon: "📚",
            title: "Comprehensive Categories",
            description:
              "HTML, CSS, JavaScript, React, and modern framework questions",
          },
          {
            icon: "💡",
            title: "Real-World Scenarios",
            description:
              "Practical challenges from actual technical interviews",
          },
          {
            icon: "📈",
            title: "Progress Tracking",
            description: "Monitor your improvement with completion metrics",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-7 rounded-2xl shadow-sm border border-blue-100/50 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-blue-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
