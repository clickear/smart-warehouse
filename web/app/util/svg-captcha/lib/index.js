/*
 modification:
 1. BUG-FIX#01: 重写干扰线绘制方法，干扰线间隔均匀 2017/2/20 yangyong
 */

'use strict';
const chToPath = require('./ch-to-path');
const random = require('./random');
const optionMngr = require('./option-manager');
const opts = optionMngr.options;

const getLineNoise = function (width, height, options) {
	const hasColor = options.color;
	const noiseLines = [];

	// BUG-FIX#01
	let unit = height / (options.noise + 1);
	let heights = [];
	for (var k = 0; k < options.noise; k++) {
		heights[k] = unit * (k + 1);
	}

	let starts = heights.slice(), ends = heights.slice(), mid1s = heights.slice(), mid2s = heights.slice();
	// 随机打乱顺序
	random.arr(starts);
	random.arr(ends);
	random.arr(mid1s);
	random.arr(mid2s);


	let i = -1;
	while (++i < options.noise) {
		const start = `${random.int(1, 21)} ${starts[i]}`;
		const end = `${random.int(width - 21, width - 1)} ${ends[i]}`;
		const mid1 = `${random.int((width / 2) - 21, (width / 2) + 21)} ${mid1s[i]}`;
		const mid2 = `${random.int((width / 2) - 21, (width / 2) + 21)} ${mid2s[i]}`;
		const color = hasColor ? random.color() : random.greyColor();
		noiseLines.push(`<path d="M${start} C${mid1},${mid2},${end}" stroke="${color}" fill="none"/>`);
	}

	// end for BUG-FIX#01

	return noiseLines;
};

const getText = function (text, width, height, options) {
	const len = text.length;
	const spacing = (width - 2) / (len + 1);
	let i = -1;
	const out = [];

	while (++i < len) {
		const x = spacing * (i + 1);
		const y = height / 2;
		const charPath = chToPath(text[i], Object.assign({x, y}, options));

		const color = options.color ?
			random.color(options.background) : random.greyColor(0, 4);
		out.push(`<path fill="${color}" d="${charPath}"/>`);
	}

	return out;
};

const createCaptcha = function (text, options) {
	text = text || random.captchaText();
	options = Object.assign({}, opts, options);
	const width = options.width;
	const height = options.height;
	const bg = options.background;
	if (bg) {
		options.color = true;
	}

	const bgRect = bg ?
		`<rect width="100%" height="100%" fill="${bg}"/>` : '';
	const paths =
		[].concat(getLineNoise(width, height, options))
			.concat(getText(text, width, height, options))
			.sort(() => Math.random() - 0.5)
			.join('');
	const start = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
	const xml = `${start}${bgRect}${paths}</svg>`;

	return xml;
};

const create = function (options) {
	const text = random.captchaText(options);
	const data = createCaptcha(text, options);

	return {text, data};
};

const createMathExpr = function (options) {
	const expr = random.mathExpr();
	const text = expr.text;
	const data = createCaptcha(expr.equation, options);

	return {text, data};
};

module.exports = createCaptcha;
module.exports.randomText = random.captchaText;
module.exports.create = create;
module.exports.createMathExpr = createMathExpr;
module.exports.options = opts;
module.exports.loadFont = optionMngr.loadFont;
