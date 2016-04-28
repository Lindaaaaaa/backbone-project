define([
	'jquery',
	'underscore',
	'backbone',
	'models/Question'
	], function($, _, Backbone, Question){

		var Main = Backbone.Collection.extend({
			model : Question,
		});

		return Main;

	});
