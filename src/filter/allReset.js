import {mainState} from '../initData'

export function allReset() {
   for (let i in mainState.selectBlock?.current) {
      mainState.selectBlock.current[i].classList?.remove('buttonActive')
   }
   
   mainState.modelBlock?.setState({
      brand: '',
      engine: '',
      model: '',
   })
   
   mainState.resultBlockResult?.setState([])
}