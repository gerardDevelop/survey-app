(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,n){},26:function(e,t,n){e.exports=n(49)},33:function(e,t,n){},36:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},37:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(13),s=n.n(o),c=(n(31),n(33),n(5)),l=n(6),i=n(8),u=n(7),m=n(9),h=(n(18),n(36),function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){console.log("component did mount.")}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("a",{className:"App-link",href:"/survey?token=303d1eb2-ddb8-486c-a823-02af2365beb6",target:"_blank",rel:"noopener noreferrer"},"View survey (for customer)"),r.a.createElement("a",{className:"App-link",href:"/survey2?token=303d1eb2-ddb8-486c-a823-02af2365beb6",target:"_blank",rel:"noopener noreferrer"},"View survey 2 (for customer)"),r.a.createElement("a",{className:"App-link",href:"/testLayout",target:"_blank",rel:"noopener noreferrer"},"View testlayout")))}}]),t}(a.Component)),d=(n(37),n(54)),f=n(53),p=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={surveyId:null,questions:[],answers:[],stockNo:null,companyId:null,token:null,currentIncr:0,vehicleName:"",error:!1,errorMsg:"",showQuestion:!0,submissionSuccessful:!1},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"onTextFieldChange",value:function(e){var t=this.state.answers;t[this.state.currentIncr].answer=e.target.value,this.setState({answers:t}),console.log("on text field change")}},{key:"onInputClick",value:function(e,t){console.log("value = "+this.state.currentIncr+" is "+e);var n=this.state.answers;n[this.state.currentIncr].answer=e;var a=this.state.currentIncr;a<this.state.questions.length-1&&(a+=1),this.setState({answers:n,currentIncr:a,showQuestion:!1})}},{key:"onSubmit",value:function(e){e.preventDefault(),console.log("on submit"),console.log(this.state.answers),this.sendAnswers()}},{key:"componentDidMount",value:function(){this.getSurvey()}},{key:"componentDidUpdate",value:function(){this.state.showQuestion||this.setState({showQuestion:!0})}},{key:"getSurvey",value:function(){var e=this,t=new URLSearchParams(this.props.location.search).get("token");console.log("token: "+t),t?(this.setState({token:t}),console.log("getting survey"),fetch("/api/tokenSurvey?token="+t).then(function(e){return e.json()}).then(function(t){if(console.log(t),t&&!t.completed){console.log("received survey");var n=1,a=[],r=t.questions.map(function(e){return e.key=n,a[n-1]={answer:null},console.log("setting key for "+n),n++,e});e.setState({questions:r,answers:a,vehicleName:" for "+t.vehicle.make})}else t.completed?(console.log("Survey has already been completed"),e.setState({error:!0,errorMsg:"Error: Survey has already been completed"})):console.log("didn't receive survey")}).catch(function(t){e.setState({error:!0,errorMsg:"Error: Could not find survey"}),console.log(t)})):console.log("no id given")}},{key:"sendAnswers",value:function(){var e=this;console.log("sending answers"),fetch("/api/tokenSurvey",{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},referrer:"no-referrer",body:JSON.stringify({token:this.state.token,answers:this.state.answers})}).then(function(e){return e.json()}).then(function(t){console.log("received resp "+t.msg),"success"==t.msg&&e.setState({submissionSuccessful:!0})})}},{key:"render",value:function(){var e=this,t=(r.a.createElement("button",null,"Start Survey?"),r.a.createElement(r.a.Fragment,null),r.a.createElement(r.a.Fragment,null)),n=r.a.createElement(r.a.Fragment,null);if(!this.state.error&&this.state.questions.length>0&&(n=null,"bool"===(t=this.state.questions[this.state.currentIncr]).type?n=r.a.createElement(r.a.Fragment,null,r.a.createElement(d.a,{color:"secondary",size:"lg",onClick:function(t){return e.onInputClick(!1,t)}},"No")," ",r.a.createElement(d.a,{color:"primary",size:"lg",onClick:function(t){return e.onInputClick(!0,t)}},"Yes")):"text"===t.type&&(n=r.a.createElement("div",null,r.a.createElement("div",{className:"d-flex justify-content-center mt-3"},r.a.createElement("textarea",{className:"form-control",id:"exampleFormControlTextarea1",rows:"4",onChange:function(t){e.onTextFieldChange(t)}})),r.a.createElement("p",null),r.a.createElement("div",{className:"d-flex justify-content-center mt-3"},r.a.createElement(d.a,{color:"primary",size:"lg",onClick:function(t){return e.onSubmit(t)},className:"mt-2"},"Submit")))),r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,t.question),n)),this.state.error)return r.a.createElement("div",{className:"container"},r.a.createElement(f.a,{color:"danger",className:"mt-5"},this.state.errorMsg));var a=r.a.createElement(r.a.Fragment,null);return this.state.submissionSuccessful?a=r.a.createElement(f.a,{color:"primary",className:"mt-3"},"Survey successfully submitted. Thank you for your time!"):this.state.showQuestion&&(a=r.a.createElement(r.a.Fragment,null,r.a.createElement(f.a,{color:"primary",className:"mt-3"},t.question),r.a.createElement("div",{className:"centered"},n))),r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"Survey",this.state.vehicleName),a)}}]),t}(a.Component),v=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("p",null,"Content here"))}}]),t}(a.Component),g=n(55),y=n(56),b=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){r.a.createElement("div",null);return r.a.createElement(g.a,null,r.a.createElement(y.a,{exact:!0,path:"/",component:h}),r.a.createElement(y.a,{exact:!0,path:"/survey",component:p}),r.a.createElement(y.a,{exact:!0,path:"/testlayout",component:v}))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var k=n(52);s.a.render(r.a.createElement(k.a,null,r.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[26,2,1]]]);
//# sourceMappingURL=main.850104b8.chunk.js.map