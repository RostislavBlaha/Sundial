import React from "react"

import "./App.css"
import SundialDiagram from "./components/SundialDiagram"

const designer = {
  id: 123,
  name: "John Doe",
  annotations: [
    {
      id: 1,
      label: "Evaluation Date",
      value: "2022-01-31"
    },
    {
      id: 2,
      label: "Evaluator",
      value: "Jane Smith"
    }
  ],
  segments: [
    {
      id: 1,
      name: "Design Craft & Knowledge",
      level: 4
    },
    {
      id: 2,
      name: "Technical Knowledge",
      level: 3
    },
    {
      id: 3,
      name: "User Research",
      level: 4
    },
    {
      id: 4,
      name: "Data-driven Design",
      level: 4
    },
    {
      id: 5,
      name: "Prototyping",
      level: 4
    },
    {
      id: 6,
      name: "IA & Content Strategy",
      level: 3
    },
    {
      id: 7,
      name: "Communication",
      level: 4
    },
    {
      id: 8,
      name: "Empathy",
      level: 3
    },
    {
      id: 9,
      name: "Collaboration",
      level: 4
    },
    {
      id: 10,
      name: "Presenting",
      level: 4
    },
    {
      id: 11,
      name: "Mentoring",
      level: 3
    },
    {
      id: 12,
      name: "Leadership Skills",
      level: 2
    }
  ],
  levels: [
    "N/A",
    "Learning",
    "Applying",
    "Advanced",
    "Expert"
  ]
};

function App() {

	return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 'auto' }}>
        <SundialDiagram data={designer} radius={500} />
      </div>
    </div>

	)
}

export default App

