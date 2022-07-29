import React, {useState} from 'react';

const FlashCard = ({id,question,answer,owner}:{id:any,question:any,answer:any,owner:any}) =>{
    const [flip,setFlip] = useState(false)


    return(
        <div className={`questionCard ${flip ? 'flip':''}`}>

            <div className='front'>
                <div className='actions'>
                    <button className='button edit'>
                        Edit
                    </button>
                    <button className='button close'>
                        delete
                    </button>  
                </div>
                <p><label>Q{id}.</label>{question}  </p>
                <div className='postedBy'><label>Posted by: </label>{owner}</div>
                <button className='button' onClick={()=> setFlip(!flip)}>
                    View answer
                </button>          
            </div>
            <div className='back'>
                <p><label>Answer: </label>{answer}  </p>
                <button className='button' onClick={()=> setFlip(!flip)}>
                    Hide answer
                </button> 
            </div>
        </div>
    )
}

export default FlashCard;