define([
  'jquery',
  'underscore',
  'backbone',
  'views/WidgetView',
  'text!templates/DropdownTemplate.html'
  ], function($, _, Backbone, WidgetView, DropdownTemplate){

    var Dropdown = WidgetView.extend({
      initialize: function(options){
        _.bindAll(this, 'addOption');
        
        this.model.attributes.id = this.model.get('name').replace(/ /g, "-").toLowerCase();

        var elementTemplate = _.template(DropdownTemplate);
        $(this.el).html(elementTemplate({
          model: this.model
        }));

        for(var i=0; i<this.model.get('info').length; i++)
          this.el.children[0].appendChild(this.addOption(i));  /* add children to dropdown list*/

        WidgetView.prototype.initialize.apply(this, [options]);
      },

      /* add option to dropdown */
      addOption: function(i) {
        var op = document.createElement('option');
        op.value = this.model.get('info')[i];
        op.text = this.model.get('info')[i];
        return op;
      },

    });

    return Dropdown;

  });
