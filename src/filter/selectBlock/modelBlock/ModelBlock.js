import {useState} from 'react'
import {mainState} from '../../../initData'
import './style.css'
import {useRouteMatch, useHistory} from 'react-router-dom'
import {renderLotList} from '../../renderLotList'
import {renderLotPlate} from '../../renderLotPlate'

function ModelBlock() {
   const [state, setState] = useState(
      mainState.modelBlock?.state
   )
   mainState.modelBlock = {state, setState}

   const match = useRouteMatch()
   const history = useHistory()

   const onClick = e => {      
      if (e.target.id === 'modelBlock' || e.target.id === 'notFound') return
      
      const {model: modelSelect} = mainState.selectBlock
      let modelList
      
      if (match.url === '/online') {
         modelList = mainState.cache.modelsFilter
         const lotsFilter = mainState.cache.lotsFilter

         if (e.target.textContent in modelSelect) {
            delete modelSelect[e.target.textContent]
         } else {
            modelSelect[e.target.textContent] = e.target.dataset.modelid
         }

         modelList = Object.entries(modelList)
            .map(e => ({model_id: e[0], model_name: e[1]}))

         mainState.infoBlock.setState({})

         if (Object.keys(modelSelect).length) {
            const lotsJsx = lotsFilter.filter(e =>
               e.model_name in modelSelect)

            mainState.filterBlock.setState({
               ...mainState.filterBlock.state, disabled: true
            })

            mainState.viewResult === 'plate' ?
               mainState.resultBlock.setState(
                  renderLotPlate(lotsJsx) )
            :
               mainState.resultBlock.setState(
                  renderLotList(lotsJsx) )
         } else {
            mainState.filterBlock.setState({
               ...mainState.filterBlock.state, disabled: false
            })

            mainState.viewResult === 'plate' ?
               mainState.resultBlock.setState(
                  renderLotPlate(lotsFilter) )
            :
               mainState.resultBlock.setState(
                  renderLotList(lotsFilter) )
         }
      } else {
         modelList = mainState.cache.modelsFetch

         if ( e.target.textContent in modelSelect ) {
            delete modelSelect[e.target.textContent]

            mainState.filterBlock.setState(mainState.filter)
         } else {
            for (const i in modelSelect) {
               delete modelSelect[i]
            }

            modelSelect[e.target.textContent] = e.target.dataset.modelid
         }
         
         mainState.infoBlock.setState()
         mainState.resultBlock.setState()
      }

      modelList
         .sort((a, b) => a.model_name < b.model_name ? -1 : 1)
         .sort(a => a.model_name in modelSelect ? -1 : 1)

      const resModelJsx = modelList.map((e, i) => (
         <div
            className={e.model_name in modelSelect ?
               'modelBlockItem buttonActive modelActive' :
               'modelBlockItem'}
            data-modelid={e.model_id}
            key={i}
            style={e.model_name in modelSelect ?
               modelList.indexOf(e) === 0 ?
               {top: '1%'} :
               {top: mainState.mobile('side') ? 
                  modelList.indexOf(e) * 16 + 1 + '%' :
                  modelList.indexOf(e) * 13 + 1 + '%'
               } : {}
            }
         >
            {e.model_name}
         </div>
      ))
      
      setState(resModelJsx)

      const newPathname = Object.keys(modelSelect).length ?
         match.url + '/' + mainState.selectBlock.brand + '/' +
            mainState.selectBlock.engine + '/' +
            Object.keys(modelSelect).join('<>') :
            match.url + '/' + mainState.selectBlock.brand + '/' +
            mainState.selectBlock.engine

      history.push({
         pathname: newPathname,
         from:  match.url + '/' + mainState.selectBlock.brand + '/' +
            mainState.selectBlock.engine,
      })
   }

   return (
      <div
         id={state ? 'modelBlock' : 'modelBlockEmpty'}
         onClick={onClick}
      >
         {state}
      </div>
   )
}

export default ModelBlock
