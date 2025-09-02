// eslint-disable-next-line @typescript-eslint/no-var-requires
// const tailwindcss = require('tailwindcss');
// module.exports = {
// 	plugins: [tailwindcss, require('autoprefixer')],
// };

module.exports = {
	plugins: { 'tailwindcss/nesting': {}, tailwindcss: {} },
};
