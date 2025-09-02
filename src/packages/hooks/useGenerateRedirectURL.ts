
export const useGenerateRedirectURL = (): { redirectURL: string } => {
	const redirectURL = window.location.pathname;

	return { redirectURL };
};
