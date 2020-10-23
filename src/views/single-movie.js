import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"

const SingleMovie = ()=>{
  let {id} = useParams()
  const [data, setData] = useState(null)
  
  useEffect(() => {
    if (data === null){
      axios.get(`https://www.backendexample.sanbersy.com/api/movies/${id}`)
      .then(res => {
        setData(res.data)
      })
    }
  }, [data, setData, id]);


  return (
    <>
        <h1 style={{testAlign: "center"}}>
            {data !==  null && data.title}
        </h1>
        <h1 style={{testAlign: "center"}}>
            {data !==  null && data.genre}
        </h1>
    </>
   
  )
}

export default SingleMovie
