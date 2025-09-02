import { INavigationMenuProps } from './Navigation.type';

export const FooterNavigationItems: (INavigationMenuProps) = {
	width: 16,
	height: 16,
	labelClassName: 'text-[11px]',
	navigationMenuList: [
		{
			imgIcon: 'play_circle',
			label: 'RESUME'
		},
		{
			imgIcon: 'tactic',
			label: 'OVERVIEW'
		},
		/*
		WE WILL ENABLE THIS TAB IN THE FUTURE DO NOT DELETE IT
		{
			imgIcon: 'chat_info',
			label: 'GAMEINFO'
		}, */
		{
			imgIcon: 'more_horiz',
			label: 'MORE'
		}
	]
};

export const OverviewMenuItems: (INavigationMenuProps) = {
	arrowIcon: 'arrow_right_alt',
	width: 20,
	height: 20,
	labelClassName: 'text-[12px] font-semibold pl-[5px]',
	imageIconClassName: '',
	arrowIconClassName: '',
	navigationMenuList: [
		{
			imgIcon: 'account_circle',
			label: 'Account',
			pathname: 'ACCOUNT'
		},
		{
			imgIcon: 'outbound',
			label: 'Withdraw',
			pathname: 'WITHDRAW'
		},
		{
			imgIcon: 'add_to_photos',
			label: 'Deposit',
			pathname: 'DEPOSIT'
		}
	]
};

export const MoreInformationItems: (INavigationMenuProps) = {
	arrowIcon: 'arrow_right_alt',
	width: 20,
	height: 20,
	labelClassName: 'text-[12px] font-semibold pl-[5px]',
	imageIconClassName: '',
	arrowIconClassName: '',
	navigationMenuList: [
		{
			imgIcon: 'shield_person',
			label: 'Safe Gambling',
			pathname: 'SAFE_GAMBLING'
		},
		{
			imgIcon: 'call_quality',
			label: 'Customer Support',
			pathname: 'CUSTOMER_SUPPORT'
		}
	]
};
