import { CurrencyContext } from "./Currency"
import { useContext } from "react"

export default function useCurrency() {
   return useContext(CurrencyContext)
}