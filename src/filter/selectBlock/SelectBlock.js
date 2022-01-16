import BrandBlock from './brandBlock/BrandBlock'
import EngineBlock from './engineBlock/EngineBlock'
import ModelBlock from './modelBlock/ModelBlock'
import './style.css'

function SelectBlock() {

   return (
      <div id='selectBlock'>
         <BrandBlock />
         <EngineBlock />
         <ModelBlock />
      </div>
   )
}

export default SelectBlock