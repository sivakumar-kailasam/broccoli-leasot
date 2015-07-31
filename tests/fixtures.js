const jsMarkers = [
	'FIXME isolate this fn',
	'TODO move the string to a constant',
	` CUSTOM_TAG that's how we roll!`
];

const cssMarkers = [
	'FIXME body tag is too generic',
	' TODO this color should be different ',
	'CUSTOM_TAG this doesnt belong here '

];

const hbsMarkers = [
	'FIXME surround with span tags ',
	'TODO add fancy css classes',
	'CUSTOM_TAG just checkin'
];

module.exports = {
	
	jsMarkers,
	cssMarkers,
	hbsMarkers,

	getJsContent() {
		return [
			`//${jsMarkers[0]}`,
			'	function coolFn (name) {',
			`// ${jsMarkers[1]}`,
			'		return \'Hello\'  name;',
			'	}',
			`// ${jsMarkers[2]}`,
			'	coolFn();'
		].join('\n');
	},

	getCssContent() {
		return [
			`/* ${cssMarkers[0]}*/`,
			'	body {',
			`/* ${cssMarkers[1]}*/`,
			'		color: #bada55;',
			'	}',
			'	html {',
			`/* ${cssMarkers[2]}*/`,
			'		font-size: 12px;',
			'	}'
		].join('\n');
	},

	getHbsContent() {
		return [
			`{{!-- ${hbsMarkers[0]} --}}`,
			'hello {{name}}',
			`{{!-- ${hbsMarkers[1]} --}}`,
			`{{!-- ${hbsMarkers[2]} --}}`
		].join('\n');
	}

};