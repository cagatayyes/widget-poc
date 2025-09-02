export interface INavigationMenuProps {
    classNames?: string;
    arrowIcon?: string
    width: number;
    height: number;
    labelClassName: string;
    imageIconClassName?: string;
    arrowIconClassName?: string;
    navigationMenuList: INavigationList[];
}

export interface INavigationList {
    imgIcon: string;
    label: string;
    pathname?: string | null;
}

export type INavigationProps = {
    options: INavigationMenuProps;
    classNames?: string;
    handleTabClick?:(pathName: string) => void
    activeTab?: string;
}

export interface INavigationItemProps {
    imgIcon: string;
    label: string;
    pathname: string;
    classNames?: string;
    arrowIcon?: string;
    width: number;
    height: number;
    labelClassName: string;
    imageIconClassName?: string;
    arrowIcnClassName?:string;
    handleTabClick?: (pathName: string) => void;
    isActive?: boolean;
}

export interface INavigationTriggerProps {
    handleTabClick: (pathName: string) => void;
    activeTab: string;
    maxWidth?:string;
}
