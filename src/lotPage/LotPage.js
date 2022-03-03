import LotCardFull from "./lotCard/LotCardFull"
import LotCardMain from "./lotCard/LotCardMain"
import LotCardEmpty from "./lotCard/LotCardEmpty"
import NavFilter from "../nav/navFilter/NavFilter"
import {fetchLotCard} from "./fetchLotCard"
import {mainState} from "../initData"
import CloseButton from "../closeButton/CloseButton"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import {useEffect} from "react"

function LotPage() {
   const location = useLocation()
   const navigate = useNavigate()
   const params = useParams()

   let {id} = params

   if (mainState.lotCard?.state?.id !== id) fetchLotCard(id)   

   const lot = mainState.cache.lotsFilter ?
      mainState.cache.lotsFilter.find(e => e.id === id) : ''

   const date = lot ?
      lot.auction_date.slice(0, 10)
      :
      (
         id = id.slice(0, 8).split(''),
         id.splice(4, 0, '-'), id.splice(-2, 0, '-'),
         id = id.join(''), id
      )
   
   const choiceLotCard = {
      full: <LotCardFull lot={lot} />,
      main: <LotCardMain lot={lot} />,
      empty: <LotCardEmpty lot={lot} />,    
   }

   const handleClickClose = () => {
      if (!mainState.selectBlock.brand) {
         const lot = mainState.lotCard.state
         let date = lot.auction_date.slice(0, 10)
         date = (Date.parse(date) + 86400000) - Date.now()

         const checkEngine = num =>
            num <= 250 ? '250' :
            num >= 251 && num <= 400 ? '251-400' :
            num >= 401 && num <= 750 ? '401-750' :
            num >= 751 && num <= 1300 ? '751-1300' : '1301'

         if (date >= 0) {
            navigate(
               '/online/' + lot.marka_name + '/' + checkEngine(lot.eng_v),
               {
                  state: {
                     from: location.pathname,
                  }
               }
            )
         } else {
            navigate(
               '/stat/' + lot.marka_name + '/' + checkEngine(lot.eng_v)
               + '/' + lot.model_name,
               {
                  state: {
                     from: location.pathname,
                  }
               }
            )                 
         }
      } else if (mainState.fastBlock.state) {
         navigate(-2)
      } else navigate(-1)
   }

   useEffect(() => {
      mainState.fastBlock.setState(location.state?.fast)

      mainState.header.setMenuMob(location.state?.navMob)
      mainState.nav.setNavMob(location.state?.navMob)
   })

   return (
      <>
         <CloseButton
            className='lot'
            onClick={handleClickClose}
         />
         {choiceLotCard[mainState.imgValidCheck(date)]}
         <NavFilter />
      </>
   )
}

export default LotPage