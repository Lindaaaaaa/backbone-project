define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/ModalTemplate.html',
  'libs/backbone.modal',
  ], function($, _, Backbone, ModalTemplate, Modal){

    var person = {
      firstName: "",
      lastName: "",
      department: "",
      institution: "",
      building: "",
      workPhone: "",
      cellPhone: "",
      homePhone: "",
      fax: "",
      email: "",
      supervisor: "",
      role: ""
    };

    var PopupModal = Backbone.Modal.extend({
      template: _.template(ModalTemplate),
      cancelEl: '.cancel',
      submitEl: '.submit',

      initialize: function(options) {
        var elementTemplate = _.template(ModalTemplate);
        $(this.el).html(elementTemplate({
          model: this.model
        }));

        this.title = options.title;
        this.content = options.content;


        Backbone.pubSub.on('closeModal', this.close, this);
      },

      onRender: function() {
        var elements = this.el.children[0].children;

        /* add title */
        if (elements[0].children.length===0) {
          var title = document.createElement('h4');
          title.className = "bbm-modal__title";
          title.innerHTML = this.title;
          title.id = this.title.replace(/ /g, "-").toLowerCase();
          elements[0].appendChild(title);

          elements[1].appendChild(this.content.el);
        }
      },

      close: function(name) {
        if (this.title.replace(/ /g, "-").toLowerCase()==name) {
          this.destroyView();
        }
      },
      /*beforeSubmit and submit function are both get called when pressing submit button*/
      /*beforeSubmit checks all required fields for Add A Person sub form*/
      /*beforeSubmit also checks if the peron's role is Principal Investigator in Select Study Investigator*/
      beforeSubmit:function(){
        var isValid=true;
        if (this.model.get('name')=="add-a-person"){
          $(".requiredSubTwo").each(function(){
            if($(this).val()===''){
              isValid=false;
            }
          });
          if(!isValid){
            alert("Please fill in the required field");
          }
        }
        else if (this.model.get('name')=="select-study-investigator") {
          var role = document.getElementById('role').value;
          if (role=="Principal Investigator") {
          window.confirm("Only one Principal Investigator allowed.");
          isValid=false;
        }
      }
        return isValid;
      },

      submit: function(e) {
        if (this.model.get('name')=="add-a-person") {
          person.lastName = document.getElementById('last-name').value;
          person.firstName = document.getElementById('first-name').value;
          person.email = document.getElementById('email').value;
          person.workPhone = document.getElementById('work-phone').value;
          Backbone.pubSub.trigger('addInfo', person);
          delete Backbone.pubSub._events.addInfo;
        }
        else if (this.model.get('name')=="select-study-investigator") {
          var role = document.getElementById('role').value;

          if (role=="Principal Investigator") {
            document.getElementsByClassName(this.cancelEl.replace(".", ""))[0].click();
          }
          else {
            Backbone.pubSub.trigger('addPerson', role);
            delete Backbone.pubSub._events.addPerson;
          }
        }
        else if (this.model.get('name')=='add-grants') {
          Backbone.pubSub.trigger('addGrants', this);
        }
      },

      destroyView: function() {

        /* COMPLETELY UNBIND THE VIEW */
        this.undelegateEvents();

        this.$el.removeData().unbind();

        /* Remove view from DOM */
        this.remove();
        Backbone.View.prototype.remove.call(this);

      },

      validateForm:function(event){
        var isValid=true;
        $(".requiredSubTwo").each(function(){
          if($(this).val()===''){
            isValid=false;
          }
        });
        if(!isValid){
          alert("Please fill in the required field");
          return false;
        }
        else{
          return true;
        }
      },

    });

return PopupModal;

});
