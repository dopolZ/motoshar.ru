import { createContext, useState } from "react"

export const CurrencyContext = createContext(null)

export const Currency = ({children}) => {
   const [currency, setCurrency] = useState({jpy: 0, usd: 0})

   return (
      <CurrencyContext.Provider value={{currency, setCurrency}}>
         {children}
      </CurrencyContext.Provider>
   )
}