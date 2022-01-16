import stl from './style.module.css'

export default function CloseButton(props) {

   return (
      <div
         className={stl[props.className]}
         onClick={props.onClick}
      >
         <span className={stl.span1}></span>
         <span className={stl.span2}></span>
      </div>
   )
}