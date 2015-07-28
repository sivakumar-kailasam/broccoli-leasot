module.exports = {
  getJsContent() {
    return `//FIXME: isolate this fn
	function coolFn (name) {
		//TODO:  move the string to a constant
		return 'Hello ' + name;
	}

	// CUSTOM_JS_TAG: that's how we roll!
	coolFn();`;
  },

  getCssContent() {
    return `/* FIXME: body tag is too generic */
	body {
		/* TODO: this color should be different */
		color: #bada55;
	}

	html {
		/* CUSTOM_TAG: this doesn't belong here */
		font-size: 12px;
	}`;
  },

  getHbsContent() {
    return `{{!-- FIXME: surround with span tags --}}
	hello {{name}}
	{{!-- TODO: add fancy css classes --}}

	{{!-- CUSTOM_HBS_TAG: just checkin --}}`;
  }

};
