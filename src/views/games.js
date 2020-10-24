import React, { useState, useEffect, useContext } from 'react';
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

const GameList = () => {
    const [user] = useContext(UserContext)
    const [games,setGames] = useState(null)
    const [input,setInput] = useState({
       name: "",
       genre:"",
       singlePlayer: "",
       multiplayer: "",
       platform: "",
       release: "",
    })
    const [selectedId, setSelectedId]  =  useState(0)
    const [statusForm, setStatusForm]  =  useState("create")
    const [search, setSearch] = useState("")
    useEffect( () => {
        if (games === null){
            Axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                setGames(res.data.map(el=>{ return {
                  id: el.id, 
                  name: el.name, 
                  genre: el.genre,
                  singlePlayer: el.singlePlayer,
                  multiplayer: el.multiplayer,
                  platform: el.platform,
                  release: el.release,
                  image_url: el.image_url
                }
              }))
            })
          }
        }, [games])
    
    const handleChange = (event) =>{
      let typeOfInput = event.target.name
  
      switch (typeOfInput){
        case "name":
        {
          setInput({...input, name: event.target.value});
          break
        }
        case "genre":
        {
          setInput({...input, genre: event.target.value});
          break
        }
        case "singlePlayer":
        {
          setInput({...input, singlePlayer: event.target.value});
            break
        }
        case "multiplayer":
        {
          setInput({...input, multiplayer: event.target.value});
            break
        }
        case "platform":
          {
            setInput({...input, platform: event.target.value});
              break
          }
        case "release":
          {
            setInput({...input, release: event.target.value});
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
  
      let nama = input.name
      console.log(input)
  
      if (nama.replace(/\s/g,'') !== ""){      
        if (statusForm === "create"){        
            Axios.post(`https://backendexample.sanbersy.com/api/data-game`, {
              name: input.name,
              genre: input.genre,
              singlePlayer: input.singlepalyer,
              multiplayer: input.multiplayer,
              platform: input.platform,
              release: input.release
            },{
              headers : { "Authorization" : `Bearer ${user.token}`} 
            })
            .then(res => {
                setGames([...games, {id: res.data.id, ...input}])
            })
          }else if(statusForm === "edit"){
            Axios.put(`https://backendexample.sanbersy.com/api/data-game/${selectedId}`, {
              name: input.name,
              description: input.description,
              singlePalyer: input.singlepalyer,
              multiplayer: input.multiplayer,
              genre: input.genre,
              release: input.release
            },{
              headers : { "Authorization" : `Bearer ${user.token}`}} )
            .then(res => {
                let singleGames = games.find(el=> el.id === selectedId)
                singleGames.name = input.name
                singleGames.genre = input.genre
                singleGames.singlePlayer = input.singlePlayer
                singleGames.multiplayer = input.multiplayer
                singleGames.platform = input.platform
                singleGames.release = input.release
                setGames([...games])
            })
          }
        
        setStatusForm("create")
        setSelectedId(0)
        setInput({
          name: "",
          genre: "",
          singlePlayer: "",
          multiplayer: "",
          platform: "",
          release: "",
          image_url: ""
        })
      }
  
    }
  
    const Action = ({itemId}) =>{
      const handleDelete = () => {  
        let newGames = games.filter(el => el.id !== itemId)
        const url = `https://backendexample.sanbersy.com/api/data-game/${itemId}`;
       
        console.log(user.token)
      
        // Axios.delete(url, {header : { Authorization : `Bearer ${user.token}`} })
        // .then(res => {
        //   console.log(res)
        // })

        Axios.delete(url, {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          data: {
          }
        }).then(res =>{
          console.log(res)
        });
              
        setGames([...newGames])
        
      }
      
      const handleEdit = () =>{
        let singleGames = games.find(x=> x.id === itemId)
        setInput({
          name: singleGames.name,
          genre: singleGames.genre,
          singlePlayer: singleGames.singlePlayer,
          multiplayer: singleGames.multiplayer,
          platform: singleGames.platform,
          release: singleGames.release,
          image_url: singleGames.image_url
        })
        setSelectedId(itemId)
        setStatusForm("edit")
      }

      const handleVIew = () => {
        let gamesSingle = games.filter(el => el.id !== itemId)
        Axios.get(`https://www.backendexample.sanbersy.com/api/games/${itemId}`).then(res => {
          console.log(res.data)
        })
        setGames([...gamesSingle])
      }
  
      return(
       
        <div className="btn-action">
          <button className="btn-edit" onClick={handleEdit}>Edit</button>
          <button className="btn-del" onClick={handleDelete}>Delete</button>
          <button className="btn-view" onClick={handleVIew} value={itemId}>
            <Link to={`/games/${itemId}`}> View </Link>
          </button>
        </div>
      )
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
      Axios.get(`https://backendexample.sanbersy.com/api/data-game`)
      .then(res => {
        let resMovies = res.data.map(el=>{ return {
            id: el.id, 
            name: el.name, 
            genre: el.genre,
            singlePlayer: el.year,
            multiplayer: el.multiplayer,
            platform: el.platform,
            rating: el.rating,
            image_url: el.image_url
          }
        })
  
        let filteredGames = resMovies.filter(x=> x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        setGames([...filteredGames])
      })
   
    }
  
    const handleChangeSearch = (e)=>{
      setSearch(e.target.value)
    }
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "title",
        width: 200,
      },
      {
        title: "Genre",
        dataIndex: "genre",
        key: "genre",
      },
      {
        title: "Pingleplayer",
        dataIndex: "singlePlayer",
        key: "singlePlayer",
        tableLayout: "auto",
      },
      {
        title: "Multiplayer",
        dataIndex: "multiplayer",
        key: "multiplayer",
        tableLayout: "auto",
      },
      {
        title: "Platform",
        dataIndex: "platform",
        key: "platform",
      },
      {
        title: "Release",
        dataIndex: "release",
        key: "release",
        tableLayout: "auto",
        sorter: {
          compare: (a, b) => a.release - b.release,
          multiple: 1,
        },
      },
      {
        title: "Action",
        key: "action",
        render: (e) => (
          <Space size="middle">
            <Link to={`games/${e.id}`} >
              <Button>View</Button>
            </Link>

            <Link to={`games/edit/${e.id}`}>
              <Button>Edit</Button>
            </Link>
          
            <Button id={e.id}  title="Delete">
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
            <h1>daftar Games</h1>
            <form className="search" onSubmit={submitSearch}>
            <input type="text" value={search} onChange={handleChangeSearch} />
            <button>search</button>
            </form>
            <Table columns={columns} dataSource={games}  />
        </div>
            <div className="content">
                <h1>Form Submit New Games</h1>
                <form className="form-input" onSubmit={handleSubmit}>
                <div className="input">
                    <label >
                    Name:
                    </label>
                    <input type="text" name="name" value={input.name} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="input">
                    <label >
                    Genre:
                    </label>
                    <textarea type="text" name="genre" value={input.genre} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="input" style={{marginTop: "20px"}}>
                    <label >
                    singlePlayer:
                    </label>
                    <input type="text" name="singlePlayer" value={input.singlePlayer} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="input" style={{marginTop: "20px"}}>
                    <label >
                    Multiplayer:
                    </label>
                    <input type="text" name="multiplayer" value={input.multiplayer} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="input" style={{marginTop: "20px"}}>
                    <label >
                    Platform:
                    </label>
                    <input type="text" name="platform" value={input.platform} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="input" style={{marginTop: "20px"}}>
                    <label >
                    Release:
                    </label>
                    <input type="text" name="release" value={input.release} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="input" style={{marginTop: "20px"}}>
                    <label >
                    Image Url:
                    </label>
                    <input type="text" cols="50" rows="3" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
                    <br/>
                    <br/>
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
export default GameList