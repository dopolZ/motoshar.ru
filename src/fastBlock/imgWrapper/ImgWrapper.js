import {mainState} from "../../initData"
import {useState} from "react"
import arrowLeft from '../../img/arrowLeft.png'
import arrowRight from '../../img/arrowRight.png'
import stl from '../../style.module.css'
import {useLocation, useNavigate} from 'react-router-dom'

function ImgWrapper() {
   const location = useLocation()
   const navigate = useNavigate()
   const [state, setState] = useState()
   mainState.imgWrapper = {state, setState}

   const handleClick = () => (
      // mainState.from = location.pathname,

      navigate(-1)
   )

   const handleMouseOut = () => {
      if (!location.pathname.includes('lot')) {
         // mainState.from = location.pathname
         
         navigate(-1)
      }
   }
   
   const handleScroll = e => {
      const i =
         mainState.lotCard.srcImgsWork.indexOf(location.state?.data)
  
      if (document.documentElement.scrollWidth / 2 < e.clientX) {
         if (mainState.lotCard.srcImgsWork.length - 1 !== i) {
            location.state.data = mainState.lotCard.srcImgsWork[i + 1]         
            setState({})            
         } else {
            location.state.data = mainState.lotCard.srcImgsWork[0]
            setState({})
         }
      } else {
         if (i === 0) {
            location.state.data = mainState.lotCard.srcImgsWork[
               mainState.lotCard.srcImgsWork.length - 1
            ]
            setState({})
         } else {
            location.state.data = mainState.lotCard.srcImgsWork[i - 1]
            setState({})
         }
      }
   }
   
   return (
      <div className={mainState.lotCard?.state ?
         stl.imgWrapperLot : stl.imgWrapperPlate}
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