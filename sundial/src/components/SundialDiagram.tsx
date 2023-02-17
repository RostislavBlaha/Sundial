import React from "react";
import { DialDto, SegmentDto } from "../dto/Dial"

interface Props {
  data: DialDto;
  radius: number;
}

const getTextPathStartAndEndPoints = (
  radius: number,
  outerRadius: number,
  angle: number,
  textOffset: number,
  textSize: number
) => {
  const startX = radius + radius * Math.sin(angle) + textOffset + textSize;
  const startY = radius - radius * Math.cos(angle) + textOffset + textSize;

  const endX = radius + radius * Math.sin(angle + 2 * Math.PI / 12) + textOffset + textSize;
  const endY = radius - radius * Math.cos(angle + 2 * Math.PI / 12) + textOffset + textSize;

  const startOuterX = outerRadius + outerRadius * Math.sin(angle) + textSize;
  const startOuterY = outerRadius - outerRadius * Math.cos(angle) + textSize;

  const endOuterX = outerRadius + outerRadius * Math.sin(angle + 2 * Math.PI / 12) + textSize;
  const endOuterY = outerRadius - outerRadius * Math.cos(angle + 2 * Math.PI / 12) + textSize;

  return {
    startX,
    startY,
    endX,
    endY,
    startOuterX,
    startOuterY,
    endOuterX,
    endOuterY,
  };
};

const SundialDiagram: React.FC<Props> = ({ data, radius }) => {

  const competencyCount = data.segments.length
  const segmentAngle = (2 * Math.PI) / competencyCount;
  const textOffset = 20;
  const textSize = 16;
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
      <circle cx={outerRadius  + textSize} cy={outerRadius  + textSize} r={radius} fill="#FFF" stroke="#CCC" />
      {Array.from({ length: competencyCount }).map((_, index) => {
        const startAngle = index * segmentAngle;
        const endAngle = (index + 1) * segmentAngle;

        // Inner circle
        const startX = radius + radius * Math.sin(startAngle) + textOffset + textSize;
        const startY = radius - radius * Math.cos(startAngle) + textOffset + textSize;

        const endX = radius + radius * Math.sin(endAngle) + textOffset + textSize;
        const endY = radius - radius * Math.cos(endAngle) + textOffset + textSize;

        // Outer circle
        const startOuterX = outerRadius + outerRadius * Math.sin(startAngle) + textSize;
        const startOuterY = outerRadius - outerRadius * Math.cos(startAngle) + textSize;

        const endOuterX = outerRadius + outerRadius * Math.sin(endAngle) + textSize;
        const endOuterY = outerRadius - outerRadius * Math.cos(endAngle) + textSize;


        const textPathId = `textPath-${index}`;

        return (
          <g key={index}>
            <path
              d={`M${radius + textOffset + textSize},${radius + textOffset + textSize } L${startX},${startY} A${radius},${radius} 0 0,1 ${endX},${endY} Z`}
              fill="#F2F2F2"
              stroke="#CCC"
            />
            <path fill="none" id={textPathId} d={`M${startOuterX},${startOuterY} A${outerRadius},${outerRadius} 0 0,1 ${endOuterX},${endOuterY}`} />
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
    </svg>
  );
};

export default SundialDiagram;
