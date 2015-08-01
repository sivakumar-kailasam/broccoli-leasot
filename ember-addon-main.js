var path = require('path');
var BroccoliBuilder = require('broccoli').Builder;
var BroccoliLeasotFilter = require('./lib/index');
var chalk = require('chalk');
var forOwnFn = require('lodash/object').forOwn;

module.exports = {

	name: 'broccoli-leasot',

	included: function(app) {

		this._super.included.apply(this, arguments);

		var pathToApp = path.resolve(app.project.root, app.trees.app);

		var optionsForLeasot = {
			enabled: true
		};

		var optionsThatCanBeOverridden = ['enabled', 'kinds', 'extensions', 'groupBy', 'console'];

		if (typeof(app.options.markers) !== 'undefined') {
			forOwnFn(app.options.markers, function(value, key) {
				if (optionsThatCanBeOverridden.indexOf(key) !== -1) {
					optionsForLeasot[key] = value;
				} else {
					console.log('\n' + chalk.bgRed(key + ' is an unknown option for broccoli-leasot'));
				}
			});
		}

		console.log('\n');

		new BroccoliBuilder(
			new BroccoliLeasotFilter(
				pathToApp,
				optionsForLeasot
			)
		).build();

	}

};