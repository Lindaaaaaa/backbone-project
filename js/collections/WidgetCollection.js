define([
	'jquery',
	'underscore',
	'backbone',
	'models/Widget'
	], function($, _, Backbone, Widget){

		var WidgetCollection = Backbone.Collection.extend({
			model: Widget
		});

		return WidgetCollection;

	});
