module.exports = {
	getJsContent() {
		return [
			'     //FIXME: isolate this fn',
			'	function coolFn (name) {',
			'		//TODO:  move the string to a constant',
			'		return \'Hello\'  name;',
			'	}',
			'	// CUSTOM_JS_TAG: that\'s how we roll!',
			'	coolFn();'
		].join('\n');
	},

	getCssContent() {
		return [
			'/* FIXME: body tag is too generic */',
			'	body {',
			'		/* TODO: this color should be different */',
			'		color: #bada55;',
			'	}',
			'	html {',
			'		/* CUSTOM_TAG: this doesnt belong here */',
			'		font-size: 12px;',
			'	}'
		].join('\n');
	},

	getHbsContent() {
		return [
			'{{!-- FIXME: surround with span tags --}}',
			'hello {{name}}',
			'{{!-- TODO: add fancy css classes --}}',
			'{{!-- CUSTOM_HBS_TAG: just checkin --}}'
		].join('\n');
	}

};
