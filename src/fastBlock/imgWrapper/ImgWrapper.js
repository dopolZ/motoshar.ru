import {mainState} from "../../initData"
import {useState} from "react"
import arrowLeft from '../../img/arrowLeft.png'
import arrowRight from '../../img/arrowRight.png'
import stl from '../../style.module.css'
import {useLocation, useNavigate} from 'react-router-dom'

function ImgWrapper() {
   const [state, setState] = useState()
   mainState.imgWrapper = {state, setState}

   const location = useLocation()
   const navigate = useNavigate()

   const handleClick = () => navigate(location.pathname, {
         replace: true,
         state: {
            from: location.pathname,
         }
      })

   const handleMouseOut = () => navigate(location.pathname, {
         replace: true,
         state: {
            from: location.pathname,
         }
      })
   
   const handleScroll = e => {
      const i =
         mainState.lotCard.srcImgsWork.indexOf(navigate.location.data)
   
      if (document.documentElement.scrollWidth / 2 < e.clientX) {
         if (mainState.lotCard.srcImgsWork.length - 1 !== i) {
            setState(mainState.lotCard.srcImgsWork[i + 1])            
         } else {
            setState(mainState.lotCard.srcImgsWork[0])
         }
      } else {
         if (i === 0) {
            setState(
               mainState.lotCard.srcImgsWork[
                  mainState.lotCard.srcImgsWork.length - 1
               ]
            )
         } else {
            setState(mainState.lotCard.srcImgsWork[i - 1])
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
            onClick={handleScroll}
         >
            <img src={arrowLeft} alt='arrowLeft' />
         </div>
         <img
            alt='img'
            className={stl.img}
            src={location.state?.data}
            onClick={handleClick}
            onMouseOut={handleMouseOut}
            onLoad={e => e.target.style.opacity = 1}
         />
         <div
            className={mainState.lotCard?.state ?
               stl.scrlRight : stl.scrlNo
            }
            onClick={handleScroll}
         >
            <img src={arrowRight} alt='arrowRight' />
         </div>
      </div>
   )
}

export default ImgWrapper