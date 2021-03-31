import MakeQuiz from '../components/MakeQuiz'

export default function Test(){

  let concept = 1
  let name = 'A quiz about stuff'
  return(
    <div>
      <MakeQuiz concept_id={concept} name={name}/>
    </div>
  )
}
