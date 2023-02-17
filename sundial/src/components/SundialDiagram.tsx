import { index } from "d3";
import React from "react";
import { DialDto, SegmentDto } from "../dto/Dial"

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

      {Array.from({ length: segmentCount }).map((_, index) => {
        const startAngle = index * segmentAngle;

        const innerCircle = getTextPathStartAndEndPoints(radius, startAngle, textOffset + textSize, segmentCount);

        const outerCircle = getTextPathStartAndEndPoints(outerRadius, startAngle, textSize, segmentCount);

        const textPathId = `textPath-${index}`;

        return (
          <g key={index}>
            <path
              d={`M${radius + textOffset + textSize},${radius + textOffset + textSize } L${innerCircle.startX},${innerCircle.startY} A${radius},${radius} 0 0,1 ${innerCircle.endX},${innerCircle.endY} Z`}
              fill="#F2F2F2"
              stroke="#CCC"
            />
            <path fill="none" id={textPathId} d={`M${outerCircle.startX},${outerCircle.startY} A${outerRadius},${outerRadius} 0 0,1 ${outerCircle.endX},${outerCircle.endY}`} />
            <text
              fill="#000"
              dominantBaseline="central"
              fontSize={textSize}
            >
              <textPath 
              href={`#${textPathId}`}
              text-anchor="middle"
              startOffset="50%"
              >
                {data.segments[index].name}
              </textPath>
            </text>
          </g>
        );
      })}

			{Array.from({length:levelCount}).map((_, index) => (
				<circle key={`circle-${index}`} cx={outerRadius  + textSize} cy={outerRadius  + textSize} r={(radius / levelCount) * (index + 1)} fill="none" stroke="#CCC" />
      ))}
    </svg>
  );
};

export default SundialDiagram;
