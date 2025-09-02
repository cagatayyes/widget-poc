import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { JSX } from 'react';
import { Button } from 'casino/components/Button/Button';

export interface ISearchProps extends React.ComponentProps<'input'> {
	placeholder?: string
	className?: string
	inputClassName?: string
	clearClassName?: string
	iconClassName?: string
	cancelClassName?: string
	value?: string
	cancelText?: string
	searchIconColor?: string
	clearIconColor?: string
	onChange?(e: React.ChangeEvent<HTMLInputElement> | string): void
	onCancel?(e: React.MouseEvent<HTMLButtonElement>): void
	onClear?(e?: React.MouseEvent<HTMLButtonElement>): void
}

const Search = ({
	placeholder,
	value,
	cancelText,
	className,
	iconClassName,
	inputClassName,
	cancelClassName,
	clearClassName,
	searchIconColor,
	clearIconColor,
	onChange,
	onCancel,
	onClear,
	...props
}: ISearchProps) : JSX.Element => {
	const inputRef:React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState<string>('');
	const [isFocus, setIsFocus] = useState<boolean>(false);

	const inputFocus = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) : void => {
		if ((event.target as HTMLDivElement)?.tagName !== 'BUTTON') {
			inputRef.current?.focus();
			setIsFocus(true);
		}
	};

	const clearValue = () : void => {
		onChange?.call(this, '');
		inputRef.current?.focus();
		onClear?.call(this);
		setInputValue('');
	};

	const handleChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
		onChange?.call(this, e.target.value);
		setInputValue(e.target.value);
	};

	return (
		<div
			className={classNames(
				`inline-flex relative flex-row p-[10px] items-center ${isFocus ? 'border-[#FFB800] bg-[#FFFFFF33] text-[#ffffff]': ''}`,
				className,
			)}
			onClick={inputFocus}
			onKeyDown={inputFocus}
		>
			<div
				className={classNames(
					'text-[#008751] mr-[5px] flex-grow-0 flex items-center',
					iconClassName,
				)}
			>
				<span
					className="w-[16px] h-[16px] material-symbols-outlined mt-[3px]"
					style={{ color: searchIconColor, fontSize:'16px' }}>
					search
				</span>
			</div>
			<div className="relative flex flex-1 items-center">
				<input
					ref={inputRef}
					value={inputValue}
					type="text"
					placeholder={placeholder}
					className={classNames(
						`bg-[transparent] outline-none w-full h-full text-[11px] pr-[24px] text-[11px] ${isFocus ? 'text-[#ffffff] ' : 'text-[#6C7086]'}`,
						inputClassName,
					)}
					onChange={(e) : void => {
						handleChange(e);
						setIsFocus(true);
					}}
					onBlur={() : void => {
						setIsFocus(false);
					}}
					{...props}
				/>
				{inputValue && <Button
					className={classNames(
						'absolute right-0 top-0 text-[#008751] transition-all flex items-center h-full',
						clearClassName,
						{
							'opacity-100': !!value,
						},
					)}
					onClick={clearValue}
					noStyle
					label={<span
						className="material-symbols-outlined w-[16px] h-[16px] mt-[3px] ml-[5px]"
						style={{ color: clearIconColor, fontSize: '12px' }}
					>
						close
					</span>}
				/>}
			</div>
			{cancelText && <div className="flex-grow-0 pl-[25px] pr-[6px] items-center flex">
				<Button
					name="cancel"
					className={classNames(
						'text-[#008751] text-[11px] font-medium font-[500]',
						cancelClassName,
					)}
					onClick={onCancel}
					noStyle
					label={<span
						className='material-symbols-outlined'
						style={{ fontSize: '16px' }}
					>close</span>}
				/>
			</div>
			}
		</div>
	);
};

export default Search;
