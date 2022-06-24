import {useState} from 'react'
import {mainState} from '../../../initData'
import './style.css'
import {useLocation, useNavigate} from 'react-router-dom'
import {renderLotPlate} from '../../renderLotPlate'

function ModelBlock() {
   const [state, setState] = useState(
      mainState.modelBlock?.state
   )
   mainState.modelBlock = {state, setState}

   const location = useLocation()
   const startUrl = '/' + location.pathname.split('/')[1]
   const navigate = useNavigate()

   const onClick = e => {      
      if (e.target.id === 'modelBlock' || e.target.id === 'notFound') return
      
      const {model: modelSelect} = mainState.selectBlock
      let modelList
      
      if (startUrl === '/online') {
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

            mainState.resultBlock.setState(
               renderLotPlate(lotsJsx))
         } else {
            mainState.filterBlock.setState({
               ...mainState.filterBlock.state, disabled: false
            })

            mainState.resultBlock.setState(
               renderLotPlate(lotsFilter) )
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
         startUrl + '/' + mainState.selectBlock.brand + '/' +
            mainState.selectBlock.engine + '/' +
            Object.keys(modelSelect).join('<>') :
            startUrl + '/' + mainState.selectBlock.brand + '/' +
            mainState.selectBlock.engine

      navigate(newPathname)
      // navigate(newPathname, {
      //    from: startUrl + '/' + mainState.selectBlock.brand + '/' +
      //       mainState.selectBlock.engine,
      // })
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
