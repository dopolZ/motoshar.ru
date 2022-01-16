import {mainState} from "../../initData"
import {useState} from "react"
import arrowLeft from '../../img/arrowLeft.png'
import arrowRight from '../../img/arrowRight.png'
import stl from '../../style.module.css'
import {useHistory} from 'react-router-dom'

function ImgWrapper() {
   const [state, setState] = useState({})
   mainState.imgWrapper = {state, setState}

   const history = useHistory()

   const onClick = () => history.goBack()

   const onOut = () => {
      if (!mainState.lotCard?.state) {
         history.goBack()
      }
   }
   
   const scrollClick = e => {
      const i =
         mainState.lotCard.srcImgsWork.indexOf(history.location.data)
   
      if (document.documentElement.scrollWidth / 2 < e.clientX) {
         if (mainState.lotCard.srcImgsWork.length - 1 !== i) {
            history.location.data = mainState.lotCard.srcImgsWork[i + 1]
            setState({})            
         } else {
            history.location.data = mainState.lotCard.srcImgsWork[0]
            setState({})
         }
      } else {
         if (i === 0) {            
            history.location.data =
               mainState.lotCard
               .srcImgsWork[mainState.lotCard.srcImgsWork.length - 1]
            setState({})
         } else {            
            history.location.data = mainState.lotCard.srcImgsWork[i - 1]
            setState({})
         }
      }
   }
   
   return (
      <div className={
            mainState.lotCard?.state ?
               stl.imgWrapperLot
            :
            mainState.viewResult !== 'list' ?
               stl.imgWrapperPlate : stl.imgWrapperList
         }
      >
         <div
            className={mainState.lotCard?.state ?
               stl.scrllLeft : stl.scrlNo
            }
            onClick={scrollClick}
         >
            <img src={arrowLeft} alt='arrowLeft' />
         </div>
         <img
            alt='img'
            className={stl.img}
            src={history.location.data}
            onClick={onClick}
            onLoad={e => e.target.style.opacity = 1}
            onMouseOut={onOut}
         />
         <div
            className={mainState.lotCard?.state ?
               stl.scrlRight : stl.scrlNo
            }
            onClick={scrollClick}
         >
            <img src={arrowRight} alt='arrowRight' />
         </div>
      </div>
   )
}

export default ImgWrapper