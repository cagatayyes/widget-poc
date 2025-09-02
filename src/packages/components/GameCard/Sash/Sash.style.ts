import tw from 'tailwind-styled-components';

export const SashContainer = tw.div`
  flex
  justify-center
  items-center
  px-[4px]
  w-fit
  h-[14px]
  rounded-[11px]
  top-[3px]
  right-[3px]
  outline
  outline-[0.5px]
  outline-[#00000066]
  drop-shadow-sash
`;

export const SashIconContainer = tw.span`
  flex
  text-[12px]
  text-[#ffffff]
  mr-[1px]
`;

export const SashTitleContainer = tw.span`
  flex
  text-[#ffffff]
  text-[10px]
  font-semibold
`;
