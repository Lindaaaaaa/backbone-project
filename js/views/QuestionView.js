define([
  'jquery',
  'underscore',
  'backbone',
  'models/Question',
  'collections/WidgetCollection',
  'views/WidgetCollectionView'
  ], function($, _, Backbone, Question, WidgetCollection, WidgetCollectionView){

    var QuestionView = Backbone.View.extend ({
      tagName: "div",
      className: "question-link",

      /* initialize by adding classes */
      initialize: function() {
        _.bindAll(this, 'render');

        this.el.className += " " + this.model.get('name'); /* add class name */
        if (this.model.get('hidden'))
          this.el.className += " hidden"; /* hide div by adding hidden class */
      },

      /* render by creating new widget collection view */
      render: function () {
        this.$el.find("li").remove();

        if (this.model.get('collection')[0].hasOwnProperty('content')) {
          _.each(this.model.get('collection'), function (item) { /* create new widget view for each widget */
            item = new Question({
              collection: item.content,
              name: item.name,
              hidden: item.hidden
            });
            this.renderQuestion(item);
          }, this);
        }
        else {
          this.model.attributes.collection = new WidgetCollection(this.model.get('collection'));

          var wcv = new WidgetCollectionView ({ /* create new widget collection view */
            collection: this.model.get('collection'),
          });
          this.$el.append(wcv.render().$el); /* append widget collection view */
        }

        return this;
      },

      renderQuestion: function(item) {
        if (!QuestionView)
         QuestionView = require("views/QuestionView");

       var questView = new QuestionView ({ /* create new question view */
        model: item
      });
       this.$el.append(questView.render().$el); /* append question view */

       return this;
     }
   });

return QuestionView;

});
