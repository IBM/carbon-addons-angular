import "./polyfills.js";
import theme from './theme';

import { configure } from "@storybook/angular";
import { setOptions } from '@storybook/addon-options';

setOptions({
	name: "Carbon Addons Angular",
	url: "https://github.com/IBM/carbon-addons-angular",
	theme
});

// load global styles
require("!style-loader!css-loader!postcss-loader!sass-loader!./preview.scss");

require("../src/index.stories");
// automatically import all files ending in *.stories.ts
const req = require.context("../src", true, /.stories.ts$/);

function loadStories() {
	req.keys()
		.sort((path1, path2) => path1.split("/").slice(-1)[0] > path2.split("/").slice(-1)[0] ? 1 : -1)
		.forEach(filename => {
			if (!filename.includes("index")) {
				req(filename);
			}
		});
}

configure(loadStories, module);
