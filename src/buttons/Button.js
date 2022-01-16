import stl from './style.module.css'
import CheckMobile from '../CheckMobile'

function Button(props) {
   
   return (
      <div
         className={stl[props.class]}
         data-markaid={props.markaId || 0}
         onClick={props.onclick}
      >
         {props.name === 'harley-davidson' ?
               <CheckMobile button={{caption: props.name}} />
            :
               props.name
         }
      </div>
   )
}

export default Button