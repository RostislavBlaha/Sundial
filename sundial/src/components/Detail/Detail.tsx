import React, {useState} from "react";
import { AnnotationDto, DialDto } from "../../dto/Dial";
import SundialDiagram from "../SundialDiagram";


interface Props {
  dial: DialDto;
  setDial: (newdial: DialDto) => void;
}

const Detail: React.FC<Props> = ({dial, setDial}) => {
  const [annotations, setAnnotations] = useState(dial.annotations);

  const handleHeaderChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = (e.target as HTMLDivElement).innerText;
    setDial({...dial, name: newContent})
  };

  const handleAnnotationChange = (e: React.FormEvent<HTMLDivElement>, index: number) => {
    const updatedAnnotations = [...dial.annotations];
    updatedAnnotations[index].value = (e.target as HTMLDivElement).innerText;
    setDial({...dial, annotations: updatedAnnotations})
  };

  return (
    <div style={{ width: 'auto', paddingLeft:'20%', paddingTop:50 }}>
      <h1
        style={{ padding: '10px', outline: 'none'}}
        contentEditable
        onBlur={handleHeaderChange}
      >
        {dial.name}
      </h1>
      <table style={{width: '100%', marginBottom:'50px', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc'}}>
        <tbody>
        {dial.annotations.map((annotation: AnnotationDto, index) => (
          <>
            <td style={{ width: '1%', whiteSpace: 'nowrap', padding: '10px' }}>{annotation.label}</td>
            {index+1 === dial.annotations.length
              ? <td style={{ borderRight: 'none', padding: '10px', fontWeight:'bold' }}>
                  <div
                    contentEditable
                    onBlur={(e) => handleAnnotationChange(e, index)}
                  >
                    {annotation.value}
                  </div>
                </td>
              : <td style={{ borderRight: '1px solid #ccc', padding: '10px', fontWeight:'bold'}}>
                  <div
                    contentEditable
                    onBlur={(e) => handleAnnotationChange(e, index)}
                  >
                    {annotation.value}
                  </div>
                </td>
            }
          </>
        ))}
        </tbody>
      </table>
      <SundialDiagram data={dial} setData={setDial} radius={400} />
    </div>
  );
};

export default Detail;
