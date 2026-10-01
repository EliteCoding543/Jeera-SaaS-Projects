import React from "react";

const GreetingDashboard = () => {
  const hour = new Date().getHours();

  let greeting;

  if (hour >= 6 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else if (hour >= 18 && hour < 24) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
<div>
  <p className="text-xs font-medium text-slate-400">
    {today}
  </p>

  <h3 className="mt-2 flex items-center gap-2 text-2xl font-bold text-slate-950">
    <span className="inline-flex items-center rounded-full border border-indigo-200/70 bg-linear-to-r from-indigo-50 via-violet-50 to-fuchsia-50 px-3 py-1 text-sm font-semibold tracking-wide text-indigo-600 shadow-sm shadow-indigo-100">
      {greeting} , Shubham
    </span>
  </h3>
</div>
  );
};

export default GreetingDashboard;