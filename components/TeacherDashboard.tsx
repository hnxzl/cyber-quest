import React from "react";

const TeacherDashboard: React.FC = () => {
  // TODO: fetch and display aggregate results from Supabase
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
      <p className="mb-4">
        Statistik pre-test, post-test, dan hasil game akan tampil di sini.
      </p>
      {/* Render statistics and CSV export here */}
    </div>
  );
};

export default TeacherDashboard;
