
import { IButtonProps } from 'casino/components/Button/Button.types';
import React from 'react';

export interface IModalProps {
    show: boolean;
    title?: string | React.JSX.Element;
    children?: React.JSX.Element | React.JSX.Element[] | string;
    placement?: ModalPlacement;
    actions?: IButtonProps[];
    overideContainerStyles?: string;
    onClose?: () => void;
    hasCloseButton?: boolean;
}

export enum ModalPlacement {
    CENTER = 'center',
    BOTTOM = 'bottom',
    IFRAME = 'full',
}
