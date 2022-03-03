import stl from '../style.module.css'
import {useLocation, useNavigate} from 'react-router-dom'
import { mainState } from '../../initData'
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

   const getStartUrl = () => location.pathname.split('/')[1]

   const handleClick = e => {
      const target = e.target.localName === 'img' ?
         e.target.nextSibling.textContent :
         e.target.textContent

      const fastVisible =
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
            replace: fastVisible,
            state: {
               from: location.pathname,
            }
         })
      } else if (target === 'заказать') {
         navigate(location.pathname, {
            replace: fastVisible,
            state: {
               fast: target,
               from: location.pathname,
            }
         })
      } else {
         navigate(navName[target], {
            replace: fastVisible,
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
      navActive.push(
         <div
            className={
               lotCard ? stl.iconFilter :
               getStartUrl() === navName[prop] ?
                  stl.iconActiveFilter : stl.iconFilter
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