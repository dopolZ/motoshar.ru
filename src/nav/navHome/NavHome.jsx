import {mainState} from '../../initData'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import stl from '../style.module.css'

function NavHome() {
   const navigate = useNavigate()
   const [state, setState] = useState(0)
   const [navMob, setNavMob] = useState(false)
   mainState.nav = {state, navMob, setState, setNavMob}

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

      navigate('/', {replace: true})
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
      <nav className={navMob ? stl.navMob : stl.nav}>
         {navActive}
      </nav>
   )
}

export default NavHome