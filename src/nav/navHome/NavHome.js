import {mainState} from '../../initData'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import stl from '../style.module.css'

function NavHome() {
   const history = useHistory()
   const [state, setState] = useState(0)
   const [mobOn, setMobOn] = useState(false)
   mainState.nav = {state, mobOn, setState, setMobOn}

   const onClick = e => {
      const headerPadding = document.documentElement.offsetWidth / 100
         * (mainState.mobile('side') ? 20 : 6)

      const section = document.querySelectorAll('section')

      const i = +e.nativeEvent.target.dataset.key ||
         +e.target.offsetParent.dataset.key || 0

      const coord = i > 0 ?
            section[i].offsetTop - headerPadding
         :
            section[i].offsetTop - (headerPadding * 4)

      window.scrollTo({top: coord, behavior: 'smooth'})

      history.push('/')
   }

   const navActive = []
   
   const navDescription = [
      'статистика',
      'торги',
      'калькулятор',
      'оплата',
      'транспортная',
      'преимущества',
      'мотосервис',
      'ответхранение',
      'контакты',
   ]

   for (let i = 0; i < navDescription.length; i++) {
      navActive.push(
         <div
            className={
               i === state ? stl.iconActive : stl.icon
            }
            data-key={i}
            onClick={onClick}
            key={i}
         >
            <img
               alt="icon"
               src={require(`../img/${navDescription[i]}.png`)}
            />
            <div>{navDescription[i]}</div>
         </div>
      )
   }

   return (
      // <nav className={history.location.mobMenu ? stl.navOn : stl.nav}>
      <nav className={mobOn ? stl.navOn : stl.nav}>
         {navActive}
      </nav>
   )
}

export default NavHome