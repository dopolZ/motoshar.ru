import {mainState} from '../../initData'
import {useEffect} from 'react'

export default function DescriptionBlock(props) {
   const {bid, brand, customsI, depositBid, deliveryI,
      engine, freightI, year, checkKyushu, costKyushu} = props.select 

   const dataCustoms = {
      bid,
      brand,
      clean: true,
      eng_v: engine.split('-')[0],
      year: year.split('-')[0],
   }

   const customs = i => i ? 0 : engine && year ?
      mainState.mainData.calcJpyToRub(dataCustoms) : 0

   const delivery = i => {
      return i ? 0 :
      engine.split('-')[1] < 601 ? 17000 :
      engine.split('-')[1] < 1001 ? 19000 :
      engine.split('-')[1] < 1501 ? 22000 :
      engine.split('-')[1] < 3001 ? 25000 : 0
   }

   const resBidRub = bid ? mainState.mainData.round(
      bid * mainState.mainData.courseJpy) : 0

   const resSwiftRub = resBidRub ? mainState.mainData.taxSwiftRub : 0

   const resTaxDealerRub = resBidRub && engine && year ?
      mainState.mainData.taxDealerRub : 0

   const resTaxFreightRub = i => {
      return i ? 0 :
      resBidRub && engine && year ?
      mainState.mainData.taxFreightRub : 0
   }

   const resTaxServiceRub = resBidRub && engine && year ?
      mainState.mainData.taxServiceRub : 0

   const resDepositBid = depositBid || 0

   const resKyushu = checkKyushu ? costKyushu : 0

   const sumBlockRes = customs(customsI) + delivery(deliveryI)
      + resBidRub + resSwiftRub + resTaxDealerRub
      + resTaxFreightRub(freightI) + resTaxServiceRub
      + props.select.bidPower() + resKyushu - resDepositBid

   useEffect( () => {
      mainState.calcSumBlock(sumBlockRes)
   })

   return (
      <>
      <div className='descriptionBlockCalc'>
         <div
            className='descriptionBlockDiv'
            style={{display: resBidRub ? 'flex' : 'none'}}
         >
            <div id='detailChangeJpyToRub'>
               <span>ставка + SWIFT&emsp;</span>
               <span>{mainState.splitter(
                  +bid + +mainState.mainData.taxSwiftJpy
               )}</span>
               <span>&nbsp;&#165;</span>
               <span className='descriptionCalcHyphen'>&#8211;</span>
            </div>
            <div id='resultChangeJpyToRub'>
               <span
                  className='resSpans'
               >{mainState.splitter(+resBidRub + +resSwiftRub)}</span>
               <span>&nbsp;руб</span>
            </div>
         </div>
         <div
            className='descriptionBlockDiv'
            style={{display: resTaxDealerRub ? 'flex' : 'none'}}
         >
            <div id='detailTaxJapan'>
               <span>расходы в Японии&emsp;</span>
               <span>{mainState.splitter(mainState.mainData.taxDealerJpy)}</span>
               <span>&nbsp;&#165;</span>
               <span className='descriptionCalcHyphen'>&#8211;</span>
            </div>
            <div id='resultTaxJapan'>
               <span
                  className='resSpans'
               >{mainState.splitter(resTaxDealerRub)}</span>
               <span>&nbsp;руб</span>
            </div>
         </div>
         <div
            className='descriptionBlockDiv'
            style={{display: resTaxServiceRub ? 'flex' : 'none'}}
         >
            <div id='detailTaxMotoshar'>
               <span>услуги MOTOSHAR</span>
               <span className='descriptionCalcHyphen'>&#8211;</span>
            </div>
            <div id='resultTaxMotoshar'>
               <span
                  className='resSpans'
               >{mainState.splitter(resTaxServiceRub)}</span>
               <span>&nbsp;руб</span>                
            </div>
         </div>
         
         
      </div>
      <div className='descriptionBlockCalc'>
         <div
            className='descriptionBlockDiv'
            style={{
               display: resTaxFreightRub() ? 'flex' : 'none',
               textDecoration: freightI ? 'line-through' : 'inherit',
            }}
         >
            <div id='detailTaxFreight'>
               <input
                  id='inputFreight'
                  checked={!freightI}
                  type='checkbox'
                  onChange={() => {
                     mainState.calc.setState({
                        ...props.select,
                        freightI: !freightI})
                  }}
               />
               <span>фрахт контракт&emsp;</span>
               <span>{mainState.mainData.taxFreightUsd}</span>
               <span>&nbsp;&#36;</span>
               <span className='descriptionCalcHyphen'>&#8211;</span>
            </div>
            <div id='resultTaxFreight'>
               <span
                  className='resSpans'
               >{mainState.splitter( resTaxFreightRub() )}</span>
               <span>&nbsp;руб</span>
            </div>
         </div>
         <div
            className='descriptionBlockDiv'
            style={{
               display: customs() ? 'flex' : 'none',
               textDecoration: customsI ? 'line-through' : 'inherit',
            }}
         >
            <div id='detailCalcCustoms' >
               <input
                  id='inputCustom'
                  checked={!customsI}
                  type='checkbox'
                  onChange={() => {
                     mainState.calc.setState({
                        ...props.select,
                        customsI: !customsI})
                  }}
               />
               <span>таможня, ЭПТС, СБКТС, СВХ</span>
               <span className='descriptionCalcHyphen'>&#126;</span>
            </div>
            <div id='resultCalcCustoms'>
               <span
                  className='resSpans'
               >{mainState.splitter( customs() )}</span>
               <span>&nbsp;руб</span>                     
            </div>
         </div>
         <div
            className='descriptionBlockDiv'
            style={{
               display: engine ? 'flex' : 'none',
               textDecoration: deliveryI ? 'line-through' : 'inherit',
            }}
         >
            <div id='detailCalcDelivery'>
               <input
                  id='inputDelivery'
                  checked={!deliveryI}
                  type='checkbox'
                  onChange={() => {
                     mainState.calc.setState({
                        ...props.select,
                        deliveryI: !deliveryI})
                  }}
               />
               <span>доставка из Владивостока</span>
               <span className='descriptionCalcHyphen'>&#126;</span>
            </div>
            <div id='resultCalcDelivery'>
               <span
                  className='resSpans'
               >{mainState.splitter(  delivery() )}</span>
               <span>&nbsp;руб</span>                     
            </div>
         </div>
      </div>
      </>
   )
}
