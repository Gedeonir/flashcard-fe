import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN, QUESTION_ID } from './graphql_api/constants';
import Header from './Header';
import { UPDATE_QUESTION } from './graphql_api/api';
import { useMutation, useQuery } from '@apollo/client';

const Update=()=>{
  const token = localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();
  const questionId = localStorage.getItem(QUESTION_ID);
  
  
  const [error, setError] = useState("");
  const [state,setFormState] = useState({
      question:"",
      answer:"",
      marks:""
  }
  );

  const[message,setSuccesMessage] = useState("")

  const [Update] = useMutation(UPDATE_QUESTION, {
    onCompleted: ({post}) => {
      setSuccesMessage(" Question updated successful")
      setError("")
    }
  });


  const {question,answer,marks} = state;

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormState({ ...state, [name]: value });
  };


  const handleSubmit =(e:any) => {
    e.preventDefault();
    console.log(state)
    Update({
      variables: {
        updateQuestionId:`${questionId}`,
        question: `${state.question}`,
        correctAnswer: `${state.answer}`,
        weight: `${state.marks}`,
      },
    })
    .then((data:any)=> console.log(data))
    .then(res=> console.log(res))
    .catch( err=>
      {
      let {message} = JSON.parse((JSON.stringify(err)));
        setError(message)
      }
    );
  };


  return (
    <div className="App">
      <Header/>
      <div className='container'>
        <div className='content-sidebar'>
          <p>Level-up project</p>
        </div>
        <div className='content-body'>
          {token &&(
            <><div className='title'>
              <h1>Update Question</h1>
            </div>
            <div className='postQuestionCard'>
              <div className='front'>
                <form onSubmit={handleSubmit}>
                  {error && <p className='error_txt'>{error}</p>}
                  {message && <p className='success_txt'>{message}</p>}
                  <div className='input-group'>
                    <label>question:</label>
                    <input type="text" name="question" onChange={(e) => handleChange(e)} value={question} placeholder='Enter you question' id='question' required></input>
                  </div>
                  <div className='input-group'>
                    <label>Answer:</label>
                    <input type="text" name="answer" onChange={(e) => handleChange(e)} value={answer} placeholder='Enter answer' id='answer' required></input>
                  </div>
                  <div className='input-group'>
                    <label>Marks:</label>
                    <input type="text" name="marks" onChange={(e) => handleChange(e)} value={marks} placeholder='Enter marks' id='marks' required></input>
                  </div>
                  <div className='actions'>
                    <button className='button edit'>
                      Update
                    </button>
                  </div>
                </form>
              </div>
              </div></>
          )}
          
        </div>
        
      </div>
    </div>
  )
}

export default Update