/* eslint-disable no-mixed-spaces-and-tabs */
import { StyledComponent } from 'casino/components/shared/StyledComponent';
import tw from 'tailwind-styled-components';
import { Button } from 'casino/components/Button/Button';
import { IButtonProps } from 'casino/components/Button/Button.types';
import { ModalPortal } from './ModalPortal';
import { ModalPlacement, IModalProps } from 'casino/components/Modal/Modal.type';
import React, { useEffect } from 'react';

export const Modal = ({
	show,
	title,
	children,
	actions,
	placement,
	overideContainerStyles,
	onClose,
	hasCloseButton
}: IModalProps): React.JSX.Element => {
	const [showModal, setShowModal] = React.useState<boolean>(show);

	const actionButtons: React.JSX.Element[] | null =
        (actions && actions.map((action: IButtonProps, index: number) => <Button data-testid={`modal-action-button-${index}`}
        	{...action}
        	key={index} />)) || null;

	useEffect(() => {
		setShowModal(show);
	}, [show]);

	const handleCloseIconClick = (): void => {
		setShowModal(false);
	};

	return (
		<ModalPortal show={showModal}
			placement={placement}
			overideContainerStyles={overideContainerStyles}
			onClose={onClose}
		>
			<Container placement={placement}
				data-testid="casino-modal-container">
				{hasCloseButton &&
					<span onClick={handleCloseIconClick}
						className="material-symbols-outlined absolute top-[5px] right-[5px] text-[#fff] cursor-pointer"
						style={{ fontSize: '20px' }}>
						close
					</span>}
				{title && <Title data-testid="casino-modal-title">{title}</Title>}
				<Content data-testid="casino-modal-content"
					placement={placement}>{children}</Content>
				<div className="flex justify-center">{actionButtons}</div>
			</Container>
		</ModalPortal>
	);
};

export const Content: StyledComponent = tw.div`${({ placement }: { placement?: ModalPlacement }): string =>
	placement === ModalPlacement.BOTTOM ? 'mb-[25px] overflow-y-auto overflow-x-hidden' : placement === ModalPlacement.IFRAME ? 'flex flex-col w-full h-full' : ''}`;
export const Container: StyledComponent = tw.div`${({ placement }: { placement?: ModalPlacement }): string =>
	placement === ModalPlacement.BOTTOM ? 'flex flex-col max-h-full' : placement === ModalPlacement.IFRAME ? 'flex flex-col w-full h-full' : ''}`;

const Title: StyledComponent = tw.h2`
font-medium
text-[18px]
tracking-[-0.22px]
mb-5
`;
