define([
  'jquery',
  'underscore',
  'backbone',
  'views/WidgetView',
  'text!templates/FileTemplate.html'
  ], function($, _, Backbone, WidgetView, FileTemplate){

    var File = WidgetView.extend({
      initialize: function(options){
        var elementTemplate = _.template(FileTemplate);
        $(this.el).html(elementTemplate({
          model: this.model
        }));

        WidgetView.prototype.initialize.apply(this, [options]);
      }
    });

    return File;

  });
