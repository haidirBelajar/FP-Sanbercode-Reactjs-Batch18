import React, { useState,useContext ,useEffect } from 'react';
import Axios from 'axios';
import { Table, Button, Typography, Space } from "antd";
import { UserContext } from '../context/user-context'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import SingleMovie from '../views/single-movie'

const MovieList = () => {
  const [user] = useContext(UserContext)
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
    const [search, setSearch] = useState("")
    

  
    useEffect( () => {
      if (movies === null){
        Axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
        .then(res => {
            setMovies(res.data.map(el=>{ return {
              id: el.id, 
              title: el.title, 
              description: el.description,
              year: el.year,
              duration: el.duration,
              genre: el.genre,
              rating: el.rating,
              image_url: el.image_url
            }
          }))
        })
      }
    }, [movies])
    
    const handleChange = (event) =>{
      let typeOfInput = event.target.name
  
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
  
    const handleSubmit = (event) =>{
      // menahan submit
      event.preventDefault()
  
      let title = input.title
      console.log(input)
  
      if (title.replace(/\s/g,'') !== ""){      
        if (statusForm === "create"){        
          Axios.post(`https://www.backendexample.sanbersy.com/api/movies`, {
            title: input.title,
            description: input.description,
            year: input.year,
            duration: input.duration,
            genre: input.genre,
            rating: parseInt(input.rating),
            image_url: input.image_url
          })
          .then(res => {
              setMovies([...movies, {id: res.data.id, ...input}])
          })
        }else if(statusForm === "edit"){
          Axios.put(`https://www.backendexample.sanbersy.com/api/movies/${selectedId}`, {
            title: input.title,
            description: input.description,
            year: input.year,
            duration: input.duration,
            genre: input.genre,
            rating: parseInt(input.rating),
            image_url: input.image_url
          })
          .then(res => {
              let singleMovie = movies.find(el=> el.id === selectedId)
              singleMovie.title = input.title
              singleMovie.description = input.description
              singleMovie.year = input.year
              singleMovie.duration = input.duration
              singleMovie.genre = input.genre
              singleMovie.rating = input.rating
              singleMovie.image_url = input.image_url
              setMovies([...movies])
          })
        }
        
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
  
    }

      const handleDelete = ({itemId}) => {  
        let newMovies = movies.filter(el => el.id !== itemId)
        console.log({itemId})
        Axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${itemId}`,{
          headers: {
            Authorization: `Bearer ${user.token}`
          }} )
        .then(res => {
          console.log(res)
        })
              
        setMovies([...newMovies])
        
      }
      
      const handleEdit = ({itemId}) =>{
        let singleMovie = movies.find(x=> x.id === itemId)
        setInput({
          title: singleMovie.title,
          description: singleMovie.description,
          year: singleMovie.year,
          duration: singleMovie.duration,
          genre: singleMovie.genre,
          rating: singleMovie.rating,
          image_url: singleMovie.image_url
        })
        setSelectedId(itemId)
        setStatusForm("edit")
      }

      const handleVIew = ({itemId}) => {
        let movieSingle = movies.filter(el => el.id !== itemId)
        Axios.get(`https://www.backendexample.sanbersy.com/api/movies/${itemId}`).then(res => {
          console.log(res.data)
        })
        setMovies([...movieSingle])
      }
     
  
    function truncateString(str, num) {
      if (str === null){
        return ""
      }else{
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }
    }
    
  
    const submitSearch = (e) =>{
      e.preventDefault()
      Axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
      .then(res => {
        let resMovies = res.data.map(el=>{ return {
            id: el.id, 
            title: el.title, 
            description: el.description,
            year: el.year,
            duration: el.duration,
            genre: el.genre,
            rating: el.rating,
            image_url: el.image_url
          }
        })
  
        let filteredMovies = resMovies.filter(x=> x.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        setMovies([...filteredMovies])
      })
   
    }
  
    const handleChangeSearch = (e)=>{
      setSearch(e.target.value)
    }

    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: 200,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Year",
        dataIndex: "year",
        key: "year",
        tableLayout: "auto",
        sorter: {
          compare: (a, b) => a.year - b.year,
          multiple: 3,
        },
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
        tableLayout: "auto",
        sorter: {
          compare: (a, b) => a.duration - b.duration,
          multiple: 2,
        },
      },
      {
        title: "Genre",
        dataIndex: "genre",
        key: "genre",
      },
      {
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
        tableLayout: "auto",
        sorter: {
          compare: (a, b) => a.rating - b.rating,
          multiple: 1,
        },
      },
      {
        title: "Action",
        key: "action",
        render: (e) => (
          <Space size="middle">
            <Link to={`movie/${e.id}`} >
              <Button>View</Button>
            </Link>

            <Link to={`movie/edit/${e.id}`}>
              <Button>Edit</Button>
            </Link>
          
            <Button id={e.id} onClick={handleDelete} title="Delete">
              Delete
            </Button>
          </Space>
        ),
        width: 200,
      },
  ]
  
    return(
      <>
          <div className="container">
            <div className="content">
                <h1>Daftar Film</h1>
                <form className="search" onSubmit={submitSearch}>
                  <input type="text" value={search} onChange={handleChangeSearch} />
                  <button>search</button>
                </form>
                <Table columns={columns} dataSource={movies}  />
            </div>
          </div>
        {/* Form */}
          <div className="container">
            <div className="content">
                <h1>Form Submit New Movie</h1>
                <form className="form-input" onSubmit={handleSubmit}>
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
                    <button>submit</button>
                </div>
               
                </form>
            </div>
          </div>
      </>
    )
}
export default MovieList