import tw from 'tailwind-styled-components';

export const GameCardContainer = tw.div`
  flex
  flex-col
  w-[113px]
  h-[168px]
  bg-[#070C26]
  rounded-[8px]
  last-of-type:mr-[0]
`;

export const GameCardImageContainer = tw.div`
  flex
  flex-col
  relative
  items-center
  h-[147px]
`;

export const GameCardImage = tw.img`
  flex
  rounded-[8px]
  h-full
  w-full
`;

export const GameTitleContainer = tw.span`
	absolute
	bottom-[0px]
	flex
	flex-col
	text-[#F1F1F1]
	text-center
`;

export const TitleThin = tw.div`
  flex
  font-normal
  text-[20px]
  tracking-[-0.4px]
`;

export const TitleBold = tw.div`
  flex
  font-bold
  text-[25px]
  tracking-[-0.5px]
`;

export const GameCardInfoContainer = tw.div`
  flex
  flex-row
  justify-between
  items-center
  h-[24px]
  px-[6px]
`;

export const GameInfoTitle = tw.div`
  block
  font-bold
  text-[10px]
  text-[#4C5576]
  overflow-hidden
  whitespace-nowrap
  text-ellipsis
  w-[95px]
`;

export const GameInfoAmount = tw.div`
  flex
  font-bold
  text-[11px]
  text-[#E5206F]
`;

export const GameInfoIconContainer = tw.span`
  flex
  text-[14px]
  text-[#687090]
`;
