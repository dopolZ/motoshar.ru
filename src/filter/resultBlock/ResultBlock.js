import {mainState} from '../../initData'
import {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import stl from './style.module.css'

function ResultBlock() {
   const [state, setState] = useState(mainState.resultBlock?.state)
   mainState.resultBlock = {state, setState}
   
   const location = useLocation()
   const navigate = useNavigate()

   const handleClick = e => {
      if ( e.target.className.includes('plugOnClick') ) {
         const id = e.target.parentElement.id

         navigate(`/lot${id}`)
      } else if (e.target.tagName === 'IMG') {
         let url = e.target.src
            .replace('image1_small', 'image_cube')
            .replace('.jpg', '_r.jpg')
         
         if (location.state?.fast) {
            navigate(location.pathname, {
               replace: true,
               state: {
                  data: url,
                  fast: 'img',
               }
            })
         } else {
            navigate(location.pathname, {
               state: {
                  data: url,
                  fast: 'img',
               }
            })
         }
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
         className={stl.resultPlate}
         onClick={handleClick}
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