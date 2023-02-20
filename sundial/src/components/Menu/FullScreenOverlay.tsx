import React, { useState, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { DialDto } from '../../dto/Dial';
import Logo from './Logo';

type FullScreenOverlayProps = {
  textSize?: number;
  onSave: () => void;
	onLoad: (dial: DialDto) => void;
	onNew: () => void;
};

const FullScreenOverlay = ({ textSize = 32, onSave, onLoad, onNew }: FullScreenOverlayProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [showMenu, setShowMenu] = useState<boolean>(true);

  const handleNewSundialClick = () => {
    setShowMenu(false);
		onNew();
  };

	const handleOpenClick = () => {
		if (inputFile.current)
			inputFile.current.click();
	}
	
	const handleFileOpen = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files)
		{
		const file = event.target.files[0];
		if (file.type !== 'application/json') {
      alert('Wrong file type!');
      return;
    }
		const reader = new FileReader();
		reader.onload = (event) => {
			if (event.target){
				const content = event.target.result as string;
				const dial = JSON.parse(content) as DialDto;
				onLoad(dial);
				setShowMenu(false);
			}
		};
		reader.readAsText(file);
	}
	};
	

  const nodeRef = useRef(null);
	const inputFile = useRef<HTMLInputElement | null>(null);

  return (
		<Transition 
			nodeRef={nodeRef} 
			in={showMenu} 
			timeout={300}
			//unmountOnExit
			appear
		>
			{(state) => (
			<div
				style={{
					backgroundColor: 'black',
					width: '100vw',
					height: '100vh',
					position: 'fixed',
					top: 0,
					left: 0,
					zIndex: 999,
					transform: `translate(${state === 'entered' ? 0 : '-40%'}) 
											scale(${state === 'entered' ? 1 : 0.2}, 1)`,
          transition: 'transform 300ms ease-in-out',
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '40%',
						transform: `translate(-50%, -50%) scale(${
							state === 'entered' ? 1 : 5
						}, 1)`,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Logo />
					<ul style={{ listStyleType: 'none', padding: 0 }}>
						<li
							style={{ marginBottom: '16px' }}
							onMouseOver={() => setSelectedItem('NewSundial')}
							onMouseOut={() => setSelectedItem(null)}
							onClick={handleNewSundialClick}
						>
							<a
								href="#"
								style={{
									color: 'white',
									textDecoration:
										selectedItem === 'NewSundial' ? 'underline' : 'none',
									fontSize: `${textSize}px`,
								}}
							>
								New <span style={{fontStyle: 'italic'}}>Sundial</span> Diagram
							</a>
						</li>
						<input
							type="file"
							id="fileInput"
							style={{ display: "none" }}
							ref={inputFile}
							onChange={handleFileOpen}
						/>
						<li
							style={{ marginBottom: '16px' }}
							onMouseOver={() => setSelectedItem('Load')}
							onMouseOut={() => setSelectedItem(null)}
							onClick={handleOpenClick}
						>
							<a
								href="#"
								style={{
									color: 'white',
									textDecoration: selectedItem === 'Load' ? 'underline' : 'none',
									fontSize: `${textSize}px`,
								}}
							>
								Load
							</a>
						</li>
						<li
							style={{ marginBottom: '16px' }}
							onMouseOver={() => setSelectedItem('Save')}
							onMouseOut={() => setSelectedItem(null)}
							onClick={onSave}
						>
							<a
								href="#"
								style={{
									color: 'white',
									textDecoration: selectedItem === 'Save' ? 'underline' : 'none',
									fontSize: `${textSize}px`,
								}}
							>
								Save
							</a>
						</li>
						<li
							style={{ marginBottom: '16px' }}
							onMouseOver={() => setSelectedItem('Export')}
							onMouseOut={() => setSelectedItem(null)}
						>
							<a
								href="#"
								style={{
									color: 'white',
									textDecoration:
										selectedItem === 'Export' ? 'underline' : 'none',
									fontSize: `${textSize}px`,
								}}
							>
								Export to PDF
							</a>
						</li>
					</ul>
				</div>
			</div>)}
		</Transition>
  );
};

export default FullScreenOverlay;
