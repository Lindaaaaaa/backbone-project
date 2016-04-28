define([
  'jquery',
  'underscore',
  'backbone',
  'views/WidgetView',
  'text!templates/CalendarTemplate.html',
  'jquery-ui-1.11.4/jquery-ui',
  ], function($, _, Backbone, WidgetView, CalendarTemplate, UI){

    var Calendar = WidgetView.extend({
      initialize: function(options){
        _.bindAll(this, 'showCalendar');

        var elementTemplate = _.template(CalendarTemplate);
        $(this.el).html(elementTemplate({
          model: this.model
        }));

        WidgetView.prototype.initialize.apply(this, [options]);
      },

      events: {
        'click .calendar':'showCalendar',
      },

      /* show calendar on click */
      showCalendar:function(e){
        var mytarget=e.target.className;
        $("."+mytarget).datepicker().datepicker("show");
      },
    });

    return Calendar;

  });
