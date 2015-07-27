var multiline = require('multiline');
module.exports = {
  getJsContent: function getJsContent() {
    return (multiline(function() {
      /*
	//FIXME: isolate this fn
	function coolFn (name) {
		//TODO:  move the string to a constant
		return 'Hello ' + name;
	}

	// CUSTOM_JS_TAG: that's how we roll!
	coolFn();
    */}));
  },

  getCssContent: function getCssContent() {
    return (multiline(function() {
      /*
	\%sFIXME: body tag is too generic%s/
	body {
		\%sTODO: this color should be different%s/
		color: #bada55;
	}

	html {
		\%sCUSTOM_TAG: this doesn't belong here%s/
		font-size: 12px;
	}
     */
    }));
  },

  getHbsContent: function getHbsContent() {
    return (multiline(function() {
      /*
	{{!-- FIXME: surround with span tags --}}
	hello {{name}}
	{{!-- TODO: add fancy css classes --}}

	{{!-- CUSTOM_HBS_TAG: just checkin --}}
     */
    }));
  }

};
