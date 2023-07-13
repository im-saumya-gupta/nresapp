import React,{useState,useContext} from 'react'
import {SearchKey} from '../App'
const Search = () => {
const defineQuery = useContext(SearchKey);
const [search, setSearch] = useState();
  return (
    <div>
     <form sction='#' className="d-flex" onSubmit={(e)=> e.preventDefault()}>
      <input className="form-control me-2" type="text" placeholder="Search"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        aria-label="Search"/>
        <button className="btn btn-outline-primary" type="submit" onClick={()=>{defineQuery(search)}}>Search</button>
    </form>
    </div>
  )
}

export default Search

