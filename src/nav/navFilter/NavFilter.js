import stl from '../style.module.css'
import {useHistory, useRouteMatch} from 'react-router-dom'
import { mainState } from '../../initData'
import {useState} from 'react'

function NavFilter () {
   const history = useHistory()
   const match = useRouteMatch()
   const [state, setState] = useState({})
   const [mobOn, setMobOn] = useState(false)
   mainState.nav = {mobOn, setMobOn, state, setState}

   const navActive = []
   const lotCard = history.location.pathname.includes('lot')

   const navName = {
      заявка: '',
      статистика: '/stat',
      торги: '/online',
      калькулятор: '/calc',
   }

   const onClick = e => {
      const target = e.target.localName === 'img' ?
         e.target.nextSibling.textContent :
         e.target.textContent
         
      if (
         target === 'заявка' ||
         target === 'заказать' ||
         target === 'калькулятор'
      ) {   
         history.location.fast ?
            history.replace({
               fast: target,
               from: history.location.pathname,
            })
         :
            history.push({
               fast: target,
               from: history.location.pathname,
            })
      } else if (match.url === navName[target] && !lotCard) {      
         if (history.location.fast) {
            history.goBack()
         } else return 
      } else if (
         mainState.filterBlock?.state.front ===
         navName[target.split(' ')[0]].slice(1)
      ) {
         mainState.fastBlock.state.caption ?
            history.go(-2) : history.goBack()
      } else {
         mainState.modelBlock = {}
         mainState.filterBlock = {}
         mainState.infoBlock = {}
         mainState.resultBlock = {}

         history.push({
            pathname: lotCard ?
                  navName[target.split(' ')[0]] + '/'
                  + mainState.lotCard.state.marka_name + '/'
                  + mainState.lotCard.state.eng_v + '/'
                  + mainState.lotCard.state.model_name
               :
                  navName[target],
            from: match.url,
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
               match.url === navName[prop] ?
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
      <nav className={mobOn ? stl.navOn : stl.nav}>
         {navActive}
      </nav>
   )
}

export default NavFilter