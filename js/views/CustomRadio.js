define([
  'jquery',
  'underscore',
  'backbone',
  'views/WidgetView',
  'text!templates/CustomRadioTemplate.html'
  ], function($, _, Backbone, WidgetView, CustomRadioTemplate){

    var CustomRadio = WidgetView.extend({
      initialize: function(options){

        var elementTemplate = _.template(CustomRadioTemplate);
        $(this.el).html(elementTemplate({
          model: this.model
        }));

        for (var i=0; i<this.model.get('info').length; i++) {
          var name = this.model.get('info')[i];

          var input = document.createElement('input');
          input.type = 'radio';
          input.id = name;
          input.value = name;
          input.name = this.model.get('name');
          this.$el.append(input);

          var label = document.createElement('label');
          label.setAttribute('for', name);
          label.innerHTML = name;
          this.$el.append(label);
        }

        WidgetView.prototype.initialize.apply(this, [options]);
      },
    });

return CustomRadio;

});
