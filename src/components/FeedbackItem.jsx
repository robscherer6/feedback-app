import {useState} from 'react'

function FeedbackItem() {
  const [rating, setRating] = useState(7)
  const [text, setText] = useState('Do your homework!!')

  const handleClick = () => {
    setRating(10)
    // setRating((prev) => {
    //   return prev + 1;
    // });
  }

  return (
    <div className="card">
      <div className="num-display">{rating}</div>
      <div className="text-display">{text}</div>
      <button onClick={handleClick}>Click</button>
    </div>
  )
}

export default FeedbackItem