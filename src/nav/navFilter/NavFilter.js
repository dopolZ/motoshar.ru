import stl from '../style.module.css'
import {useHistory, useRouteMatch} from 'react-router-dom'
import { mainState } from '../../initData'
import {useState} from 'react'

function NavFilter () {
   const history = useHistory()
   const match = useRouteMatch()
   const [mobOn, setMobOn] = useState(false)
   mainState.nav = {mobOn, setMobOn}

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
         
      if (target === 'заявка' || target === 'калькулятор') {   
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
         navName[target].slice(1)
      ) {
         mainState.fastBlock.state.caption ?
            history.go(-2) : history.goBack()
      } else {
         mainState.modelBlock = {}
         mainState.filterBlock = {}
         mainState.infoBlock = {}
         mainState.resultBlock = {}

         history.push({
            pathname: navName[target],
            from: match.url,
         })
      }
   }

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
               src={require(`../img/${prop}.png`)}
            />
            <div>{prop}</div>
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