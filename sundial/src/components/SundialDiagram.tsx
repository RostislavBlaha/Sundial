import React, { useState } from "react";
import { DialDto } from "../dto/Dial"
import Segment from "./Segment";

interface Props {
  data: DialDto;
  radius: number;
  textOffset?: number;
  textSize?: number;
}

const SundialDiagram: React.FC<Props> = ({ 
  data,
  radius,
  textOffset = 20,
  textSize = 16,
 }) => {
	const [dial, setDial] = useState<DialDto>(data)
  const segmentCount = dial.segments.length;
  const levelCount = dial.levels.length;
  const segmentAngle = (2 * Math.PI) / segmentCount;
  const outerRadius = radius + textOffset;

	const updateSegment = (id: number, level: number )  => {
		const newSegments = dial.segments;
		const index = newSegments.findIndex((segment) => segment.id === id);
		newSegments[index] = { ...newSegments[index], level };
		setDial({ ...dial, segments: newSegments });
	}

  return (
    <svg width={(outerRadius+textSize) * 2} height={(outerRadius+textSize) * 2}>
      <defs>
        <path
          id="textPath"
          d={`M${radius},${radius - 30} m-${radius - 30},0 a${radius - 30},${radius - 30} 0 1,0 ${2 * (radius - 30)},0 a${radius - 30},${radius - 30} 0 1,0 -${2 * (radius - 30)},0`}
        />
      </defs>

			{Array.from({length:levelCount}).map((_, index) => (
				<circle key={`circle-${index}`} cx={outerRadius  + textSize} cy={outerRadius  + textSize} r={(radius / levelCount) * (levelCount - index)} fill={index % 2 === 0 ? "#f2f2f2" : "#fff"} stroke="#CCC" />
      ))}

      {Array.from({ length: segmentCount }).map((_, index) => (
          <Segment
            key={`segment-${index}`}
						radius={radius}
						outerRadius={outerRadius}
						startAngle={index * segmentAngle}
						textOffset={textOffset}
						textSize={textSize}
						segmentCount={segmentCount}
						levelCount={levelCount}
            segment={dial.segments[index]}
						index={index}
						updateSegment={updateSegment}
          />
      ))}

			{Array.from({length:levelCount}).map((_, index) => (
				<>
					<circle key={`circle-${index}`} cx={outerRadius  + textSize} cy={outerRadius  + textSize} r={(radius / levelCount) * (index + 1)} fill="none" stroke="#CCC" />
					<g key={`level-${index}`}>

						<text
							x={outerRadius + textSize}
							y={radius - (index * radius) / levelCount - textSize}
							fontSize={textSize}
							textAnchor="middle"
							dominantBaseline="central"
						>
							{dial.levels[index]}
						</text>
					</g>
				</>
      ))}

    </svg>
  );
};

export default SundialDiagram;
