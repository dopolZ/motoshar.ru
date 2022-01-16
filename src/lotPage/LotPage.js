import LotCardFull from "./lotCard/LotCardFull"
import LotCardMain from "./lotCard/LotCardMain"
import LotCardEmpty from "./lotCard/LotCardEmpty"
import NavFilter from "../nav/navFilter/NavFilter"
import {fetchLotCard} from "./fetchLotCard"
import {mainState} from "../initData"
import CloseButton from "../closeButton/CloseButton"
import {useEffect} from "react"

function LotPage(props) {
   let {id} = props.match.params

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
      full: <LotCardFull {...props} lot={lot} />,
      main: <LotCardMain {...props} lot={lot} />,
      empty: <LotCardEmpty {...props} lot={lot} />,    
   }

   const onClickClose = () => {
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
            props.history.push({
               pathname: '/online/' + lot.marka_name
                  + '/' + checkEngine(lot.eng_v),
               from: props.history.location.pathname,
            })
         } else {
            props.history.push({
               pathname: '/stat/' + lot.marka_name
                  + '/' + checkEngine(lot.eng_v)
                  + '/' + lot.model_name,
               from: props.history.location.pathname,
            })                 
         }
      } else if (mainState.fastBlock.state.caption) {
         props.history.go(-2)
      } else props.history.goBack()
   }

   useEffect(() => {
      mainState.fastBlock.setState({
         caption: props.location.fast,
         data: props.location.data,
      })

      mainState.header.setMenuMobSpan(props.location.mobMenu)
      mainState.nav.setMobOn(props.location.mobMenu)
   })

   return (
      <>
         <CloseButton
            className='lot'
            onClick={onClickClose}
         />
         {choiceLotCard[mainState.imgValidCheck(date)]}
         <NavFilter />
      </>
   )
}

export default LotPage