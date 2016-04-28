define([
  'jquery',
  'underscore',
  'backbone',
  'views/WidgetView',
  'text!templates/MultipleFilesTemplate.html'
  ], function($, _, Backbone, WidgetView, MultipleFilesTemplate){

    var MultipleFiles = WidgetView.extend({
      initialize: function(options){

        var elementTemplate = _.template(MultipleFilesTemplate);
        $(this.el).html(elementTemplate({
          model: this.model
        }));

        WidgetView.prototype.initialize.apply(this, [options]);
      },

      events: {
        "change .multiple-files": "showFile",
      },

      /* show what files have been uploaded */
      /* TODO - store files */
      showFile: function(e) {
        if (!e.target.files)
          return;

        var files = e.target.files;
        for (var i=0; i<files.length; i++) {
          var f = files[i];
          var table = document.getElementById(e.target.name + "-table");

          var row = document.createElement('tr');
          var cell = document.createElement('td');
          cell.innerHTML = f.name;
          row.appendChild(cell);
          table.appendChild(row);
        }
      },
    });

return MultipleFiles;

});
