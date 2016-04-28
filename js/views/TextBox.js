define([
  'jquery',
  'underscore',
  'backbone',
  'views/WidgetView',
  'text!templates/TextBoxTemplate.html'
  ], function($, _, Backbone, WidgetView, TextBoxTemplate){

    var TextBox = WidgetView.extend({
      initialize: function(options){
        this.model.attributes.id = this.model.get('text').replace(/ /g, "-").toLowerCase();
        var elementTemplate = _.template(TextBoxTemplate);
        $(this.el).html(elementTemplate({
          model: this.model
        }));

        WidgetView.prototype.initialize.apply(this, [options]);
      },

    });

    return TextBox;

  });
