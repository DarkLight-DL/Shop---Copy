import React, { createContext, useState } from 'react'

const Mysearch = createContext()

export const MysearchProvider = ({ children }) => {

  const [search, setscarch] = useState('')

  const searchdata = (data) => {
    setscarch(data)
  }

  return (
    <>
      <Mysearch.Provider value={{ search, searchdata }}>
        {children}

      </Mysearch.Provider>

    </>
  )
}

export default Mysearch
