import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {LOGIN} from './graphql_api/api';

const Login= () =>{

    const [flip,setFlip] = useState(false)
    const navigate = useNavigate();

    const [input, setInput] = React.useState({
        email: "",
        password: "",
      });

    const { email, password } = input;

    const onInputChange = (e:any) => {
      const { name, value } = e.target;
      setInput({ ...input, [name]: value });
    };

    const [Login] = useMutation(LOGIN, {
      variables: {
        email: input.email,
        password: input.password
      },
      onCompleted: ({ login }) => {
        localStorage.setItem("token", login.token);
        navigate('/dashboard');
      }
    })


    const handleSubmit = (e:any) => {
      e.preventDefault();
      const { email, password } = input;

    }

    return(
        <div className="App">
      <header className="App-header">
        <div className='logo'>
          <label>
            FlashCards
          </label>
        </div>

        <ul className='navbar'>
            <li className="nav-list">
                <a href='/' className='listItem'>
                Home
                </a>
            </li>
          <li className="nav-list">
            <a href='#' className='listItem'>
              create Flashcard
            </a>
          </li>

          <li className="nav-list">
            <a href='/useraccounts' className='signupBtn'>
              user accounts
            </a>
          </li>
        </ul>
      </header>
      <div className='container'>
        
        <div className='content-sidebar'>
          <p>User accounts</p>
        </div>
        <div className='content-body'>
            <div className={`user-accounts ${flip ? 'flip':''}`}>
                <div className='login'>
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label>Email:</label>
                        <input type="email" name="email" placeholder='Email' required></input>
                    </div>
                    <div className='input-group'>
                        <label>password:</label>
                        <input type="password" name="password" placeholder='enter password' required></input>
                    </div>
                    <div className='input-group'>
                        <button className='button'>
                            Login
                        </button>
                    </div> 

                </form>
                <button onClick={()=> setFlip(!flip)} className="signupBtn">create Account</button>       
                </div>
                <div className='signup'>
                    <form>
                        <div className='input-group'>
                            <label>Email:</label>
                            <input type="email" name="email" placeholder='Email' required></input>
                        </div>
                        <div className='input-group'>
                            <label>password:</label>
                            <input type="password" name="email" placeholder='password' required></input>
                        </div>
                        <div className='input-group'>
                            <label>name:</label>
                            <input type="password" name="email" placeholder='name' required></input>
                        </div>
                        <div className='input-group'>
                            <button className='button'>
                                sign up
                            </button>
                        </div> 

                    </form> 

                    <button onClick={()=> setFlip(!flip)} className="signupBtn">Already have account,login here!</button>
                </div>
            </div>
        </div>
        
      </div>
    </div>

    )
}

export default Login;