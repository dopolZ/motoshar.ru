import stl from '../style.module.css'
import {useLocation, useNavigate} from 'react-router-dom'
import {mainState} from '../../initData'
import {useState} from 'react'

function NavFilter () {
   const navigate = useNavigate()
   const location = useLocation()
   const [state, setState] = useState({})
   const [navMob, setNavMob] = useState(false)
   mainState.nav = {navMob, setNavMob, state, setState}

   const navActive = []
   const lotCard = location.pathname.includes('lot')

   const navName = {
      заявка: location.pathname,
      статистика: '/stat',
      торги: '/online',
      калькулятор: location.pathname,
   }

   const handleClick = e => {
      let target = e.target.localName === 'img' ?
         e.target.nextSibling.textContent : e.target.textContent

      const fastIsVisible =
         (mainState.fastBlock.state && true) || mainState.mobile('side')

      if (lotCard && target.includes('статистика') ) {
         mainState.modelBlock = {}
         mainState.filterBlock = {}
         mainState.infoBlock = {}
         mainState.resultBlock = {}

         navigate(
            '/stat/'
            + mainState.lotCard.state.marka_name + '/'
            + mainState.lotCard.state.eng_v + '/'
            + mainState.lotCard.state.model_name, {
            replace: fastIsVisible,
            state: {
               from: location.pathname,
            }
         })
      } else {
         target = target === 'заказать' ? 'заявка' : target
         navigate(navName[target], {
            replace: fastIsVisible,
            state: {
               fast: target,
               from: location.pathname,
            }
         })
      }
   }

   const getImg = str => str === 'заявка' && lotCard ?
         require(`../img/заказать.png`)
      :
         require(`../img/${str}.png`)

   const getCaption = str =>
      str === 'статистика' && lotCard ?
         (
            <div className={stl.statName}>
               статистика <br />
               {mainState.lotCard.state.model_name}
            </div>
         )
      :
      str === 'заявка' && lotCard ?
         <div>заказать</div> : <div>{str}</div>

   for (const prop in navName) {
      let fast = location.state?.fast === 'заказать' ?
         'заявка' : location.state?.fast
      
      navActive.push(
         <div
            className={
               fast === prop ? stl.iconActiveFilter :
               location.pathname.includes('online') &&
               !fast && prop === 'торги' ? stl.iconActiveFilter :
               location.pathname.includes('stat') &&
               !fast && prop === 'статистика' ? stl.iconActiveFilter
                  : stl.iconFilter
            }
            key={prop}
            onClick={handleClick}
         >
            <img
               alt="icon"
               src={getImg(prop)}
            />
            {getCaption(prop)}
         </div>
      )
   }

   return (
      <nav className={navMob ? stl.navMob : stl.nav}>
         {navActive}
      </nav>
   )
}

export default NavFilter