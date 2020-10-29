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
      axios.get(`https://www.backendexample.sanbersy.com/api/games/${id}`)
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
    }
  }, [data, setData, id]);

  return (
 <div className="container">
   <div className="content">
    <div className="isi">
        <div className="content-movie">
            <div className="movie-img">
                <img src= {data !==  null && data.image_url}/>
            </div>
            <div className="movie-desc">
                <div className="blabla">
                    <p>{data !==  null && data.name}</p>
                    <p>{data !==  null && data.genre}</p>
                    <p>{data !==  null && data.year}</p>
                    <p>{data !==  null && data.singlePlayer}</p>
                    <p>{data !==  null && data.multiplayer}</p>
                    <p>{data !==  null && data.platform}</p>
                    <p>{data !==  null && data.release}</p>
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
 </div>
   
  )
}

export default SGames
