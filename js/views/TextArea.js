define([
  'jquery',
  'underscore',
  'backbone',
  'views/WidgetView',
  'text!templates/TextAreaTemplate.html'
  ], function($, _, Backbone, WidgetView, TextAreaTemplate){

    var TextArea = WidgetView.extend({
      initialize: function(options){
        var elementTemplate = _.template(TextAreaTemplate);
        $(this.el).html(elementTemplate({
          model: this.model
        }));

        var box = this;
        if ($.isNumeric(this.model.get('info')))
          $(this.$el.children()[0]).keydown( function(e) {
            box.setWordLimit(e, box.model.get('info'));
          });

        WidgetView.prototype.initialize.apply(this, [options]);
      },

      setWordLimit: function(e, limit) {
        var words = 0;
        /* if input is backspace or space */
        if (e.keyCode==8 || e.keyCode==32) {
          var matches = e.target.value.match(/\S+/g);
          words = matches.length;

          while (words>limit-1) {
            e.target.maxLength = e.target.value.length;
            e.target.value = e.target.value.substring(0, e.target.maxLength);
          }
        }
      },
    });

    return TextArea;

  });
