import DescriptionBlock from './DescriptionBlock'
import SumBlock from './SumBlock'
import {mainState} from '../../initData'
import {useState} from 'react'
import CloseButton from '../../closeButton/CloseButton'
import createState from './createState'
import CheckMobile from '../../CheckMobile'
import './style.css'
import {useHistory} from 'react-router-dom'

function Calc() {
   const [state, setState] = useState( createState() )
   mainState.calc = {state, setState}

   const history = useHistory()

   const onClickClose = () => {
      mainState.calcPlug.setState('off')
      
      setTimeout(() => history.goBack(), 600)
   }

   return (
      <>
         <CloseButton
            className='calc'
            onClick={onClickClose}
         />
         <div id='h1AndH2BeginCalc'>
            <CheckMobile calc={{caption: 'heading'}} />
         </div>
         <div id='inputBlockCalc'>
            <div id='brandBlockCalc'>
               <div id='brandBlockJapan'>
                  <span>японский</span>
                  <input
                     checked={state.brand}
                     id='radioManufacturetJapan'
                     onChange={() => setState({...state, brand: !state.brand})}
                     type='radio'
                  ></input>
               </div>
               <div id='brandBlockOther'>
                  <span>импортный</span>
                  <input
                     checked={!state.brand}
                     id='radioManufacturetOther'
                     onChange={() => setState({...state, brand: !state.brand})}
                     type='radio'
                  ></input>
               </div>
            </div>
            <div id='engineBlockCalc'>
               <span>двигатель</span>
               <select
                  defaultValue={
                     state.currentLot && state.currentLot.eng_v ?
                     (
                        state.engineOptions.find(e => {
                           if (e.key === '0') return false

                           const v = e.props.children

                           return (
                              v[0] <= state.currentLot.eng_v &&
                              v[2] >= state.currentLot.eng_v ?
                                 true : false
                           )                   
                        }).props.children.join('')
                     ) : ' '
                  }
                  id='enginVolumeCalc'
                  onChange={e => setState({...state, engine: e.target.value})}
               >
                  {state.engineOptions}               
               </select>
            </div>
            <div id='yearBlockCalc'>
               <span>год</span>
               <select
                  defaultValue={
                     state.currentLot && state.currentLot.year ?
                     (
                        state.yearOptions.find(e => {
                           if (e.key === '0') return false

                           const v = e.props.children

                           return (
                              v[0] <= state.currentLot.year &&
                              v[2] >= state.currentLot.year ?
                                 true : false
                           )
                        }).props.children.join('')
                     ) : ' '
                  }
                  id='yearValueCalc'
                  onChange={e => setState({...state, year: e.target.value})}
               >
                  {state.yearOptions}
               </select>
            </div>
            <div id='bidBlockCalc'>
               <span>ставка &#165;</span>
               <input
                  id='bidSizeCalc'
                  maxLength='7'
                  type='tel'
                  value={state.bid || ''}
                  onChange={e => setState({...state, bid: +e.target.value})}
               />
            </div>
         </div>
         <div id='coursesAndBigPowerBlockCalc'>
            <div id='bigPowerCheckCalc'>
               <CheckMobile calc={{caption: 'bigPower'}} />
               <input
                  id='checkBigPower'
                  type='checkbox'
                  onChange={() => setState(
                     {...state,
                        checkPower: !state.checkPower,
                        valuePower: '',
                     }
                  )}
               ></input>
            </div>
            <div>
               <input
                  id='bigPowerVolumeCalc'
                  maxLength='3'
                  type={state.checkPower ? 'tel' : 'hidden'}
                  placeholder='сколько?'
                  value={state.valuePower}
                  onChange={e => setState(
                     {...state, valuePower: e.target.value}
                  )}
               />
            </div>
            <div id='bigPowerResultCalc'>
               {
                  state.bidPower() ?
                     <span>
                        <CheckMobile calc={{caption: 'bidPower'}} />
                        {mainState.splitter( state.bidPower() )} руб
                     </span> : ''                 
               }
            </div>
            <div id='coursesBlockCalc'>
               <span id='courseJpyCalc'>
                  jpy {mainState.mainData.courseJpy} руб
               </span>
               <span id='courseUsdCalc'>
                  usd {mainState.mainData.courseUsd} руб
               </span>
            </div>
         </div>
         <div id='kyushuFreightBlockCalc'>
            <div id='kyushuFreightCheckDiv'>
               <span>BDS Kyushu</span>
               <input
                  checked={state.checkKyushu}
                  id='kyushuFreightCheck'
                  type='checkbox'
                  onChange={() => setState(
                     {...state, checkKyushu: !state.checkKyushu}
                  )}
               ></input>
            </div>
            <div id='kyushuFreightDescription'>
               <span
                  style={state.checkKyushu ? {opacity: 1} : {opacity: 0}}
               >
                  <CheckMobile calc={{caption: 'kyushuCaption'}} />
               </span>
            </div>
            <div id='kyushuFreightCost'>
               <span
                  style={state.checkKyushu ? {opacity: 1} : {opacity: 0}}
               >
                  + {mainState.splitter(state.costKyushu)} руб
               </span>
            </div>
            <div id='kyushuFreightPlug'></div>
         </div>
         <div id='resultBlockCalc'>
            <DescriptionBlock select={state} />
            <SumBlock />
         </div>
      </>
   )
}

export default Calc