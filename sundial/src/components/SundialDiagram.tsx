import React from "react";
import { DialDto, SegmentDto } from "../dto/Dial"
import Segment from "./Segment";

interface Props {
  data: DialDto;
  radius: number;
  textOffset?: number;
  textSize?: number;
}

const getTextPathStartAndEndPoints = (
  radius: number,
  angle: number,
  offset: number,
  segmentCount: number
) => {
  const endAngle = angle + 2 * Math.PI / segmentCount

  const startX = radius + radius * Math.sin(angle) + offset;
  const startY = radius - radius * Math.cos(angle) + offset;

  const endX = radius + radius * Math.sin(endAngle) + offset;
  const endY = radius - radius * Math.cos(endAngle) + offset;

  return {
    startX,
    startY,
    endX,
    endY,
  };
};

const SundialDiagram: React.FC<Props> = ({ 
  data,
  radius,
  textOffset = 20,
  textSize = 16,
 }) => {

  const segmentCount = data.segments.length;
  const levelCount = data.levels.length;
  const segmentAngle = (2 * Math.PI) / segmentCount;
  const outerRadius = radius + textOffset;

  // Render the chart
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
            segment={data.segments[index]}
						index={index}
          />
      ))}

			{Array.from({length:levelCount}).map((_, index) => (
				<>
					<circle key={`circle-${index}`} cx={outerRadius  + textSize} cy={outerRadius  + textSize} r={(radius / levelCount) * (index + 1)} fill="none" stroke="#CCC" />
					<g key={`level-${index}`}>
						<rect
							x={outerRadius - 30 + textSize}
							y={radius - (index * radius) / levelCount - textSize / 2 - 10}
							width={60}
							height={textSize + 20}
							fill={index % 2 === 0 ? "#f2f2f2" : "#fff"}
						/>
						<text
							x={outerRadius + textSize}
							y={radius - (index * radius) / levelCount}
							fontSize={textSize}
							textAnchor="middle"
							dominantBaseline="central"
						>
							{data.levels[index]}
						</text>
					</g>
				</>
      ))}

    </svg>
  );
};

export default SundialDiagram;
