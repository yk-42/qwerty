import './index.css'
import React from 'react'
import PropTypes from 'prop-types'

export function ErrorPage({ errorCode, errorMessage }) {
  return (
    <div className="error-container">
      <div>
        <h1 className="error-code">{errorCode || '404'}</h1>
        <div className="error-text-container">
          <h2 className="error-text">
            {errorMessage || 'This page could not be found'}
          </h2>
        </div>
      </div>
    </div>
  )
}

ErrorPage.propTypes = {
  errorCode: PropTypes.string,
  errorMessage: PropTypes.string
}
