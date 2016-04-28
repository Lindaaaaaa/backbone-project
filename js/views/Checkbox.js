define([
	'jquery',
	'underscore',
	'backbone',
	'views/WidgetView',
	'text!templates/CheckboxTemplate.html'
	], function($, _, Backbone, WidgetView, CheckboxTemplate){

		var Checkbox = WidgetView.extend({
			initialize: function(options){
				_.bindAll(this, 'onCheck');

				var elementTemplate = _.template(CheckboxTemplate);
				$(this.el).html(elementTemplate({
					model: this.model
				}));

				for(var i=0; i<this.model.get('info').length; i++){
					var pair= this.model.get('info')[i];
					var checkbox= document.createElement('input');
					checkbox.className='cBox';
					checkbox.type = "checkbox";
					checkbox.name = this.model.get("name");
					checkbox.value = pair;

					var label=document.createElement('label');
					label.htmlFor = pair;
					label.appendChild(document.createTextNode(pair));

					this.el.appendChild(checkbox);
					this.el.appendChild(label);
					this.el.appendChild(document.createElement('br'));
				}

				WidgetView.prototype.initialize.apply(this, [options]);
			},

			events: {
				'click .cBox':'onCheck',
			},

			/* on checkbox click */
			onCheck:function(e){
				var mytarget="."+e.target.name+"_show";
				if($(mytarget)[0]){
					$(mytarget).toggleClass('show');
				}
			}
		});

return Checkbox;

});
