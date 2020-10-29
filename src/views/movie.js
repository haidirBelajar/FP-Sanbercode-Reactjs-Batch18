import React, { useState,useContext ,useEffect } from 'react';
import Axios from 'axios';
import { Table, Button, Typography, Space } from "antd";
import { UserContext } from '../context/context'
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
      id: "",
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
          Axios.put(`https://www.backendexample.sanbersy.com/api/data-movies/${selectedId}`, {
            title: input.title,
            description: input.description,
            year: input.year,
            duration: input.duration,
            genre: input.genre,
            rating: parseInt(input.rating),
            image_url: input.image_url
          })
          .then(res => {
             
              console.log(res.data)
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

   

    const handleDelete = (e) => {
      const id = e.target.id
      console.log(id)
      const url = `https://backendexample.sanbersy.com/api/data-movie/${id}`;
      Axios.delete(url, { headers: { Authorization: `Bearer ${user.token}` } })
        .then((res) => {
          console.log(res);
          setMovies(null);
        })
        .catch((err) => {
          console.log(err);
        });
    };

 

   
      
      const handleEdit = (e) =>{
        let singleMovie = movies.find(x=> x.id === e.id)
        setInput({
          title: singleMovie.title,
          description: singleMovie.description,
          year: singleMovie.year,
          duration: singleMovie.duration,
          genre: singleMovie.genre,
          rating: singleMovie.rating,
          image_url: singleMovie.image_url
        })
        setSelectedId(e.id)
        setStatusForm("edit")
      }

      const handleVIew = (e) => {
        let movieSingle = movies.filter(el => el.id !== e.id)
        Axios.get(`https://www.backendexample.sanbersy.com/api/movies/${e.id}`).then(res => {
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
        title: "Year",
        dataIndex: "year",
        key: "year",
        tableLayout: "auto",
        sorter: {
          compare: (a, b) => a.year - b.year,
        },
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
        tableLayout: "auto",
        sorter: {
          compare: (a, b) => a.duration - b.duration,
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
        },
      },
      {
        title: "Action",
        key: "action",
        render: (el) => (
          <Space size="middle">
            <Link to={`movie/${el.id}`} >
             View
            </Link>
            <Link to={`movie/edit/${el.id}`}>
             Edit
            </Link>
              <a id={el.id} onClick={handleDelete} title="Delete">
                Delete
            </a>
            
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