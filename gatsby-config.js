require("ts-node").register({
	compilerOptions: {
		module: "commonjs",
		target: "es2017",
	},
});

module.exports = {
	siteMetadata: {
		siteUrl: `https://www.pactoverde.mx`,
	},
	plugins: [
		"gatsby-plugin-sass",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-postcss",
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [`Barlow`, `Barlow\:100,300,500,700`],
				display: "swap",
			},
		},
		{
			resolve: `gatsby-plugin-google-gtag`,
			options: {
				// You can add multiple tracking ids and a pageview event will be fired for all of them.
				trackingIds: [
					"G-5XR85JP8B9", // Google Analytics / GA
				],
				// This object is used for configuration specific to this plugin
				pluginConfig: {
					// Puts tracking script in the head instead of the body
					head: true,
					// Setting this parameter is also optional
					respectDNT: true,
					// Avoids sending pageview hits from custom paths
					exclude: ["/preview/**", "/do-not-track/me/too/"],
				},
			},
		},
	],
};
