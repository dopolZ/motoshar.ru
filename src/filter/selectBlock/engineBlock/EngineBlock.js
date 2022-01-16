import Button from '../../../buttons/Button'
import {mainState} from '../../../initData'
import stl from './style.module.css'
import {useHistory, useRouteMatch} from 'react-router-dom'
import {useState} from 'react'

const engine = [
   'до 250 см3',
   '251 - 400 см3',
   '401 - 750 см3',
   '751 - 1300 см3',
   'от 1301 см3',
]

function EngineBlock() {
   const [state, setState] = useState({})
   mainState.engineBlock = {state, setState}

   const noBackspace = str => str ?
      str.replace(' ', '').replace(' ', '').replace(' ', '')
      .replace('от', '').replace('до', '').replace('см3', '') : ''

   const history = useHistory()
   const {url: startUrl} = useRouteMatch()
   const existBrand = mainState.selectBlock.brand
   const existEngine = noBackspace(mainState.selectBlock.engine)

   const onClick = e => {
      if ( e.target.className.includes('engines') ) return

      const targetEngine = noBackspace(e.target.textContent)

      if (existEngine && existEngine === targetEngine) {
         !existBrand ? 
            history.push({
               pathname: startUrl,
               from: `${startUrl}/${existEngine}`,
            }) :
            history.push({
               pathname: `${startUrl}/${existBrand}`,
               from: `${startUrl}/${existBrand}/${existEngine}`,
            })
      } else {
         !existBrand ?
            history.push({
               pathname: `${startUrl}/${targetEngine}`,
               from: existEngine ?
                  `${startUrl}/${existEngine}` :
                  `${startUrl}`,
            }) :
            history.push({
               pathname: `${startUrl}/${existBrand}/${targetEngine}`,
               from: existEngine ?
                  `${startUrl}/${existBrand}/${existEngine}` :
                  `${startUrl}/${existBrand}`,
            })
      }
   }

   const engineButtons = engine.map(elem => {
      const elemClean = noBackspace(elem)
      const elemArr = elemClean.split('-')

      const classCurrent = !existEngine ? 'engine' :

         elemClean === existEngine ? 'engineActive' :

         elemArr[0] === '250' && +existEngine < 250 ?
            'engineRight' :

         elemArr[0] === '1301' && +existEngine > 1301 ?
            'engineLeft' : 
            
         +elemArr[0] <= +existEngine &&
         (+elemArr[0] + +elemArr[1]) / 2 >= +existEngine ?
            'engineLeft' :

         +elemArr[1] >= +existEngine &&
         (+elemArr[0] + +elemArr[1]) / 2 <= +existEngine ?
            'engineRight' : 'engine'

      return <Button
               class={classCurrent}
               key={elem}
               name={elem}
            />
   })

   return (
      <div className={stl.engines} onClick={onClick}>
         {engineButtons}
      </div>
   )
}

export default EngineBlock