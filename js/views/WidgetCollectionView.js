define([
  'jquery',
  'underscore',
  'backbone',
  'collections/WidgetCollection',
  'models/Widget',
  'views/WidgetView',
  'views/PlainText',
  'views/Button',
  'views/TextArea',
  'views/TextBox',
  'views/RadioButton',
  'views/File',
  'views/Checkbox',
  'views/Dropdown',
  'views/CustomRadio',
  'views/MultipleFiles',
  'views/Calendar',
  'views/Table',
  ], function($, _, Backbone, WidgetCollection, Widget, WidgetView, PlainText, Button, TextArea, TextBox, RadioButton, File, Checkbox, Dropdown, CustomRadio, MultipleFiles, Calendar, Table){

    var WidgetCollectionView = Backbone.View.extend ({
      tagName: "li",

      /* initialize by creating new collection */
      initialize: function() {
        _.bindAll(this, 'render', 'renderWidget');
      },

      /* render by creating new widget view */
      render: function () {
        _.each(this.collection.models, function (item) { /* create new widget view for each widget */
            item = new Widget(item.attributes);
          this.renderWidget(item);
        }, this);

        return this;
      },

      /* render by creating new widget view for the given widget */
      renderWidget: function (item) {
        var w;
        switch (item.get('type')) {
          case "plainText":
          w = new PlainText ({
            model: item
          });
          break;
          case "button":
          w = new Button ({
            model: item
          });
          break;
          case "textArea":
          w = new TextArea ({
            model: item
          });
          break;
          case "textBox":
          w = new TextBox ({
            model: item
          });
          break;
          case "radioButton":
          w = new RadioButton ({
            model: item
          });
          break;
          case "file":
          w = new File ({
            model: item
          });
          break;
          case "checkbox":
          w = new Checkbox ({
            model: item
          });
          break;
          case "dropdown":
          w = new Dropdown ({
            model: item
          });
          break;
          case "customRadio":
          w = new CustomRadio ({
            model: item
          });
          break;
          case "multipleFiles":
          w = new MultipleFiles ({
            model: item
          });
          break;
          case "calendar":
          w = new Calendar ({
            model: item
          });
          break;
          case "table":
          w = new Table ({
            model: item
          });
          break;
          default:
          w = new WidgetView ({
            model: item
          });
          break;
        }
        this.$el.append(w.render().$el);

      return this;
    }
  });

return WidgetCollectionView;

});
