import React,{useEffect,useState,useContext} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import {q} from '../App'
const News = (props) => {
    const query = useContext(q);
    console.log(query)
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

     const updateNews = async()=>{
        console.log("update news")
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=719a0188765c4be1b80b98ad12377c18&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        console.log(parsedData)
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
     }

     const searchQuery = async() =>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=719a0188765c4be1b80b98ad12377c18`;
        setLoading(true)
        let data = await fetch(url);
        console.log(data)
        props.setProgress(30);
        let parsedData = await data.json();
        if(parsedData.totalResults===0)
            alert("Try to search for another keyword")
        console.log(parsedData)
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
     }
     useEffect(()=>{
        document.title = `${capitalizeFirstLetter(props.category)} - News`;
        if(query===undefined)
            updateNews()
        else
            searchQuery();
     },[query])
    
    // const handleNextClick = async()=>{
    //     setPage(page-1)
    //     updateNews();
    // }
    // const handlePrevClick = async()=>{
    //     setPage(page+1)
    //     updateNews();
    // }

    const fetchMoreData = async()=>{
       const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=719a0188765c4be1b80b98ad12377c18&page=${page+1}&pageSize=${props.pageSize}`;
        //const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=719a0188765c4be1b80b98ad12377c18&page=${page+1}&pageSize=${props.pageSize}&q=${query}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)  
    }
  
    return (
        <>
            <h1 className='text-center' style={{
                margin: '35px 0px', marginTop: '90px'
            }}>Top {capitalizeFirstLetter(props.category)} Headlines </h1>
            {loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element)=>{
                            return <div className="col-md-4" key={element.url}>
                            <NewsItem author={element.author}
                            source={element.source.name}
                            date={element.publishedAt}
                            newsUrl={element.url}
                            title={element?element.title:""} 
                            description={element?element.description:""} 
                            imageUrl={element.urlToImage}/>
                        </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type='button' className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/props.pageSize)} type='button' className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
     */}
        </>
    )
  
}

News.defaultProps = {
    country:'in',
    pageSize:8,
    category:'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News

