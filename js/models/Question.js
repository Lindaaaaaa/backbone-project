define([
    'jquery',
    'underscore',
    'backbone',
    'collections/WidgetCollection'
    ], function($, _, Backbone, WidgetCollection){

        var Question = Backbone.Model.extend({
            defaults: {
                hidden: false,
                name: "",
                collection: WidgetCollection
            }
        });

        return Question;

    });
