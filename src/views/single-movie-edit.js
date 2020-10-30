import React, {useEffect, useState, useContext,useHistory} from "react"
import { useParams} from "react-router-dom"
import Axios from "axios"
import { UserContext } from '../context/context'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";


const SingleMovieEdit = ()=>{
  const [user] = useContext(UserContext)
  let {id} = useParams()
  const [data, setData] = useState(null)
  const [movies, setMovies] =  useState(null)
  const [input, setInput]  =  useState({
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0
  })
  const [selectedId, setSelectedId]  =  useState(0)  
  const [statusForm, setStatusForm]  =  useState("create")  


  useEffect(() => {
    if (data === null){
      Axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
      .then(res => {
        setInput(res.data)
        console.log(res.data)
      })
    }
  }, [data, setData, id]);

  const handleChange = (event) =>{
    let typeOfInput = event.target.name
    console.log(typeOfInput, event.target.value)
    switch (typeOfInput){
      case "title":
      {
        setInput({...input, title: event.target.value});
        break
      }
      case "description":
      {
        setInput({...input, description: event.target.value});
        break
      }
      case "year":
      {
        setInput({...input, year: event.target.value});
          break
      }
      case "duration":
      {
        setInput({...input, duration: event.target.value});
          break
      }
      case "genre":
        {
          setInput({...input, genre: event.target.value});
            break
        }
      case "rating":
        {
          setInput({...input, rating: event.target.value});
            break
        }
      case "image_url":
        {
          setInput({...input, image_url: event.target.value});
            break
        }
    default:
      {break;}
    }
  }

  const handleEditForm = (e) => {
    e.preventDefault()

      Axios.put(`https://www.backendexample.sanbersy.com/api/movies/${id}`, {
        title: input.title,
        description: input.description,
        year: input.year,
        duration: input.duration,
        genre: input.genre,
        rating: parseInt(input.rating),
        image_url: input.image_url
      },
      { headers: { Authorization: `Bearer ${user.token}` } })
      .then(res => {
          console.log(res)
      })
    

    setStatusForm("create")
    setSelectedId(0)
    setInput({
      title: "",
      description: "",
      year: 2020,
      duration: 120,
      genre: "",
      rating: 0,
      image_url: " "
    })
  }

  return (
    <>
       <div className="container">
            <div className="content">
              <img src="/FP-Sanbercode-Reactjs-Batch18/public/icon/iconfinder_undo-back-arrow_2931166.svg" alt="back"/>
                <h1>Form Submit New Movie</h1>
                <form className="form-input">
                <div className="input">
                    <label>
                    Title:
                    </label>
                    <input style={{float: "right"}} type="text" name="title" value={input.title} onChange={handleChange}/>
                </div>
                <div className="input">
                    <label>
                    Description:
                    </label>
                    <textarea style={{float: "right"}} type="text" name="description" value={input.description} onChange={handleChange}/>
                </div>
                <div className="input">
                    <label>
                    Year:
                    </label>
                    <input style={{float: "right"}} type="number" max={2020} min={1980}  name="year" value={input.year} onChange={handleChange}/>
                </div>
                <div className="input">
                    <label>
                    Duration:
                    </label>
                    <input style={{float: "right"}} type="number" name="duration" value={input.duration} onChange={handleChange}/>
                </div>
                <div className="input">
                    <label>
                    Genre:
                    </label>
                    <input style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
                </div>
                <div className="input">
                    <label>
                    Rating:
                    </label>
                    <input style={{float: "right"}} type="number" max={10} min={0} name="rating" value={input.rating} onChange={handleChange}/>
                </div>
                <div className="input">
                    <label>
                    Image Url:
                    </label>
                    <input type="text" style={{float: "right"}} cols="50" rows="3" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
                </div>
                <div className="submit">
                    <button onClick={handleEditForm}>submit</button>
                </div>
               
                </form>

                <div className="btn-mov">
                  <Link to="/movie"> 
                  <button className="btn-del">Back to List</button>
                </Link>
                </div>
            </div>
        </div>
    </>
   
  )
}

export default SingleMovieEdit
