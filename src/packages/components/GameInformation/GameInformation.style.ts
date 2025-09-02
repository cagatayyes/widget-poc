import { StyledComponent } from 'casino/components/shared/StyledComponent';
import tw from 'tailwind-styled-components';

export const Container: StyledComponent = tw.div`
flex
flex-col
w-full
h-fit
max-w-screen-sm
bg-[var(--main-bg-color)]
`;

export const MainContent: StyledComponent = tw.div`
flex 
flex-col
w-[90%]
justify-center
m-[10px]
`;

export const Content: StyledComponent = tw.div`
flex 
flex-col
w-full
justify-center
`;

export const ContentRow: StyledComponent = tw.div`
flex
flex-row
leading-[22px]
text-[#FFFFFF]
text-[13px]
`;

export const HorizontalLine: StyledComponent = tw.hr`
w-full 
border-b-[1px] 
broder-b-[#ffffff] 
opacity-[0.1]
m-[5px]
`;

