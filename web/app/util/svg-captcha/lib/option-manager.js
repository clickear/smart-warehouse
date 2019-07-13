/*
 modification:
 1. BUG-FIX#01: 默认字体格式替换 2017/2/20 yangyong
 */

'use strict';
const path = require('path');
const opentype = require('opentype.js');
const charPreset = require('./char-preset');

//BUG-FIX#01
const fontPath = path.join(__dirname, '../fonts/times.ttf');
// end for BUG-FIX#01
const font = opentype.loadSync(fontPath);
const ascender = font.ascender;
const descender = font.descender;

const options = {
	width: 150,
	height: 50,
	noise: 1,
	color: false,
	background: '',
	size: 4,
	ignoreChars: '',
	fontSize: 56,
	charPreset, font, ascender, descender
};

const loadFont = filepath => {
	const font = opentype.loadSync(filepath);
	options.font = font;
	options.ascender = font.ascender;
	options.descender = font.descender;
};

module.exports = {
	options, loadFont
};
