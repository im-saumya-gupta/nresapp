import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import React ,{useState,createContext} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
const SearchKey = createContext();
const q = createContext();
const App =() =>{
  const pageSize = 5;
 
const [progress, setProgress] = useState(0)
const [query,setQuery] = useState();
const defineQuery =(temp)=>{
  setQuery(temp);
}
    return (
        <SearchKey.Provider value={defineQuery}>
          <q.Provider value={query}>
        <Router>
        <Navbar/>
        <LoadingBar height={3} color='#f11946' progress={progress}/>
          <Routes>
          <Route  exact path="/" element={<News setProgress={setProgress} key='general' pageSize={pageSize} country="in" category='general'/>} />
            <Route  exact path="business" element={<News setProgress={setProgress} key='business' pageSize={pageSize} country="in" category='business'/>} />
            <Route  exact path="entertainment" element={<News setProgress={setProgress} key='entertainment' pageSize={pageSize} country="in" category='entertainment'/>} />
            <Route  exact path="health" element={<News setProgress={setProgress} key='health' pageSize={pageSize} country="in" category='health'/>} />
            <Route  exact path="science" element={<News setProgress={setProgress} key='science' pageSize={pageSize} country="in" category='science'/>} />
            <Route  exact path="sports" element={<News setProgress={setProgress} key='sports' pageSize={pageSize} country="in" category='sports'/>} />
            <Route  exact path="technology" element={<News setProgress={setProgress} key='technology' pageSize={pageSize} country="in" category='technology'/>} />
          </Routes>
          </Router>
          </q.Provider>
        </SearchKey.Provider>
    )
}

export default App;
export {SearchKey,q}