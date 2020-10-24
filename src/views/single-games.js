import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

const SGames = ()=>{
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
    <div className="container">
    <div className="isi">
        <div className="content-movie">
            <div className="movie-img">
                <img src= {data !==  null && data.image_url}/>
            </div>
            <div className="movie-desc">
                <div className="blabla">
                    <p>game Name : {data !==  null && data.name}</p>
                    <p>genre : {data !==  null && data.genre}</p>
                    <p>Single Player : {data !==  null && data.singlePlayer}</p>
                    <p>Multiplayer : {data !==  null && data.multiplayer}</p>
                    <p>platform Game : {data !==  null && data.platform}</p>
                    <p>Game Release : {data !==  null && data.release}</p>
                </div>
                <div className="btn-mov">
                    <Link to="/games"> 
                    <button className="btn-del">Back to List</button>
                  </Link>
                </div> 
            </div>
        </div>   
    </div>   
 </div>
  )
}

export default SGames
