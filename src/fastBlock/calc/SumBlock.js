import {mainState} from '../../initData'
import {useState} from 'react'

export default function SumBlock() {
   const [state, setState] = useState(0)
   mainState.calcSumBlock = setState

   return (
      <div
         id='sumCostBlockCalc'
         style={{display: state ? 'flex' : 'none'}}
      >
         <div
            className='descriptionDepositBlock'
            style={{
               display: state ? 'flex' : 'none',
            }}
         >
            <div id='detailCalcDeposit'>
               <span>за вычетом депозита&nbsp;</span>
            </div>
            <div id='resultCalcDeposit'>
               <input
                  id='depositBid'
                  maxLength='6'
                  type='tel'
                  value={mainState.calc.state.depositBid || ''}
                  onChange={e => {
                     mainState.calc.setState({
                        ...mainState.calc.state,
                        depositBid: +e.target.value,
                     })
                  }}
               />                   
            </div>
         </div>
         <div id='priceCalcDescriptionPrice'>
            <span>общая сумма</span>
         </div>
         <div id='priceCalcResultPrice'>
            <span>{
               mainState.splitter( mainState.mainData.round(state) )
            }</span>
            <span> руб</span>
         </div>
      </div>
   )
}