import React, { useState } from 'react';
import { Transition } from 'react-transition-group';
import Logo from './Logo';

type FullScreenOverlayProps = {
  textSize?: number;
};

const FullScreenOverlay = ({ textSize = 32 }: FullScreenOverlayProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [showMenu, setShowMenu] = useState<boolean>(true);

  const handleNewSundialClick = () => {
    setShowMenu(false);
  };

  const handleMenuClose = () => {
    setShowMenu(true);
  };

  return (
		<Transition in={showMenu} timeout={300}>
			<div
				style={{
					backgroundColor: 'black',
					width: '100vw',
					height: '100vh',
					position: 'fixed',
					top: 0,
					left: 0,
					zIndex: 999,
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '40%',
						transform: 'translate(-50%, -50%)',
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
								New Sundial
							</a>
						</li>
						<li
							style={{ marginBottom: '16px' }}
							onMouseOver={() => setSelectedItem('Load')}
							onMouseOut={() => setSelectedItem(null)}
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
			</div>
		</Transition>
  );
};

export default FullScreenOverlay;
