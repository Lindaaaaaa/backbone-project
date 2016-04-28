define([
  'jquery',
  'underscore',
  'backbone',
  'views/WidgetView',
  'text!templates/ButtonTemplate.html',
  'views/MainView',
  'views/Modal',
  'models/Widget'
  ], function($, _, Backbone, WidgetView, ButtonTemplate, MainView, Modal, Widget){

    var subOne=[

    {content: [
      {type: "plainText", text: "What is the person's role?"},
      {type:"dropdown", name: "role", info:["Principal Investigator","Faculty Supervisor","Research Personnel","SFU Collaborator","External Collaborator","Project Leader"]},
      {type:'checkbox',info:["Study Facilitator"]}
      ]
    },

    {content: [
      {type: "plainText", text: "Search for Last Name:"},
      {type:"textBox"},
      {type:"button",text:'select'},
      {type:"button",text:'NotListed?',buttonType:"add"},
      {type:'table', text: "add-a-person", info:[["Last Name","First Name","Department","Email"]]},
      ]
    },
    ];

    var subTwo=[
    {content: [
     {type:'dropDown',info:["Dr.","Mr.","Mrs.","Ms."]},
     {type:'plainText',text:"Position"},
     {type: "dropDown",info:["Faculty","Post-Doc","Graduate Student"]},
     {type: "textBox",text:"Last Name",required:'requiredSubTwo',title:"required"},
     {type: "textBox",text:"First Name",required:'requiredSubTwo',title:"required"},
     {type: "textBox",text:"Department"},
     {type: "textBox",text:"Institution"},
     {type: "textBox",text:"Building,or Site Name"},
     {type: "textBox",text:"Work Phone"},
     {type: "textBox",text:"Cell Phone"},
     {type: "textBox",text:"Home Phone"},
     {type: "textBox",text:"Fax"},
     {type: "textBox",text:"Email",required:'required',title:"required"},     
     {type: "textBox",text:"Supervisor"},
     {type: "button",text:'NotListed?',buttonType:"add"},
     ]
   },
   ];

   var subThree = [
   {content: [
    {type: "plainText", text: "Is this Grant Funded?"},
    {type:'checkbox',info:["Yes"]},
    ]
  },
  {content: [
    {type: "plainText", text: "Funding Source"},
    {type:'dropdown', name: "source", info: ["Actenum Corporation", "BC Cancer Agency"]},
    ]
  },
  {content: [
    {type: "plainText", text: "Funding Type"},
    {type:'dropdown', name: "source", info: ["Grants", "Contracts"]},
    ]
  },
  {content: [
    {type: "plainText", text: "Grant Number"},
    {type:'textBox'},
    ]
  },
  {content: [
    {type: "plainText", text: "Project Title"},
    {type:'textArea'},
    ]
  },
  {content: [
   {type: "plainText", text: "Is the PI of this Ethics Application the Project Leader for the Grant?"},
   {type: "radioButton", name: "grants"},
   ]
 },
 {hidden: true, name: "grants-no", content: [
 {type: "plainText", text: "Please enter the project grant leader's detail"},
 {type:'textBox', text: "Surname"},
 {type:'textBox', text: "First Name"},
 {type:'textBox', text: "Email"},
 {type:'textBox', text: "Phone"},
 ]
},
];

var Button = WidgetView.extend({
  className: "button",

  initialize: function(options){
    var elementTemplate = _.template(ButtonTemplate);
    $(this.el).html(elementTemplate({
      model: this.model
    }));

    WidgetView.prototype.initialize.apply(this, [options]);
  },

  /* events */
  events: {
    "click .add": "addModalView",
    "click .remove": "removeEntry",
    "click .submit":"validateMainForm",
  },

  addModalView: function(e) {
    var popUpTitle;
    var popUpPageQuestions;

    var id = $(e.target).parent().parent().parent().children().first().children()[0].id;
    switch (id) {
      case "select-study-investigator":
      popUpTitle='Select Study Investigator';
      popUpPageQuestions= subOne;
      break;
      case "grants":
      popUpTitle='Add Grants';
      popUpPageQuestions= subThree;
      break;
      default:
      popUpTitle='Add a Person';
      popUpPageQuestions= subTwo;
      break;
    }

    if(!MainView){
     MainView = require("views/MainView");
   }

   var popUpMain = new MainView({
    collection:popUpPageQuestions ,
    type: "1"
  });
   popUpMain = popUpMain.render();

   if(!Modal){
     Modal = require("views/Modal");
   }

   var item = new Widget({name: popUpTitle.replace(/ /g, "-").toLowerCase()});
   var modalView = new Modal({
    model: item,
    content: popUpMain,
    title: popUpTitle,
    animate: true
  });
   e.preventDefault();
   $('body').append(modalView.render().el);
 },

 removeEntry: function(e) {
  var id = $(e.target).parent().parent().parent().children().first().children()[0].id;
  Backbone.pubSub.trigger('removeEntry', id);
},

 validateMainForm:function(event){
        var isValid=true;
        $(".required").each(function(){
          if($(this).val()===''){
            isValid=false;
          }
        });
        if(!isValid){
          alert("Please fill in all required fields");
          event.preventDefault();
          return false;
        }
        else{
          return true;
        }
      },



});

return Button;

});
