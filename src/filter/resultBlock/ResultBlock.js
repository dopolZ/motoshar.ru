import {mainState} from '../../initData'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import stl from './style.module.css'

function ResultBlock() {
   const [state, setState] = useState(mainState.resultBlock?.state)
   mainState.resultBlock = {state, setState}
   
   const history = useHistory()

   const imgOver = e => {
      if (
         e.target.tagName !== 'IMG' ||
         e.target.parentElement.className.includes('Plate')
      ) return

      let url = e.target.src
         .replace('image1_small', 'image_cube')
         .replace('.jpg', '_r.jpg')
      
      history.location.data = url
      mainState.fastBlock.setState({caption: 'img'})
   }

   const imgOut = e => {
      if (
         e.target.tagName !== 'IMG' ||
         e.target.parentElement.className.includes('Plate')
      ) return

      mainState.fastBlock.setState({})
   }

   const onClick = e => {
      if ( e.target.className.includes('plugOnClick') ) {
         const id = e.target.parentElement.id

         history.push({
            pathname: `/lot${id}`,
            from: history.location.pathname,
         })
      } else if (
         e.target.tagName === 'IMG' &&
         e.target.parentElement.className.includes('Plate')
      ) {
         let url = e.target.src
            .replace('image1_small', 'image_cube')
            .replace('.jpg', '_r.jpg')
         
            history.location.fast ?
               history.replace({
                  data: url,
                  fast: 'img',
                  from: history.location.pathname,
               })
            :
               history.push({
                  data: url,
                  fast: 'img',
                  from: history.location.pathname,
               })
      } else return
   }

   const pageUp = () => {
      const ar = document.querySelector('.arrowUp')

      if (window.pageYOffset > 500) {
         ar.classList.add('arrowUpActive')
      } else {
         ar?.classList.remove('arrowUpActive')
      }
   }

   useEffect(() => {
      window.addEventListener('scroll', pageUp)

      return () => {
         window.removeEventListener('scroll', pageUp)
      }
   })

   return (
      <div
         className={mainState.viewResult !== 'plate' ?
            stl.resultList : stl.resultPlate}
         onClick={onClick}
         onMouseOver={imgOver}
         onMouseOut={imgOut}
      >
         {state}
         <div
            className='arrowUp'
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
         >
            <span></span>
            <span></span>
         </div>
      </div>
   )
}

export default ResultBlock