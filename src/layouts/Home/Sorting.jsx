import React, { useContext, useState } from 'react'
import CommonContext from '../../hooks/CommonContext';

const Sorting = ({ sortBy, setSortBy, setFilter }) => {

    const { setAnswer,setSelectedCardIndex,currentPage, setCurrentPage, setCardArrayDuplicateSearch, setCardArray, setSelectedCardData, gettingResponse, setCardArrayDuplicate, cardArrayDuplicate } = useContext(CommonContext);

    const handleSortingFilter = (sortValue) => {
        setCurrentPage(1)
        setSelectedCardIndex(0);
        setAnswer([])
        if (cardArrayDuplicate.length > 0) {
            setFilter(sortValue)
            switch (sortValue) {
                case "DateLatest":
                    setSortBy("Date Posted")
                    var sorting = cardArrayDuplicate.sort(function (a, b) {
                        let d1 = new Date(a.created_at),
                            d2 = new Date(b.created_at)
                        if (d1 > d2) {
                            return -1;
                        }
                    })
                    setCardArray(sorting)
                    setCardArrayDuplicate(sorting)

                    if (sorting[0].questions === undefined) {
                        var obj = { ...sorting[0] }
                        obj.questions = []

                        setSelectedCardData([obj])

                    } else {
                        setSelectedCardData([sorting[0]])
                        sorting[0].questions.map((v) => {
                            setAnswer((prevState) => [
                                ...prevState,
                                { question_id: v.id, answer: "" },
                            ]);
                        });
                    }
                    var jobCards = sorting.slice(0, 10)
                    setCardArrayDuplicateSearch(jobCards)
                    setCurrentPage(currentPage);
                    break;


                case "NameAscending":
                    setSortBy("A-Z")

                    var sorting = cardArrayDuplicate.sort(function (a, b) {
                        if (a.job_title.toLowerCase() < b.job_title.toLowerCase()) {
                            return -1;
                        }
                    })
                    setCardArray(sorting)
                    setCardArrayDuplicate(sorting)


                    if (sorting[0].questions === undefined) {
                        var obj = { ...sorting[0] }
                        obj.questions = []

                        setSelectedCardData([obj])
                    } else {
                        setSelectedCardData([sorting[0]])
                        sorting[0].questions.map((v) => {
                            setAnswer((prevState) => [
                                ...prevState,
                                { question_id: v.id, answer: "" },
                            ]);
                        });
                    }

                    var jobCards = sorting.slice(0, 10)
                    setCardArrayDuplicateSearch(jobCards);
                    setCurrentPage(currentPage);
                    break;


                case "NameDescending":
                    setSortBy("Z-A")

                    var sorting = cardArrayDuplicate.sort(function (a, b) {
                        if (b.job_title.toLowerCase() < a.job_title.toLowerCase()) {
                            return -1;
                        }
                    })
                    setCardArrayDuplicate(sorting)
                    setCardArray(sorting)


                    if (sorting[0].questions === undefined) {
                        var obj = { ...sorting[0] }
                        obj.questions = []

                        setSelectedCardData([obj])
                    } else {
                        setSelectedCardData([sorting[0]])
                        sorting[0].questions.map((v) => {
                            setAnswer((prevState) => [
                                ...prevState,
                                { question_id: v.id, answer: "" },
                            ]);
                        });
                    }

                    var jobCards = sorting.slice(0, 10)
                    setCardArrayDuplicateSearch(jobCards);
                    setCurrentPage(currentPage);
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <div className="col-12 col-sm-6 dropdown custom-dropdown">
            {
                gettingResponse === false ? <label className=" w-100">
                    <span className="placeholder w-100 rounded py-2 pt-3"></span>
                </label>
                    :
                    <div className='d-flex align-items-center pt-3 pt-sm-0'>
                        <div className='col-3 col-sm-4 text-start text-sm-end pe-2'>
                            <label className='m-0 filter-results'>Sort By</label>
                        </div>
                        <div className='col-9 col-sm-8'>
                            <button id='professionalHomeSortBy' className="btn btn-secondary dropdown-toggle w-100 border-0 outline-none filter-section" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                {sortBy === "" ? "--default--" : sortBy}
                            </button>
                            <ul className="dropdown-menu col" >
                                <li id='professionalDatePosted' onClick={() => handleSortingFilter("DateLatest")}><a className="dropdown-item" >Date Posted</a></li>
                                <li id='professionalA-Z' onClick={() => handleSortingFilter("NameAscending")}><a className="dropdown-item" >A-Z</a></li>
                                <li id='professionalZ-A' onClick={() => handleSortingFilter("NameDescending")}><a className="dropdown-item" >Z-A</a></li>
                            </ul>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Sorting
