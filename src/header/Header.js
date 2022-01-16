import stl from './style.module.css'
import {mainState} from '../initData'
import {useHistory} from 'react-router-dom'
import {useState} from 'react'
import Preloader from '../Preloader'

function Header() {
   const history = useHistory()

   const [menuMobSpan, setMenuMobSpan] = useState(false)
   mainState.header = {menuMobSpan, setMenuMobSpan}

   const SpanMob = props => {
      
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

   const onClick = () => {
      setMenuMobSpan()
      mainState.nav.setMobOn()
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

      history.push('/')
   }

   const onClickMob = () => {
      if ( !mainState.mobile('side') ) return
      
      if (!menuMobSpan) {
         history.push({
            mobMenu: !menuMobSpan,
            from: history.location.pathname,
         })
      } else {
         history.goBack()
      }
   }

   return (
      <header className={stl.header}>
         <div
            className={stl.logoDiv}
            onClick={onClick}
         >  
            <Preloader />
            <div className={stl.text}>
               <p>MOTOSHAR</p>
               <h1>мотоциклы аукционов Японии</h1>
            </div>
         </div>
         <div
            className={stl.address}
            onClick={onClickMob}
         >
            <p className={stl.addressP}>{mainState.mainData.address}</p>
            <SpanMob on={menuMobSpan} />
         </div>
         <div className={stl.phone}>
            <p>{mainState.mainData.cellphone}</p>
         </div>
      </header>
   )
}

export default Header
