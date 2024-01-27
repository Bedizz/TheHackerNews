import React from 'react'
import {useState, useEffect} from 'react'
import NewsCard from '../components/NewsCard'
import ReactPaginate from 'react-paginate'


const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [query, setQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    
    const handlePageChange = (event) => {
        setCurrentPage(event.selected);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery(searchInput);
        setCurrentPage(0);
    }

    const fetchNews = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`http://hn.algolia.com/api/v1/search?page=${currentPage}&query=${query}`);
            const data = await res.json();
            const {hits, nbPages} = data;
            setNews(hits);
            console.log(hits);
            setTotalPages(nbPages);
            console.log(nbPages);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        
        fetchNews()

    }, [currentPage,query])  
// with this currentPage dependency, the useEffect will run every time the currentPage changes

  return (
    <div className='container'>
        <h1>Hacker News</h1>
        <form className='search-form' onSubmit={handleSubmit}>
            <input type="text" placeholder='Search for the news' value={searchInput} onChange={event => setSearchInput(event.target.value)} />
            <button type='Submit'>Search</button>
        </form>
        <div className='news-container'>
            {isLoading ? <h1>Loading...</h1> : news.map((news) => (<NewsCard key={news.objectID} news={news} />))
            }
        </div>
        <ReactPaginate  nextLabel={'>>'}
        previousLabel={'<<'}
        breakLabel={'...'}
        forcePage={currentPage}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        onPageChange={handlePageChange}
        className="pagination"
        activeClassName='active'
        previousClassName='previous'
        nextClassName='next'


        />
    </div>
  )
}

export default NewsPage