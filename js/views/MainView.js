define([
  'jquery',
  'underscore',
  'backbone',
  'collections/Main',
  'models/Question',
  'views/QuestionView',
  ], function($, _, Backbone, Main, Question, QuestionView){

    var MainView = Backbone.View.extend ({
      tagName: "ol",
      type: "1",

      /* initialize by creating new Main collection and setting the type of ol */
      initialize: function(input) {
        _.bindAll(this, 'render', 'renderQuestion');

        var main = new Main();
        _(this.collection).each( function (item) {
          var quest = new Question({
            collection: item.content,
            name: item.name,
            hidden: item.hidden,
          });
          main.add(quest);
        }, this);
        this.collection = main;

        this.el.type = input.type; /* set the type of ol: "1", "a", "A"...etc. */
      },

      /* create new question view for each question and render each */
      render: function() {
        this.$el.find("div").remove();

        _.each(this.collection.models, function (item) { /* create new question view for each question */
          this.renderQuestion(item);
        }, this);

        return this;
      },

      /* render by creating new question view for the given question */
      renderQuestion: function (item) {
        var questView = new QuestionView ({ /* create new question view */
          model: item
        });
        this.$el.append(questView.render().$el); /* append question view */
        return this;
      },

    });

return MainView;

});
