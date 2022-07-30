import { useQuery } from '@apollo/client'
import React from 'react'
import FlashCard from './Flashcard'
import { Question_Query } from './graphql_api/api'

const QuestionList = ()=>{
    const {data} = useQuery(Question_Query)
    return (
        <div>
            {data &&(
                <><p className='title'>{data.allQuestions.length} Question(s)</p>
                <div className='cards-grid'>
                    {data.allQuestions.map((card: any) => {
                        return <FlashCard id={card.id} question={card.question} answer={card.correctAnswer} owner={card.postedBy.email} key={card.id} />
                    })}
                </div></> 
            )}
            
        </div>
    )
}

export default QuestionList