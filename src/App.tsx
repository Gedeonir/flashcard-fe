import React from 'react';
import './App.css';
import QuestionList from './FlashcardsList';




const SAMPLE_CARDS = [
  {
    id: 1,
    question: 'What is 3 + 3 ?',
    answer: '4',
    options: ['2', '3', '5', '4']
  },
  {
    id: 2,
    question: 'What is four + four ?',
    answer: '8',
    options: ['2', '3', '8', '4']
  },
  {
    id: 3,
    question: 'What is six * six ?',
    answer: '36',
    options: ['2', '36', '5', '4']
  }
]

function App() {
  const [cards, setCards] = React.useState(SAMPLE_CARDS)
  return (
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
          <p>{cards.length} questions</p>
        </div>
        <div className='content-body'>
          <QuestionList cards={cards} />
        </div>
        
      </div>
    </div>
  );
}

export default App;
