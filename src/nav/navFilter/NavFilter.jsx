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
      заявка: '',
      статистика: 'stat',
      торги: 'online',
      калькулятор: 'calc',
   }

   const checkUrl = () => location.pathname.split('/')[1]

   const onClick = e => {
      const target = e.target.localName === 'img' ?
         e.target.nextSibling.textContent :
         e.target.textContent
         
      if (
         target === 'заявка' ||
         target === 'заказать' ||
         target === 'калькулятор'
      ) {   
         location.state?.fast ?
            navigate(location.pathname, {
               replace: true,
               state: {
                  fast: target,
                  from: location.pathname,
               }
            })
         :
            navigate(location.pathname, {
               state: {
                  fast: target,
                  from: location.pathname,
               }
            })
      } else if (checkUrl() === navName[target] && !lotCard) {      
         if (location.state?.fast) {
            navigate(-1)
         } else return 
      } else if (
         mainState.filterBlock?.state.front ===
         navName[target.split(' ')[0]]
      ) {
         mainState.fastBlock.state ?
            navigate(-2) : navigate(-1)
      } else {
         mainState.modelBlock = {}
         mainState.filterBlock = {}
         mainState.infoBlock = {}
         mainState.resultBlock = {}

         navigate(lotCard ?
               '/' + navName[target.split(' ')[0]] + '/'
               + mainState.lotCard.state.marka_name + '/'
               + mainState.lotCard.state.eng_v + '/'
               + mainState.lotCard.state.model_name
            :
               '/' + navName[target], {
            state: {
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
               checkUrl() === navName[prop] ?
                  stl.iconActiveFilter : stl.iconFilter
            }
            key={prop}
            onClick={onClick}
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
      <nav className={navMob ? stl.navOn : stl.nav}>
         {navActive}
      </nav>
   )
}

export default NavFilter