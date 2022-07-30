
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from './graphql_api/constants';

function Header() {
    const token = localStorage.getItem(AUTH_TOKEN);
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem(AUTH_TOKEN);
        navigate('/login')
    }
  return (
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
        {token ?(
        <>
        <li className="nav-list">
            <a href='/createflashcard' className='listItem'>
                create Flashcard
            </a>
        </li>
        <li className="nav-list">
            <a href='?logout' className='signupBtn' onClick={()=>logout()}>
                Logout
            </a>
        </li></>):(
        <>
        <li className="nav-list">
            <a href='/login' className='signupBtn'>
                Login
            </a>
        </li></>
            )}
        
      </ul>
    </header>
  );
}

export default Header;
      