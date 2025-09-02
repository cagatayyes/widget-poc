import { FC } from 'react';
import classNames from 'classnames';
import { ButtonsColorMap } from './ButtonColorMap';
import { ButtonVariant, ColorType, IButtonProps, IconPosition } from './Button.types';
import React from 'react';

export const Button: FC<IButtonProps> = (props: IButtonProps) => {
	const {
		label,
		variant = ButtonVariant.Yellow,
		className = '',
		onClick,
		title,
		iconName,
		loading = false,
		disabled = loading || false,
		colorType = ColorType.Fullfilled,
		iconPosition = IconPosition.Left,
		iconSpacing,
		disableLabelStyles = false,
		dataTestId,
		imageName,
		imageSize,
		imageLabel,
		noStyle = false,
		labelStyle,
	} = props;

	const getLabel = (): React.JSX.Element => {
		if (label) {
			return disableLabelStyles ? (
				<>{label}</>
			) : (
				<span
					className={classNames('flex', {
						'pl-[6px]':
                            !!iconName &&
                            iconPosition === IconPosition.Left &&
                            colorType === ColorType.Outlined,
						'pr-[6px]':
                            !!iconName &&
                            iconPosition === IconPosition.Right &&
                            colorType === ColorType.Outlined,
						'pl-[10px]':
                            !!iconName &&
                            iconPosition === IconPosition.Left &&
                            colorType === ColorType.Fullfilled,
						'pr-[10px]':
                            !!iconName &&
                            iconPosition === IconPosition.Right &&
                            colorType === ColorType.Fullfilled
					},
					labelStyle
					)}
				>
					<>{label}</>
				</span>
			);
		}

		return <></>;
	};
	const getFormattedLabel = (): React.JSX.Element => {
		const labelName: React.JSX.Element = getLabel();


		if (imageName) {
			return (
				<>
					{iconPosition === IconPosition.Left && getLabel()}
					<img
						src={imageName}
						width={imageSize}
						height={imageSize}
						alt={imageLabel ?? 'image'}
						className={classNames('box-content', iconSpacing, {
							'p-[3.5px]': !iconSpacing,
						})}
					/>
					{iconPosition === IconPosition.Right && getLabel()}
				</>
			);
		}

		return labelName;
	};

	const getLoader = (): React.JSX.Element => (
		<span className="w-[20px] h-[20px] border-[2px] border-[#0d1335] opacity-50 rounded-circle border-l-transparent animate-spin"></span>
	);

	const getbuttonStyles = (): string => {
		return classNames(
			'border-[1px] text-sm tracking-[-0.2px] h-[40px] rounded-[4px] font-bold flex justify-center items-center transition-colors',
			className,
			{
				'px-[18px]': !iconName,
				'px-[35px]': !!iconName && colorType === ColorType.Outlined,
				'pl-[18px] pr-[18px]': !!iconName && colorType === ColorType.Fullfilled,
				/**
                 * Outlined Color with disable state
                 */
				'opacity-[0.3]': colorType === ColorType.Outlined && disabled,
				/**
                 * Fullfilled Color with disable state
                 */
				'disabled:bg-[#E2E2E2] disabled:text-[#979797] disabled:border-[#E2E2E2]':
                    colorType === ColorType.Fullfilled && disabled,
				/**
                 * Conditional color options
                 * You can use this approach to implement conditional css
                 */
				[`border-[${ButtonsColorMap[variant].border}] !bg-[${ButtonsColorMap[variant].background}]
				text-[${ButtonsColorMap[variant].text}]`]: colorType === ColorType.Fullfilled,
				[`border-solid border-[${ButtonsColorMap[variant].border}]`]: colorType === ColorType.Outlined,
				[`text-[${ButtonsColorMap[variant].textWithIcon}]`]:
                    !iconName && colorType === ColorType.Outlined,
				[`text-[${ButtonsColorMap[variant].textWithoutIcon}]`]:
                    !!iconName && colorType === ColorType.Outlined,
				[`text-[${ButtonsColorMap[variant].textWithoutIcon}] border-none`]:
                    colorType === ColorType.Link,
			},
		);
	};

	return (
		<button
			className={!noStyle ? getbuttonStyles() : classNames(className, 'outline-none')}
			disabled={disabled || loading}
			onClick={onClick}
			title={title}
			data-testid={dataTestId}
		>
			{loading ? getLoader() : getFormattedLabel()}
		</button>
	);
};
