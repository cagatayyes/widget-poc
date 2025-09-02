import React from 'react';

export interface IButtonProps extends React.ComponentProps<'button'> {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    title?: string
    variant?: ButtonVariant
    label?: string | React.ReactNode
    className?: string
    iconName?: string
    disabled?: boolean
    colorType?: ColorType
    iconPosition?: IconPosition
    iconColor?: string
    iconSize?: string
    iconSpacing?: React.ComponentProps<'svg'>['className']
    loading?: boolean
    disableLabelStyles?: boolean
    dataTestId?: string;
    iconVisible?: boolean;
    imageName?: string;
    imageSize?: number;
    imageLabel?: string;
    noStyle?: boolean;
    labelStyle?: string;
}

export enum IconPosition {
    Left = 'left',
    Right = 'right'
}

export enum ButtonVariant {
    Yellow = 'Yellow',
    Gray = 'Gray',
    Green = 'Green',
    Blue = 'Blue',
    Dark = 'Dark',
    White = 'White'
}

export enum ColorType {
    Outlined = 'Outlined',
    Fullfilled = 'Fullfilled',
    Link = 'Link'
}

export interface IButtonColorMap {
    [colorPalette: string]: IColorPaletteProperties
}

interface IColorPaletteProperties {
    border: string
    background: string
    text: string
    textWithoutIcon: string
    textWithIcon: string
}
