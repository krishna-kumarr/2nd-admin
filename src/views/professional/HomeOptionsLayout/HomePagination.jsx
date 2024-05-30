import React, { useContext, useEffect, useState } from 'react'
import CommonContext from '../../../hooks/CommonContext';
import ReactPaginate from 'react-paginate';

const HomePagination = () => {
    const { currentPage, setCurrentPage,paginationpageCount,getHomeAll,getAppliedDatas,getSavedDatas,sortBy, setSortBy } = useContext(CommonContext);

    const handlePageClick = (value) => {  
        setSortBy("")
        setCurrentPage(value.selected)
        if(window.location.pathname==="/professional/home/all_jobs"){
            getHomeAll("pagination",value.selected+1)
        }
        else if(window.location.pathname==="/professional/home/applied_jobs"){
            getAppliedDatas("pagination",value.selected+1)
        }
        else if(window.location.pathname==="/professional/home/saved_jobs"){
            getSavedDatas("pagination",value.selected+1)
        }
    }


    return (
        <>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={'...'}
                pageCount={paginationpageCount}
                forcePage={currentPage}
                pageRangeDisplayed={1}
                onPageChange={handlePageClick} 
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link "}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </>
    )
}

export default HomePagination
