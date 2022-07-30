import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {REGISTER} from './graphql_api/api';
import { AUTH_TOKEN } from './graphql_api/constants';
import Header from './Header';


const Register= () =>{
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [state,setFormState] = useState({
    email:"",
    password:"",
    name:"",
  }
  );

  const[message,setSuccesMessage] = useState("")
  
  const { email, password,name } = state;


    const [Signup] = useMutation(REGISTER, {
      onCompleted: ({signup}) => {
        localStorage.setItem(AUTH_TOKEN, signup.token);
        setSuccesMessage("Register Success")
        navigate('/login');
      }
    });

    const handleChange = (e:any) => {
      const { name, value } = e.target;
      setFormState({ ...state, [name]: value });
    };

    const handleSignUpSubmit =(e:any) => {
      e.preventDefault();
      Signup({
        variables: {
          email: `${state.email}`,
          password: `${state.password}`,
          name: `${state.name}`,
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


    return(

    <div className="App">
      <Header/>
      <div className='container'>
        
        <div className='content-sidebar'>
          <p>Create a new account</p>
        </div>
        <div className='content-body'>
          <div className='title'>
            <h1>Create a new account</h1>
          </div>
            <div className="user-accounts">
              <div className='signup'>
                <form onSubmit={handleSignUpSubmit}>
                  {error && <p className='error_txt'>{error}</p>}
                  {message && <p className='success_txt'>{message}</p>}
                  <div className='input-group'>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={(e)=>handleChange(e)}  placeholder='Email' id="email" value={email} required></input>
                  </div>
                  <div className='input-group'>
                    <label>password:</label>
                    <input type="password" name="password" onChange={(e)=>handleChange(e)}  placeholder='enter password' id="password" value={password} required></input>
                  </div>
                  <div className='input-group'>
                    <label>name:</label>
                    <input type="password" name="name" id="name" value={name} placeholder='name' onChange={(e)=>handleChange(e)}  required></input>
                  </div>
                    <div className='input-group'>
                      <button className='button'>
                        create user
                      </button>
                    </div> 

                </form> 
                <a href='/login' className="signupBtn">login here!</a>
              </div>
            </div>
        </div>
        
      </div>
    </div>
  );
};


export default Register;