import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"

const SingleContestant = ()=>{
  let {id} = useParams()
  const [data, setData] = useState(null)
  
  useEffect(() => {
    if (data === null){
      axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
      .then(res => {
        setData(res.data)
      })
    }
  }, [data, setData, id]);


  return (
    <h1 style={{testAlign: "center"}}>
      {data !==  null && data.name}
    </h1>
  )
}

export default SingleContestant
