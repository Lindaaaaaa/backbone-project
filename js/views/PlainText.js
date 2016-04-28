define([
  'jquery',
  'underscore',
  'backbone',
  'views/WidgetView',
  'text!templates/TextTemplate.html'
  ], function($, _, Backbone, WidgetView, TextTemplate){

    var PlainText = WidgetView.extend({
      initialize: function(options){
        var elementTemplate = _.template(TextTemplate);
        $(this.el).html(elementTemplate({
          model: this.model
        }));

        WidgetView.prototype.initialize.apply(this, [options]);
      }
    });

    return PlainText;

  });
