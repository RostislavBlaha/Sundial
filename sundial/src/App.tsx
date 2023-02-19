import React, {useState} from "react"

import "./App.css"
import Detail from "./components/Detail/Detail";
import FullScreenOverlay from "./components/Menu/FullScreenOverlay";
import { DialDto } from "./dto/Dial";

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
			level: 0
		},
		{
			id: 2,
			name: "Technical Knowledge",
			level: 0
		},
		{
			id: 3,
			name: "User Research",
			level: 0
		},
		{
			id: 4,
			name: "Data-driven Design",
			level: 0
		},
		{
			id: 5,
			name: "Prototyping",
			level: 0
		},
		{
			id: 6,
			name: "IA & Content Strategy",
			level: 0
		},
		{
			id: 7,
			name: "Communication",
			level: 0
		},
		{
			id: 8,
			name: "Empathy",
			level: 0
		},
		{
			id: 9,
			name: "Collaboration",
			level: 0
		},
		{
			id: 10,
			name: "Presenting",
			level: 0
		},
		{
			id: 11,
			name: "Mentoring",
			level: 0
		},
		{
			id: 12,
			name: "Leadership Skills",
			level: 0
		}
	],
	levels: [
		"N/A",
		"Learning",
		"Applying",
		"Advanced",
		"Expert"
	]
}

function App() {
  const [dial, setDial] = useState<DialDto>(designer);

  const saveToFile = () => {
		const fileName = 'sundial.json';
		const json = JSON.stringify(dial);
		const blob = new Blob([json], { type: 'application/json' });
		const href = URL.createObjectURL(blob);
	
		const link = document.createElement('a');
		link.href = href;
		link.download = dial.name;
	
		// Dispatch a click event on the link element
		link.dispatchEvent(new MouseEvent('click'));
	
		// Clean up
		URL.revokeObjectURL(href);
  };

  const handleFileSelect = (newDial: DialDto) => {
    setDial(newDial);
  };

	const resetDiagram = () => {
		setDial({
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
					level: 0
				},
				{
					id: 2,
					name: "Technical Knowledge",
					level: 0
				},
				{
					id: 3,
					name: "User Research",
					level: 0
				},
				{
					id: 4,
					name: "Data-driven Design",
					level: 0
				},
				{
					id: 5,
					name: "Prototyping",
					level: 0
				},
				{
					id: 6,
					name: "IA & Content Strategy",
					level: 0
				},
				{
					id: 7,
					name: "Communication",
					level: 0
				},
				{
					id: 8,
					name: "Empathy",
					level: 0
				},
				{
					id: 9,
					name: "Collaboration",
					level: 0
				},
				{
					id: 10,
					name: "Presenting",
					level: 0
				},
				{
					id: 11,
					name: "Mentoring",
					level: 0
				},
				{
					id: 12,
					name: "Leadership Skills",
					level: 0
				}
			],
			levels: [
				"N/A",
				"Learning",
				"Applying",
				"Advanced",
				"Expert"
			]
		});
	}
  

	return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <FullScreenOverlay   
				onNew={resetDiagram}     
        onSave={saveToFile}
				onLoad={handleFileSelect}/>
      <Detail dial={dial} setDial={setDial}/>
    </div>

	)
}

export default App

