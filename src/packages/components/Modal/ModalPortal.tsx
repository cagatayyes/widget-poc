import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalPlacement, IModalProps } from 'casino/components/Modal/Modal.type';
import { StyledComponent } from 'casino/components/shared/StyledComponent';
import tw from 'tailwind-styled-components';

export const ModalPortal: React.FC<IModalProps> = ({
	children,
	show = false,
	placement = ModalPlacement.CENTER,
	overideContainerStyles,
	onClose
}: IModalProps) => {
	const [wrapper, setWrapper] = useState<HTMLDivElement>();
	const [backdropPlacement, setBackdropPlacement] = useState<number>(0);

	useEffect((): (() => void) | void => {
		if (typeof window === 'undefined') return;

		const div: HTMLDivElement = document.createElement('div');
		div.id = 'casino-modal-container';
		div.className = '';
		document.body.appendChild(div);
		setWrapper(div);

		return () => document.body.removeChild(div);
	}, []);

	useEffect(() => {
		if (show) {
			setBackdropPlacement(document.documentElement.scrollTop);
			document.body.style.overflow = 'hidden';
			document.body.style.touchAction = 'none';
		} else {
			document.body.removeAttribute('style');
			onClose?.();
		}

		return () => {
			document.body.removeAttribute('style');
		};
	}, [show]);

	if (!wrapper) return null;

	return createPortal(
		show && (
			<Container style={{ 'zIndex': '2222', 'top': backdropPlacement }}
				placement={placement}>
				<Backdrop />
				{/* override the height in classname */}
				<Content placement={placement}
					className={overideContainerStyles}>
					{children}
				</Content>
			</Container>
		),
		wrapper,
	);
};
export const Container: StyledComponent = tw.div`
${({ placement }: { placement?: ModalPlacement; }): string =>
		`absolute flex justify-center w-full z-2222 h-screen ${placement === ModalPlacement.BOTTOM ? 'items-end' : 'items-center'}`}`;

export const Content: StyledComponent = tw.div`${({ placement }: { placement?: ModalPlacement }): string =>
	placement === ModalPlacement.BOTTOM
		? 'relative w-full h-[50%] bg-[#FFFFFF] modal p-[15px] rounded'
		: 'relative bg-[#FFFFFF] modal p-[15px] rounded'}`;

export const Backdrop: StyledComponent = tw.div`
absolute
backdrop 
bg-[#000000]
left-0
opacity-50
top-1000
w-full
h-[100%]
`;
