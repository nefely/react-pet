import MarketPlace from './component/MarketPlace.jsx'
import './App.css'
import store from './store.js'
import { useState } from 'react'

function App() {
    let [currentPage, setCurrentPage] = useState(1);
    let [itemsPerPage, setItemsPerPage] = useState(4);

    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    const [filter, setFilter] = useState("")

    let products = store.products

    let filteredProducts = products.filter( product => 
        product.name.toLowerCase().includes( filter.toLowerCase() ) ||
        product.category.toLowerCase().includes( filter.toLowerCase() )
    )

    let paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const nextPage = () => {
        if ( (currentPage * itemsPerPage) >= filteredProducts.length ) return;
        setCurrentPage(currentPage + 1);
    }

    const previousPage = () => {
        if ( currentPage === 1 ) return;
        setCurrentPage(currentPage - 1);
    }

    const increaseItemsPerPage = () => {
        setItemsPerPage(itemsPerPage + 4);
        setCurrentPage(1);
    }

    return (
            <div className='container mb-4 mt-4'>
                <h1 className='text-center mb-4'>Market Place</h1>
                
                <div className='filter mb-3'>
                    <div className="input-group ">
                        <span className="input-group-text" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 3.5 0.5 18 18" height="18" viewBox="3.5 .5 18 18" width="18"><g fill="none" stroke="#212529" strokeMiterlimit="10" strokeWidth="2"><circle cx="10.5" cy="7.5" r="6"/><path d="m20.531 17.531-6.031-6.031"/></g><script xmlns=""/><script xmlns=""/></svg></span>
                        <input type="text" placeholder='Product name or category' className="form-control" value={filter} onChange={(e) => { setFilter(e.target.value); setCurrentPage(1) }} />
                    </div>
                </div>
                
                <div className='shop mb-3'>
                    {paginatedProducts.map((product) => (
                        <MarketPlace key={product.code} data={product} />
                    ))}
                </div>

                <div className='pagination btn-group'>
                    {currentPage > 1 && <button className='btn btn-secondary' onClick={previousPage}>Previous</button>}
                    {filteredProducts.length > itemsPerPage && <button className='btn btn-secondary' disabled={filteredProducts.length <= itemsPerPage} onClick={increaseItemsPerPage}>Show more</button>}
                    {currentPage * itemsPerPage < filteredProducts.length && <button className='btn btn-secondary' disabled={(currentPage * itemsPerPage) >= filteredProducts.length} onClick={nextPage}>Next</button>}  
                </div>
            </div>
    )
}

export default App
