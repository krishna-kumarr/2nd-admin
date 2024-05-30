import React from 'react'

const Badge = ({currentPlan}) => {
  return (
    <span className={`position-absolute top-0 start-50 translate-middle badge rounded-pill btn-brand-color ${currentPlan ? null:'d-none'}`}>
        Current Plan
        <span className="visually-hidden">unread messages</span>
      </span>
  )
}

export default Badge