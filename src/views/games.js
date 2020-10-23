import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Table,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { UserContext } from '../context/user-context'

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
  
      return(
        <>
          <button onClick={handleEdit}>Edit</button>
          &nbsp;
          <button onClick={handleDelete}>Delete</button>
        </>
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
  
    return(
      <>
      <div className="container">
            <div className="content">
            <form onSubmit={submitSearch}>
                <input type="text" value={search} onChange={handleChangeSearch} />
                <button>search</button>
            </form>
            </div>
        </div>
      <div className="container">
            <div className="content">
                <h1>daftar Games</h1>
                <Table>
                    <thead>
                        <tr>
                            <th scope="row"></th>
                            <th>No</th>
                            <th>Name</th>
                            <th>Genre</th>
                            <th>singlePlayer</th>
                            <th>Multiplayer</th>
                            <th>platform</th>
                            <th>Release</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            games !== null && games.map((item, index)=>{
                                return(                    
                                    <tr key={index}>
                                    <th scope="row"></th>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.singlePlayer}</td>
                                    <td>{item.multiplayer}</td>
                                    <td>{item.platform}</td>
                                    <td>{item.release}</td>
                                    <td>
                                       <Action itemId={item.id} />
                                    </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
        <div className="container">
            <div className="content">
                <h1>Movies Form</h1>
                <form onSubmit={handleSubmit}>
                <div>
                    <label style={{float: "left"}}>
                    Name:
                    </label>
                    <input style={{float: "right"}} type="text" name="name" value={input.name} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div>
                    <label style={{float: "left"}}>
                    Genre:
                    </label>
                    <textarea style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div style={{marginTop: "20px"}}>
                    <label style={{float: "left"}}>
                    singlePlayer:
                    </label>
                    <input style={{float: "right"}} type="text" name="singlePlayer" value={input.singlePlayer} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div style={{marginTop: "20px"}}>
                    <label style={{float: "left"}}>
                    Multiplayer:
                    </label>
                    <input style={{float: "right"}} type="text" name="multiplayer" value={input.multiplayer} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div style={{marginTop: "20px"}}>
                    <label style={{float: "left"}}>
                    Platform:
                    </label>
                    <input style={{float: "right"}} type="text" name="platform" value={input.platform} onChange={handleChange}/>
                    <br/>
                    <br/>
                </div>
                <div style={{marginTop: "20px"}}>
                    <label style={{float: "left"}}>
                    Release:
                    </label>
                    <input style={{float: "right"}} type="text" name="release" value={input.release} onChange={handleChange}/>
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
export default GameList