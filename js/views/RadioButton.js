define([
  'jquery',
  'underscore',
  'backbone',
  'views/WidgetView',
  'text!templates/RadioButtonTemplate.html'
  ], function($, _, Backbone, WidgetView, RadioButtonTemplate){

    var RadioButton = WidgetView.extend({
      initialize: function(options){
        _.bindAll(this, 'onRadioChange');

        var elementTemplate = _.template(RadioButtonTemplate);
        $(this.el).html(elementTemplate({
          model: this.model
        }));

        WidgetView.prototype.initialize.apply(this, [options]);
      },

      events: {
        "change .radio": "onRadioChange",
      },

      /* open or close hidden components on radio change */
      onRadioChange: function(e) {
        var yes = "." + e.target.name + "-yes";
        var no = "." + e.target.name + "-no";

/*        for (var i=0; i<$(yes).length; i++) {
          var classes = $(yes)[i].className.split(" ");

          for (var j=0; j<classes.length; j++) {
            var name = e.target.name + "-yes";

            if (classes[j].indexOf(name)>-1 && classes[j]!==name) {
              var check = classes[j].split("&");

              var change = true;
              for (var k=0; k<check.length; k++) {
                if (!$("#" + check[k]).checked) {
                  change = false;
                  break;
                }
              }

              if (change) {
                if (e.target.value=="Yes") {
                  if ($(yes).length && !$(yes).hasClass("show"))
                    $(yes).toggleClass("show");
                  if ($(no).length && $(no).hasClass("show"))
                    $(no).toggleClass("show");
                }
              }
            }
          }
        }*/

        if (e.target.value=="Yes") {
          if ($(yes).length && !$(yes).hasClass("show"))
            $(yes).toggleClass("show");
          if ($(no).length && $(no).hasClass("show"))
            $(no).toggleClass("show");
        }
        else if (e.target.value=="No") {
          if ($(yes).length && $(yes).hasClass("show"))
            $(yes).toggleClass("show");
          if ($(no).length && !$(no).hasClass("show"))
            $(no).toggleClass("show");
        }
      },
    });

return RadioButton;

});
