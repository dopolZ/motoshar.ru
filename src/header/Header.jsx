import stl from './style.module.css'
import {mainState} from '../initData'
import {useLocation, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import Preloader from '../Preloader'

function Header() {
   const location = useLocation()
   const navigate = useNavigate()

   const [menuMob, setMenuMob] = useState(false)
   mainState.header = {menuMob, setMenuMob}

   const MenuMobSpan = props => {
      
      return (
         <>
            <span className={props.on ? 
               stl.menuMobOnSpan1 : stl.menuMob} />
            <span className={props.on ?
               stl.menuMobOnSpan2 : stl.menuMob} />
            <span className={props.on ?
               stl.menuMobOnSpan3 : stl.menuMob} />
         </>
      )
   }

   const handleClickLogo = () => {
      setMenuMob()
      mainState.nav.setNavMob()
      mainState.preloader.setState()
      mainState.resultBlock = {}
      mainState.cache = {
         lotsFetch: '',
         modelsFetch: '',
         lotsFilter: '',
         lotsFilterJsx: '',
         modelsFilter: '',
         modelsFilterJsx: '',
         resultFindLotNum: {},
      }

      window.scrollTo({top: 0, behavior: 'smooth'})

      navigate('/', {
         replace: location.pathname === '/' ? true : false
      })
   }

   const handleClickMenu = () => {
      if ( !mainState.mobile('side') ) return
      
      if (!menuMob) {
         navigate(location.pathname, {
            state: {
               navMob: !menuMob,
               from: location.pathname,
            }
         })
      } else {
         navigate(location.pathname)
      }
   }

   return (
      <header className={stl.header}>
         <div
            className={stl.logoDiv}
            onClick={handleClickLogo}
         >  
            <Preloader />
            <div className={stl.text}>
               <p>MOTOSHAR</p>
               <h1>мотоциклы аукционов Японии</h1>
            </div>
         </div>
         <div
            className={stl.address}
            onClick={handleClickMenu}
         >
            <p className={stl.addressP}>{mainState.mainData.address}</p>
            <MenuMobSpan on={menuMob} />
         </div>
         <div className={stl.phone}>
            <p>{mainState.mainData.cellphone}</p>
         </div>
      </header>
   )
}

export default Header
