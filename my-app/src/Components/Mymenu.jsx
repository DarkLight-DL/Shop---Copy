import React, { createContext, useState } from 'react'
const Mymenu = createContext()
export const MymenuProvider = ({ children }) => {

  const [sidemenu, setsidemenu] = useState('')

  const menudata = (menudata) => {
    setsidemenu(menudata)
  }
  return (
    <>
      <Mymenu.Provider value={{ sidemenu, menudata }}>
        {children}
      </Mymenu.Provider>

    </>
  )
}

export default Mymenu
