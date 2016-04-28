define([
  'jquery',
  'underscore',
  'backbone',
  'jqueryqtip',
  'models/Widget',
  'collections/Main',
  'views/MainView'
  ], function($, _, Backbone,jqueryqtip,Widget, Main, MainView){

    var WidgetView = Backbone.View.extend ({
      template: _.template(""),
      tagName: "div",
      className: "widgetDiv",

      /* initialize by setting templates and class name */
      initialize:function(){
        _.bindAll(this, 'render');

        this.el.className += " " + this.model.get('name'); /* set class name */
        if (this.model.get('hidden'))
          this.el.className += " hidden"; /* hide widget by adding hidden class */
      },

      /* render template and change inner components accordingly depending on widget type */
      render: function () {
        /* if there are nested questions */
        if (this.model.get('nestedQs') && this.model.get('nestedQs').length!==0) {
          if (!MainView)
           MainView = require("views/MainView");

         var mainView = new MainView ({ /* create new main view */
          collection: this.model.get('nestedQs'),
          type: this.model.get('type')
        });
         this.$el.append(mainView.render().$el);
       }

       return this;
     },
      events: {
     "mouseover .required":"showTip", 
     "mouseover .requiredSubTwo":"showTip", 

    },
    
  
  showTip:function(e){
    var tip=e.target.getAttribute('title');
  if(e.target.getAttribute('class')=="required"){
    $(".required").qtip({
      content:tip,
      show:{ready:true}
    })
  }
  else if (e.target.getAttribute('class')=="requiredSubTwo"){
      $(".requiredSubTwo").qtip({
      content:tip,
      show:{ready:true}
    })
  }
  },

  });

return WidgetView;

});
