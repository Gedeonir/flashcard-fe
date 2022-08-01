import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN, QUESTION_ID } from './graphql_api/constants';
import Header from './Header';
import { UPDATE_QUESTION,SINGLE_Question_Query } from './graphql_api/api';
import { useMutation, useQuery } from '@apollo/client';
import { constants } from 'buffer';

const Update=()=>{
  const token = localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();
  const [state,setFormState] = useState({
    question:"",
    answer:"",
    marks:""
  });

  let questionId: any = localStorage.getItem(QUESTION_ID); 
 
  const id:Number = +questionId;
  

  const [error, setError] = useState(""); 

  const[message,setSuccesMessage] = useState("")

  const [Update] = useMutation(UPDATE_QUESTION, {
    onCompleted: ({post}) => {
      setSuccesMessage(" Question updated successful")
      setError("")
    }
  });

  const {data} = useQuery(SINGLE_Question_Query,{
    variables:{
      getSingleQuestionId:id
    },
    onCompleted: ({post}) => {
      setError("")
    }
  });
  
  console.log(data)



  const {question,answer,marks} = state;

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormState({ ...state, [name]: value });
  };


  const handleSubmit =(e:any) => {
    e.preventDefault();

    Update({
      variables: {
        updateQuestionId:id,
        question: `${state.question}`,
        correctAnswer: `${state.answer}`,
        weight: `${state.marks}`,
      },
    })
    .then((data:any)=> data.json())
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
                {data?(
                <form onSubmit={handleSubmit}>
                  {error && <p className='error_txt'>{error}</p>}
                  {message && <p className='success_txt'>{message}</p>}
                  <div className='input-group'>
                    <label>ID:</label>
                    <input type="text" value={questionId} disabled></input>
                  </div>
                    <div className='input-group'>
                      <label>question:</label>
                      <input type="text" name="question" onChange={(e) => handleChange(e)} defaultValue={data.getSingleQuestion.question} placeholder='Enter you question' id='question' required></input>
                    </div>
                    <div className='input-group'>
                      <label>Answer:</label>
                      <input type="text" name="answer" onChange={(e) => handleChange(e)} defaultValue={data.getSingleQuestion.correctAnswer} placeholder='Enter answer' id='answer' required></input>
                    </div>
                    <div className='input-group'>
                      <label>Marks:</label>
                      <input type="text" name="marks" onChange={(e) => handleChange(e)} defaultValue={data.getSingleQuestion.weight} placeholder='Enter marks' id='marks' required></input>
                    </div>
                    <div className='actions'>
                      <button className='button edit'>
                        Update
                      </button>
                    </div>                  
                </form>
                ):(
                  <div>
                    <p className='success_txt'>please wait  while fetching data</p>
                  </div>
                )}
              </div>
              </div></>
          )}
          
        </div>
        
      </div>
    </div>
  )
}

export default Update