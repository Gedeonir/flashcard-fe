import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {LOGIN_MUTATION} from './graphql_api/api';
import { AUTH_TOKEN } from './graphql_api/constants';
import Header from './Header';


const Login= () =>{
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [state,setFormState] = useState({
    email:"",
    password:"",
    name:"",
  }
  );


  useEffect(()=>{
    const token = localStorage.getItem(AUTH_TOKEN);
    if(token){
      navigate('/')
    }
  })
  
  const { email, password,name } = state;
  const [Login] = useMutation(LOGIN_MUTATION,{
    onCompleted:({login})=>{
      localStorage.setItem(AUTH_TOKEN,login.token)
      navigate('/');
    }
  })


    const handleChange = (e:any) => {
      const { name, value } = e.target;
      setFormState({ ...state, [name]: value });
    };

    const handleLoginSubmit =(e:any) => {
      e.preventDefault();
      Login({
        variables: {
          email: `${state.email}`,
          password: `${state.password}`,
        },
      })
      .then((data:any)=> data.json())
      .then(res=>console.log(res))
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
          <p>sign into your account</p>
        </div>
        <div className='content-body'>
          <div className='title'>
            <h1>Login into your account</h1>
          </div>
          <div className="user-accounts">
              <div className='login'>
                <form onSubmit={handleLoginSubmit}>
                  {error && <p className='error_txt'>{error}</p>}
                  <div className='input-group'>
                      <label>Email:</label>
                      <input type="email" name="email" onChange={(e)=>handleChange(e)}  placeholder='Email' id="email" value={email} required></input>
                  </div>
                  <div className='input-group'>
                    <label>password:</label>
                    <input type="password" name="password" onChange={(e)=>handleChange(e)}  placeholder='enter password' id="password" value={password} required></input>
                  </div>
                  <div className='input-group'>
                    <button className='button'>
                      Login
                    </button>
                  </div> 

                </form>
                <a href='/create-user' className="signupBtn">create new account</a>       
              </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};


export default Login;