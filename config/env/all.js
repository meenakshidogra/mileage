'use strict';

module.exports = {
	app: {
		title: 'mileage',
		description: 'Record the fuel economy of your vehicles',
		keywords: 'fuel economy, mileage, miles per gallon, kilometers per hour, mpg, kmpl, km/l,ml/gal'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap-material-design/dist/css/roboto.min.css',
                'public/lib/bootstrap-material-design/dist/css/material.min.css',
                'public/lib/bootstrap-material-design/dist/css/ripples.min.css',
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/bootstrap-material-design/dist/js/material.min.js',
                'public/lib/bootstrap-material-design/dist/js/ripples.min.js',
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
