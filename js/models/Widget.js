define([
    'jquery',
    'underscore',
    'backbone',
    'collections/Main'
    ], function($, _, Backbone, Main){

        var Widget = Backbone.Model.extend ({
            model: Main,

            defaults: {
                text: "",
                name: "",
                type: "",
                info: [],
                nestedQs: [],
                buttonType: "",
                hidden: false
            }
        });

        return Widget;

    });
