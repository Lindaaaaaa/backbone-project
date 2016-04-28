define([
  'jquery',
  'underscore',
  'backbone',
  'models/Widget',
  'views/WidgetView',
  'views/Button',
  'text!templates/TableTemplate.html',
  ], function($, _, Backbone, Widget, WidgetView, Button, TableTemplate){

    var Table = WidgetView.extend({
      MIN: 7, /* minimum number of rows a table should have */
      selectedRow: "",

      people: [],

      initialize: function(options){
        var elementTemplate = _.template(TableTemplate);
        $(this.el).html(elementTemplate({
          model: this.model
        }));

        this.renderTable(this.model.get('text'));
        this.addButtons();

        /* event bus events */
        Backbone.pubSub.on('addPerson', function (role) {
          if (this.model.get('text')=='add-a-person' && this.selectedRow[0]) {
            var id = this.selectedRow[0].id;
            var person = "";

            for (var i=0; i<this.people.length; i++) {
              if (id==this.people[i].firstName + this.people[i].lastName) {
                person = this.people[i];
                break;
              }
            }

            if (person!=="") {
              var table = document.getElementById('select-study-investigator');
              var input = [role, person.lastName, person.firstName, person.email, person.workPhone];
              this.addRow(table, input);
              this.minRows(table);
            }
          }
        }, this);

        Backbone.pubSub.on('addInfo', function (person) {
          if (this.model.get('text')=='add-a-person') {
            this.people.push(person);

            var table = document.getElementById('add-a-person');
            var input = [person.lastName, person.firstName, person.department, person.email];
            var row = this.addRow(table, input);
            row.id = person.firstName + person.lastName;
            this.minRows(table);
          }
        }, this);

        Backbone.pubSub.on('addGrants', function (modal) {
          if (this.model.get('text')=='grants') {
            var divs = modal.el.children[0].children[1].children[0].children;

            var dropdown = divs[2].children[0].children[1].children[0];
            var type = dropdown.options[dropdown.selectedIndex].text;

            dropdown = divs[1].children[0].children[1].children[0];
            var source = dropdown.options[dropdown.selectedIndex].text;

            var title = divs[4].children[0].children[1].children[0].value;
            var number = divs[3].children[0].children[1].children[0].value;

            /* TODO - leader */
            var leader = "";

            var table = document.getElementById('grants');
            var input = [type, source, title, leader, number];
            this.addRow(table, input);
            this.minRows(table);
          }
        }, this);

        Backbone.pubSub.on('removeEntry', this.removeRow, this);

        WidgetView.prototype.initialize.apply(this, [options]);
      },

      renderTable: function(id) {
        var table = document.createElement('table');
        table.className='table';
        table.className+=' scrollit';
        table.id = id;

        var i, tr, td;
        for(i=0;i<this.model.get('info').length;i++){
          this.addRow(table, this.model.get('info')[i]);
        }

        this.minRows(table);
        this.el.firstChild.appendChild(table);
      },

      addButtons: function() {
        var obj =  {type: "button", text:'+', buttonType:'add'};
        var item = new Widget(obj);
        var button = new Button ({
          model: item
        });

        this.el.children[1].appendChild(button.render().el);

        obj =  {type: "button", text:'-', buttonType:'remove'};
        item = new Widget(obj);
        button = new Button ({
          model: item
        });

        this.el.children[1].appendChild(button.render().el);
      },

      addRow: function(table, info) {

        /* delete blank rows */
        var i;
        var rows = table.rows;
        for (i=0; i<rows.length; i++) {
          var blank = true;
          for (var j=0; j<rows[i].children.length; j++) {
            if (table.rows[i].children[j].innerHTML!=="") {
              blank = false;
              break;
            }
          }

          if (blank) {
            table.deleteRow(i);
            i--;
          }
        }

        /* add row */
        tr = document.createElement('tr');

        /* j is how many columns there are */
        for (i = 0; i<info.length; i++) {
          td = document.createElement('td');
          if(info[i]=='checkbox'){
            var chkbox = document.createElement('input');
            chkbox.type = "checkbox";
            chkbox.className ="center";
            td.appendChild(chkbox);
          }
          else {
            var text = document.createTextNode(info[i]);
            td.appendChild(text);
          }

          tr.appendChild(td);
        }

        var that = this;
        /* add on click handler */
        tr.onclick = function(e) {
          $(".selected").removeClass();
          var row = $(e.target).parent();
          that.selectedRow = row;
          row[0].className += " selected";
        };

        table.appendChild(tr);

        return tr;
      },

      /* apply minimum number of rows */
      minRows: function(table) {
        while (table.rows.length<this.MIN) {
          tr = document.createElement('tr');

          for (i=0; i<table.rows[0].children.length; i++) {
            td = document.createElement('td');
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }
      },

      removeRow: function(name) {
        if (this.model.get('name')==name && this.selectedRow!=="") {
          this.el.firstChild.firstChild.deleteRow(this.selectedRow.index());
          this.selectedRow = "";
        }
      }

    });

return Table;

});
