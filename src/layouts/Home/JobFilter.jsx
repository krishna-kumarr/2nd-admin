import React from "react";
import { IoFilterSharp } from "react-icons/io5";
import FilterLabel from "../../components/Label/FilterLabel";
import HomeFilterForm from "../../components/Forms/HomeFilterForm";




const JobFilter = () => {

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <FilterLabel spanContent={"Filter"} labelHtmlFor={"skills"} lableClassName={"form-label fs-4 mb-0 job-filter-heading"} />
        <IoFilterSharp className="fs-5" />
      </div>
      <hr className="mb-3 mt-1" />

      <HomeFilterForm/>
    </>
  );
};

export default JobFilter;
