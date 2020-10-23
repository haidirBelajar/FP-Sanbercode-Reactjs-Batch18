import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import Axios from "axios"

const SingleMovieEdit = ()=>{
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


  useEffect(() => {
    if (data === null){
      Axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
      .then(res => {
        setInput(res.data)
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

  const movieEditSubmit = () => {
    Axios.put(`https://backendexample.sanbersy.com/api/data-movie`, {
        title: input.title,
        description: input.description,
        year: input.year,
        duration: input.duration,
        genre: input.genre,
        rating: parseInt(input.rating)
      })
      .then(res => {
          res.title = input.title
          res.description = input.description
          res.year = input.year
          res.duration = input.duration
          res.genre = input.genre
          res.rating = input.rating
      }).catch(console.error())
  }

  return (
    <>
        <div className="container">
            <div className="content">
                <h1>Movies Form</h1>
                <form onSubmit={movieEditSubmit}>
                <div>
                    <label style={{float: "left"}}>
                    Title:
                    </label>
                    <input style={{float: "right"}} type="text" name="title" value={input.title} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div>
                    <label style={{float: "left"}}>
                    Description:
                    </label>
                    <textarea style={{float: "right"}} type="text" name="description" value={input.description} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div style={{marginTop: "20px"}}>
                    <label style={{float: "left"}}>
                    Year:
                    </label>
                    <input style={{float: "right"}} type="number" max={2020} min={1980}  name="year" value={input.year} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div style={{marginTop: "20px"}}>
                    <label style={{float: "left"}}>
                    Duration:
                    </label>
                    <input style={{float: "right"}} type="number" name="duration" value={input.duration} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div style={{marginTop: "20px"}}>
                    <label style={{float: "left"}}>
                    Genre:
                    </label>
                    <input style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange} />
                    <br/>
                    <br/>
                </div>
                <div style={{marginTop: "20px"}}>
                    <label style={{float: "left"}}>
                    Rating:
                    </label>
                    <input style={{float: "right"}} type="number" max={10} min={0} name="rating" value={input.rating} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div style={{marginTop: "20px"}}>
                    <label style={{float: "left"}}>
                    Image Url:
                    </label>
                    <textarea style={{float: "right"}} cols="50" rows="3" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <br/>
                <br/>
                <button>submit</button>
                </form>
            </div>
        </div>
    </>
   
  )
}

export default SingleMovieEdit
