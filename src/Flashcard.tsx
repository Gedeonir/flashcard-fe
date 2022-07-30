import React, {useState} from 'react';
import { AUTH_TOKEN, QUESTION_ID } from './graphql_api/constants';
import { DELETE_QUESTION} from './graphql_api/api';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';


const FlashCard = ({id,question,answer,owner}:{id:any,question:any,answer:any,owner:any}) =>{
    const [flip,setFlip] = useState(false)
    const token = localStorage.getItem(AUTH_TOKEN);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [Delete] = useMutation(DELETE_QUESTION, {
        onCompleted: ({post}) => {
            alert(" Card deleted successful")
            setError("");
            window.location.reload();
        }
    });

    const handleUpdate = (id:any)=>{
        localStorage.setItem(QUESTION_ID,id)
        navigate(`/updatequestion?id=${id}`)
    }

    const handleDelete =(questionID:any) => {
        Delete({
          variables: {
            deleteQuestionId:questionID
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
        <div className={`questionCard ${flip ? 'flip':''}`}>

            <div className='front'>
                {token && (
                <div className='actions'>
                    <button className='button edit' onClick={() => handleUpdate(id)}>
                        Edit
                    </button>
                    <button className='button close' onClick={() => handleDelete(id)}>
                        delete
                    </button>  
                </div>
                )}
                
                <p>{question}  </p>
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