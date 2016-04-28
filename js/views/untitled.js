var questions = [

/* usable types: 
plainText
textBox
table
radioButton
file
checkbox */

//Q1
{content: [
  {type: "plainText", text: "Date of initial contact with research ethics: "},
  {type: "calendar"}
  ]
},

/* TODO - need to implement table */
//Q2
{content: [
  {type: "plainText", text: "Research Team: "},
  {type: "plainText", text: "Add/Remove Researchers: "},
  {type:'table',required:'required',title:'Add&nbspone&nbspplease',info:[["First&LastName",'Role','Primary Institution Affiliator',"Secondary Institution Affiliator","Will they recruit participants","Will they collect data/access"],
                                                      ["","Principal Investigator","","","checkbox","checkbox"],
                                                      ["","","","","","",""],
                                                      ]},

  {type: "button", text:'AddMe',buttonType:'popUp',name:"subOne"},
  {type: "button", text:'Remove',}
  ]
},
//Q3
{content: [
  {type: "plainText", text: "Primary study contact for facilitating the research ethics review process: "},
  {type: "dropDown",required:"required",title:"Choose&nbspat&nbspleast&nbspone"},
  ]
},
//Q4
{content: [
  {type: "plainText", text: 'Research sites/locations that will host key research events. Check all that apply:'},
  {type:"table",info:[
    ["Sites","Recruiting participants","Collecting data,accessing records/charts","Using Facilities"],
      ["BC Cancer Agency","checkbox","checkbox","checkbox"],
      ["Children's&Women's","checkbox","checkbox","checkbox"],
      ["Fraser Health","checkbox","checkbox","checkbox"],
      ["Interiror Health","checkbox","checkbox","checkbox"],
      ["Island Health-Clinical","checkbox","checkbox","checkbox"],
      ["Island Health-Health","checkbox","checkbox","checkbox"],
      ["Island Health-Health","checkbox","checkbox","checkbox"],
      ["Island Health-Health","checkbox","checkbox","checkbox"],
      ["Sites","Recruiting participants","Collecting data,accessing records/charts","Using Facilities"],
      ["BC Cancer Agency","checkbox","checkbox","checkbox"],
      ["Children's&Women's","checkbox","checkbox","checkbox"],
      ["Fraser Health","checkbox","checkbox","checkbox"],
      ["Interiror Health","checkbox","checkbox","checkbox"],
      ["Island Health-Clinical","checkbox","checkbox","checkbox"],
      ["Island Health-Health","checkbox","checkbox","checkbox"],
 ]},
  {type: "plainText", text: "Add/Remove Another Instruction: "},
  {type: "textBox", text: "New institution Name: ",required:"required",title:"Add&nbspNew"},
  {type: "button", text:'Add'},
  ]
},
//Q5
{content: [
  {type: "plainText",text: "Check all descriptors that are applicable to the research: "},
  {type: "checkbox",
  info: ["Behavioural/Social Science Research", 
  'Clinical Research', 
  "Student or Resident Project", 
  "Patient Recruitment",
  "Staff Recruitment",
  "Secondary Use of Patient Data(Charts)",
  "Data Linkages"
  ]},
  ]
},

//Q6
{content: [
  {type:'plainText',text: "Do you already have research ethics approval or pending approval (application has been submitted) from any BC REB? "},
  {type: "radioButton",name:'Q6'},
  {type:'plainText',text:'If yes, select the REB:',hidden:true,name:'Q6-yes'},
  {type:'dropDown',hidden:true,name:'Q6-yes'}
  ]
},
//Q7
{content: [
  { type:'plainText',
  text: "If research is being conducted outside BC, indicate from which institutions research ethics will be/has been sought, and provide status of the ethics application",
},
{type:'checkbox',name:'Q7',info:['N/A']},
{type:'table',name:'Q7_show',info:[["Institurion","Ethics Status"],["",""]],hidden:true},
{type:'button',buttonType:"submit",text:"Submit"},
]
},

];