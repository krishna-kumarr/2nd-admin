import React from 'react'

const FilterLabel = ({ spanContent, spanClassName, lableClassName, labelHtmlFor }) => {
    return (
        <label htmlFor={labelHtmlFor} className={lableClassName}>
             <span className={spanClassName}>{spanContent}</span>
        </label>
    )
}

export default FilterLabel
