import React from "react";
import { SegmentDto } from "../dto/Dial";

interface Props {
  radius: number;
  outerRadius: number;
  startAngle: number;
  textOffset: number;
  textSize: number;
  segmentCount: number;
  segment: SegmentDto;
  index: number
}

const getTextPathStartAndEndPoints = (
    radius: number,
    angle: number,
    offset: number,
    segmentCount: number,
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

const Segment: React.FC<Props> = ({
  radius,
  startAngle,
  textOffset,
  textSize,
  segmentCount,
  outerRadius,
  segment,
  index
}) => {

    const textPathId = `textPath-${index}`;

    const innerCircle = getTextPathStartAndEndPoints(radius, startAngle, textOffset + textSize, segmentCount);

    const outerCircle = getTextPathStartAndEndPoints(outerRadius, startAngle, textSize, segmentCount);

  return (
    <g key={index}>
    <path
      d={`M${radius + textOffset + textSize},${radius + textOffset + textSize } L${innerCircle.startX},${innerCircle.startY} A${radius},${radius} 0 0,1 ${innerCircle.endX},${innerCircle.endY} Z`}
      fill="none"
      stroke="#CCC"
    />
                {index >= segmentCount/4 && index < 3*segmentCount/4 
                ? <path fill="none" id={textPathId} d={`M${outerCircle.endX},${outerCircle.endY} A${outerRadius},${outerRadius} 0 0,0 ${outerCircle.startX},${outerCircle.startY}`} />
                : <path fill="none" id={textPathId} d={`M${outerCircle.startX},${outerCircle.startY} A${outerRadius},${outerRadius} 0 0,1 ${outerCircle.endX},${outerCircle.endY}`} />
                }
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
        {segment.name}
      </textPath>
    </text>
  </g>
  );
};

export default Segment;
