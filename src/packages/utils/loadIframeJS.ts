export const loadIFrameJS = (): (() => void) => {
	const scriptSrc = `${process.env.REACT_APP_IFRAME_URL}`;
	const script = document.createElement('script');
	script.src = scriptSrc;
	script.async = true;

	document.head.appendChild(script);

	return () => {
		document.head.removeChild(script);
	};
};

export const removeIFrameJS = (): void => {
	const scriptSrc = `${process.env.REACT_APP_IFRAME_URL}`;
	const script = document.querySelector(`script[src="${scriptSrc}"]`);
	script?.parentNode?.removeChild(script);
};

export const addMetaAndStyles = (): (() => void) => {
	const viewportMeta = document.createElement('meta');
	viewportMeta.name = 'viewport';
	viewportMeta.content = 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1';
	document.head.appendChild(viewportMeta);

	const appleMobileMeta = document.createElement('meta');
	appleMobileMeta.name = 'apple-mobile-web-app-capable';
	appleMobileMeta.content = 'yes';
	document.head.appendChild(appleMobileMeta);

	const charsetMeta = document.createElement('meta');
	charsetMeta.setAttribute('charset', 'utf-8');
	document.head.appendChild(charsetMeta);

	const style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = `
  		  html,body {
  		      margin: 0;
  		      padding: 0;
  		      height: 100%;
  		      width: 100%;
  		  }
  		  iframe {
  		      padding: 0;
  		      margin: 0;
  		      border: none;
  		  }
  		`;
	document.head.appendChild(style);

	return () => {
		document.head.removeChild(viewportMeta);
		document.head.removeChild(appleMobileMeta);
		document.head.removeChild(charsetMeta);
		document.head.removeChild(style);
	};
};
