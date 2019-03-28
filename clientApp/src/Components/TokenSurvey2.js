import React, { Component, useEffect } from 'react';
import '../css/spinner.css';

import { Alert, Button, Badge } from 'reactstrap'; 

class TokenSurvey2 extends Component {

  constructor(props) {
    super(props);

    this.state = {
      surveyId : null,
      questions: [],
      answers: [],
      stockNo: null,
      companyId: null,
      token: null,
      currentIncr: 0,
      vehicleName: "",
      error: false,
      errorMsg: "",
      
      showQuestion: true,

      submissionSuccessful: false
    };
  }

  onTextFieldChange(e) {
    var answers = this.state.answers;
    answers[this.state.currentIncr].answer = e.target.value;

    this.setState({
      answers : answers
    });

    console.log("on text field change");
  }

  onInputClick(yesBool, e) {
    console.log("value = " + this.state.currentIncr + " is " + yesBool);



    var answers = this.state.answers;
    answers[this.state.currentIncr].answer = yesBool;

    var incr = this.state.currentIncr;

    if(incr < this.state.questions.length - 1) {
      incr = incr + 1;
    }

    this.setState({
      answers: answers,
      currentIncr: incr,
      showQuestion: false
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("on submit");

    console.log(this.state.answers);
    this.sendAnswers();
  }

  componentDidMount() {
      this.getSurvey();
  }

  componentDidUpdate() {
    
    
    if(!this.state.showQuestion) {
      this.setState({
        showQuestion : true
      });
    }
  }

  getSurvey() {
    const params = new URLSearchParams(this.props.location.search);
    //const stockNo = params.get('StockNo');
    //const companyId = params.get('CompanyId');
    //const surveyId = params.get('SurveyId');

    const token = params.get('token');

    console.log("token: " + token);

    if(token) {

    this.setState({
      token: token
    });

    console.log("getting survey");

    fetch('/api/tokenSurvey?token=' + token)
      .then(response => response.json())
      .then(data =>  {
  
        console.log(data)

        

        if(data && !data.completed) {
          console.log("received survey");

          var incr = 1;
          var answers = [];

          var questions = data.questions.map(question => {
              question.key = incr;
              answers[incr - 1] = {
                answer: null
              };
              
              console.log("setting key for " + incr);
              incr++;
              return question;
          });
          
          this.setState({
            //surveyId: data.SurveyId,
            questions: questions,
            answers : answers,
            vehicleName: " for " + data.vehicle.make,
            //stockNo: stockNo,
            //companyId: companyId
          });
        } else if(data.completed) {
          console.log("Survey has already been completed");
          this.setState({
            error: true,
            errorMsg: "Error: Survey has already been completed"
          });
          // disable interface, etc and display message
        } else {
          console.log("didn't receive survey");
        }

        //this.setState({ resp : data.rows }) 
      })
      .catch(error => 
        {
          // make a change to state here
          this.setState({
            error: true,
            errorMsg: "Error: Could not find survey"
          });
          console.log(error);
        });
       
    } else {
      console.log("no id given");
    }
  }

  sendAnswers() {
    console.log("sending answers");
    
    fetch('/api/tokenSurvey', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
         "Content-Type": "application/json",
         //"Content-Type": "application/x-www-form-urlencoded",
      },
      //redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ 

        /*
        surveyId: this.state.surveyId,
        answers: this.state.answers,
        stockNo: this.state.stockNo,
        companyId: this.state.companyId
        */

        token: this.state.token,
        answers: this.state.answers

      }), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(data => {
      console.log("received resp " + data.msg)

      if(data.msg == "success") {
        // display thank you message to user
        this.setState({
          submissionSuccessful: true
        });
      }
    });
      
      
      /*
      (response.json())
    .then(data => console.log({data}))) // TODO place this in state
    .catch(error => console.log(error));
    */
  }

  render() {

    const initialQuestion = (
      <button>Start Survey?</button>
    );

    // question should generate 1 question at a time, and use some incrementor variable to track the current question
    // to be shown

    var question = (<></>);

    /* -- radio buttons -- 

      <div className="ml-3">
          <input className="form-check-input" name={'radio'} id={'radioyes'} type="radio" onClick={(e) => this.onInputClick(true, e)}></input>
          <label className="form-check-label" htmlFor={'radioyes'}>Yes</label> <br/>  
          <input className="form-check-input" name={'radio'} id={'radiono'} type="radio" onClick={(e) => this.onInputClick(false, e)}></input>
          <label className="form-check-label" htmlFor={'radiono'}>No</label>     
          </div>
    */

      var currentQuestion = (<></>);
      var input = (<></>);

    if(!this.state.error && this.state.questions.length > 0) {    

      currentQuestion = this.state.questions[this.state.currentIncr];
      input = null;

      if(currentQuestion.type === "bool") {
        input = (
          <>
            <Button color="secondary" size="lg" onClick={(e) => this.onInputClick(false, e)}>No</Button>{' '}
            <Button color="primary" size="lg" onClick={(e) => this.onInputClick(true, e)}>Yes</Button>
          </>  
        );
      } else if(currentQuestion.type === "text") {
        input = (
          <div>
           <div className="d-flex justify-content-center mt-3">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" onChange={(e) => {this.onTextFieldChange(e)}} ></textarea>
            </div><p></p>
            <div className="d-flex justify-content-center mt-3">
            <Button color="primary" size="lg" onClick={(e) => this.onSubmit(e)} className="mt-2">Submit</Button>
            </div>
          </div>
        );
      }

      //var currentQuestion = this.state.questions[this.state.currentIncr].question;

      question = (<>
        <p>{currentQuestion.question}</p>
        {input}
      </>);
    }

    if(!this.state.error) {
      
      /*
      return ( 
        <div className="container">
        <div className="d-flex justify-content-center">
          {mainCard}
          </div>
          <div className="d-flex justify-content-center">
          <div className="card">
            <div className="card-body">
            <p>{currentQuestion.question}</p>
            </div>
            
          </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
        {input}
          </div>
        </div>
      );
      */

        var questionContent = (<></>);
          
        if(this.state.submissionSuccessful) {
          questionContent = (
            <Alert color="primary" className="mt-3">
              {"Survey successfully submitted. Thank you for your time!"}
            </Alert>);
        } else if(this.state.showQuestion) {
          questionContent = (
            <>
            <Alert color="primary" className="mt-3">
              {currentQuestion.question}
            </Alert>
            <div className="centered">
            {input}
            </div>
            </>
            );
        } 

        


        return (
          <div className="container">
            <h1 className="mt-3">Survey{this.state.vehicleName}</h1>

            {questionContent}
            
          </div>
        );

    } else {  // todo center the <p> text here



      return (
        <div className="container">
          <Alert color="danger" className="mt-5">
            {this.state.errorMsg}
          </Alert>
        </div>   
      );
    }

    

    
  }
}

export default TokenSurvey2;