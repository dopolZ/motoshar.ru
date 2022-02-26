import Button from '../../../buttons/Button'
import {mainState} from '../../../initData'
import stl from './style.module.css'
import {useLocation, useNavigate} from 'react-router-dom'
import {useState} from 'react'

const brandsPattern = [
   'aprilia',
   'bmw',
   'buell',
   'ducati',
   'harley-davidson',
   'honda',
   'husqvarna',
   'kawasaki',
   'ktm',
   'прочие',
   'moto guzzi',
   'mv agusta',
   'suzuki',
   'triumph',
   'yamaha',
]

function BrandBlock() {
   const [state, setState] = useState({})
   mainState.brandBlock = {state, setState}
   
   const noBackspace = str => str ?
      str.replace(' ', '').replace('прочие', 'other')
         .replace('HD', 'harley-davidson') : ''

   const navigate = useNavigate()
   const location = useLocation()
   const startUrl = '/' + location.pathname.split('/')[1]
   const existEngine = mainState.selectBlock.engine
   const existBrand = noBackspace(mainState.selectBlock.brand)

   const onClick = e => {
      if ( e.target.className.includes('brands') ) return

      const targetBrand = noBackspace(e.target.textContent)

      if (existBrand && existBrand === targetBrand) {
         !existEngine ?
            navigate(startUrl, {
               state: {
                  from: `${startUrl}/${existBrand}`,
               }
            }) : 
            navigate(`${startUrl}/${existEngine}`, {
               state: {
                  from: `${startUrl}/${existBrand}/${existEngine}`,
               }
            })
      } else {  
         !existEngine ?
            navigate(`${startUrl}/${targetBrand}`, {
               from: existBrand ?
                  `${startUrl}/${existBrand}` :
                  `${startUrl}`,
            }) :
            navigate(`${startUrl}/${targetBrand}/${existEngine}`, {
               from: existBrand ?
                  `${startUrl}/${existBrand}/${existEngine}` :
                  `${startUrl}/${existEngine}`,
            })
      }
   }

   const brandButtons = brandsPattern.map(elem => (
      <Button
         class={noBackspace(elem) === existBrand ?
            'brandActive' : 'brand'}
         key={elem}
         name={elem}
      />
   ))

   return (
      <div className={stl.brands} onClick={onClick}>
         {brandButtons}
      </div>
   )
}

export default BrandBlock