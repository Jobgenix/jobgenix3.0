"use client";
import { useState } from "react";

export default function Mentorship() {
  const date = new Date();

  const [sessions, setSessions] = useState([
    { id: 1, name: "Mentor 1", desc: "John Doe", date: date.toDateString() },
  ]);

  const addNewSession = () => {
    const newSession = {
      id: sessions.length + 1,
      name: `Mentor ${sessions.length + 1}`,
      desc: `Name ${sessions.length + 1}`,
      date: date.toDateString(),
    };
    setSessions([...sessions, newSession]);
  };

  return (
    <div className="h-auto w-[90%] mt-5 ml-[5%] bg-[#e6f6ec] rounded-lg p-4 overflow-hidden">
      <h1 className="font-semibold text-xl ml-5">Mentorship Sessions</h1>

      <div className="flex overflow-x-auto space-x-5 whitespace-nowrap ml-5 pb-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="h-auto w-[90%] sm:w-[45%] md:w-[30%] min-w-[250px] bg-[#edf2ef] shadow-2xl p-4 rounded-md flex-shrink-0"
          >
            <h1 className="text-lg font-semibold">{session.name}</h1>
            <p className="text-sm">{session.desc}</p>
            <p className="text-xs mt-1 text-gray-600">{session.date}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center sm:justify-start mt-4">
        <button
          onClick={addNewSession}
          className="bg-[#01a768] h-10 p-2 w-40 rounded-lg text-white"
        >
          + Schedule Session
        </button>
      </div>
    </div>
  );
}
  