import FindLotNum from './findLotNum/FindLotNum'
import SelectBlock from './selectBlock/SelectBlock'
import InfoBlock from './infoBlock/InfoBlock'
import ResultBlock from './resultBlock/ResultBlock'
import FilterBlock from './filterBlock/FilterBlock'
import NavFilter from '../nav/navFilter/NavFilter'
import {fetchDateAuction} from './fetchDateAuction'
import {fetchCountLots} from './fetchCountLots'
import {mainState, markaId} from '../initData'
import {useState, useEffect} from 'react'
import stl from './filter.module.css'
import {fetchModelBlock} from './fetchModelBlock'
import {fetchResultBlockStat} from './fetchResultBlockStat'
import {fetchFindLotNum} from './fetchFindLotNum'

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

function Filter(props) {   
   const pathname = props.location.pathname.split('/')
   
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
      props.history.location.pathname ===
      props.history.location.from
   ) {
      mainState.needFetchModelBlock = false            
   } else if ( pathname[2]?.includes('find') ) {
      fetchFindLotNum(pathname[2].slice(4))

      mainState.selectBlock = newSelect

      mainState.needFetchModelBlock = false
   } else if (
      newSelect.brand !== mainState.selectBlock.brand ||
      newSelect.engine !== mainState.selectBlock.engine
   ) {
      mainState.selectBlock = newSelect
      
      mainState.needFetchModelBlock = true

      fetchModelBlock()
   } else if (
      url === 'stat' && pathname[4] && 
      props.history.action !== 'POP'
   ) {
      mainState.needFetchModelBlock = false

      fetchResultBlockStat()
   } else {
      mainState.needFetchModelBlock = false
   }

   useEffect(() => {
      url.includes('online') ? fetchDateAuction() : fetchCountLots()

      mainState.fastBlock.setState({
         caption: props.location.fast,
         data: props.location.data,
      })

      mainState.header.setMenuMobSpan(props.location.mobMenu)
      mainState.nav.setMobOn(props.location.mobMenu)

      if (
         props.history.location.pathname ===
         props.history.location.from
      ) {
         mainState.needFetchModelBlock = false
      } else if (mainState.needFetchModelBlock) {
         mainState.modelBlock.setState()
         mainState.filterBlock.setState(mainState.filter)
         mainState.infoBlock.setState(0)
         mainState.resultBlock.setState()
      } else if (
         url === 'stat' && pathname[4] &&
         props.history.action !== 'POP'
      ) {
         mainState.filterBlock.setState(mainState.filter)
         mainState.infoBlock.setState(0)
         mainState.resultBlock.setState()
      } else if ( pathname[2]?.includes('find') ) {
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