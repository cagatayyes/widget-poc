export interface IFrameIntegration {
    entry: string;
    entryEmbedded: string;
}

interface IEvolutionGamingConfig {
	url: string;
	topBar?: number;
	topBarLandscape?: number;
	topBarPortrait?: number;
	sideBarLandscape?: number;
  allowFullscreen?: boolean;
}

export interface IEvolutionGaming extends IEvolutionGamingConfig {
  authToken: string;
  iframeId: string;
  offset: number;
  exitFullScreen: () => void;
  getTopBarHeight: () => number;
  init: (e?: IEvolutionGamingConfig) => void;
  loadGame: (e: unknown) => void;
  on: (e: string, t: (arg: unknown) => void) => void;
  removeEventListeners: () => void;
}

export interface IFrameMessageEvent extends MessageEvent {
  data: {
    event: string;
    applicationType: string;
  };
}
