import FindLotNum from './findLotNum/FindLotNum'
import SelectBlock from './selectBlock/SelectBlock'
import InfoBlock from './infoBlock/InfoBlock'
import ResultBlock from './resultBlock/ResultBlock'
import FilterBlock from './filterBlock/FilterBlock'
import NavFilter from '../nav/navFilter/NavFilter'
import {fetchDateAuction} from './fetchDateAuction'
import {fetchCountLots} from './fetchCountLots'
import {mainState, markaId} from '../initData'
import {fetchModelBlock} from './fetchModelBlock'
import {fetchResultBlockStat} from './fetchResultBlockStat'
import {fetchFindLotNum} from './fetchFindLotNum'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import stl from './filter.module.css'

const Heading = ({front}) => {
   const [state, setState] = useState(<>&emsp;</>)
   mainState.filterHeading = {setState}

   const heading = front === 'online' ?
      <div className={stl.h1h2}>
         <h1>торги</h1>
         <h2>{state}</h2>
      </div> :
      <div className={stl.h1h2}>
         <h1>статистика</h1>
         <h2>{state}</h2>
      </div>

   return heading
}

function Filter() {
   const location = useLocation()
   const pathname = location.pathname.split('/')
   
   const parseModels = () => {
      if (!pathname[4]) return {}
      
      const res = {}
      pathname[4].split('<>').forEach(e => res[e] = '')
      
      return res
   }
   
   const url = mainState.filter.front = pathname[1]

   const newSelect = pathname[2]?.includes('find') ?
      {
         brand: '',
         markaId: '',
         engine: '',
         model: {},
      }
      :
      {
         brand: pathname[2] in markaId ? pathname[2] : '',
         engine: pathname[2] && +pathname[2].replace('-', '') ?
            pathname[2] :
            pathname[3] && +pathname[3].replace('-', '') ?
            pathname[3] : '',
         model: parseModels(),
      }

   if (
      location.pathname === mainState.from
   ) {
      console.log(1)
      mainState.needFetchModelBlock = false            
   } else if (
      pathname[2]?.includes('find') &&
      mainState.cache.lotsFilter[0]?.lot_num !==
      mainState.lastFindLotNum
   ) {
      console.log(2)
      fetchFindLotNum(pathname[2].slice(4))

      mainState.selectBlock = newSelect
      mainState.needFetchModelBlock = false
   } else if (
      newSelect.brand !== mainState.selectBlock.brand ||
      newSelect.engine !== mainState.selectBlock.engine
   ) {
      console.log(3)
      mainState.selectBlock = newSelect
      
      mainState.needFetchModelBlock = true

      fetchModelBlock()
   } else if (
      url === 'stat' && pathname[4]
      && (location.pathname !== mainState.from) 
   ) {
      console.log(4)
      mainState.needFetchModelBlock = false

      fetchResultBlockStat()
   } else {
      console.log(5)
      mainState.needFetchModelBlock = false
   }

   useEffect(() => {
      url.includes('online') ? fetchDateAuction() : fetchCountLots()

      mainState.fastBlock.setState(mainState.fastBlockOn(location.state?.fast) )
      mainState.header.setMenuMob(location.state?.navMob)
      mainState.nav.setNavMob(location.state?.navMob)

      if (location.pathname === mainState.from) {
         console.log(11)
         console.log(location)
         mainState.needFetchModelBlock = false
      } else if (mainState.needFetchModelBlock) {
         mainState.modelBlock.setState()
         mainState.filterBlock.setState(mainState.filter)
         mainState.infoBlock.setState(0)
         mainState.resultBlock.setState()
      } else if (
         url === 'stat' && pathname[4]
         && location.pathname !== mainState.from
      ) {
         console.log(12)
         console.log(location.pathname)
         console.log(location)
         console.log(location.pathname === location.state?.from)
         mainState.filterBlock.setState(mainState.filter)
         mainState.infoBlock.setState(0)
         mainState.resultBlock.setState()
      } else if (
         pathname[2]?.includes('find') &&
         mainState.cache.lotsFilter[0]?.lot_num !==
         mainState.lastFindLotNum
      ) {
         console.log(13)
         mainState.modelBlock.setState()
         mainState.filterBlock.setState(mainState.filter)
         mainState.infoBlock.setState(0)
         mainState.resultBlock.setState()
      }
   })

   return (
      <>
         <Heading front={url} /> 
         <NavFilter />
         <FindLotNum />
         <SelectBlock />
         <FilterBlock />
         <InfoBlock />
         <ResultBlock />
      </>       
   )
}

export default Filter