import {mainState} from '../../initData'
import {useState} from 'react'
import './style.css'
import {renderLotList} from '../renderLotList'
import {renderLotPlate} from '../renderLotPlate'
import CheckMobile from '../../CheckMobile'

function InfoBlock() {
   const [state, setState] = useState({})
   mainState.infoBlock = {state, setState}

   const cache = mainState.cache.lotsFilter

   if (!state) return <></>
   if (!mainState.cache.lotsFilter.length) return <></>

   const splitter = mainState.splitter

   const statInfo = () => {
      if (!mainState.modelBlock.state) return
      if (mainState.filter.front !== 'stat') return
      if (mainState.filterBlock.state.recycle) return
      if (!cache) return

      const today = new Date()      

      const tradingFreqMonth = cache.reduce((sum, e) =>
            +e.id.slice(0, 4) === today.getFullYear() ? sum + 1 : sum
         , 0) / ( today.getMonth() + 1 )

      const statYear = {}

      cache.forEach(e => {
         const {finish} = mainState.mainData.calcJpyToRub(e)

         if (statYear[e.year]) {
            const y = statYear[e.year]

            if (y[e.rate]) {
               const r = y[e.rate]

               r.finishMin = r.finishMin > finish ? finish : r.finishMin
               r.finishMax = r.finishMax < finish ? finish : r.finishMax
               r.finishSum += finish
               r.count = ++r.count
            } else {
               y[e.rate] = {
                  finishMin: finish,
                  finishMax: finish,
                  finishSum: finish,
                  count: 1,
               }
            }

            statYear[e.year].countAll = ++statYear[e.year].countAll
         } else {
            statYear[e.year] = {
               [e.rate]: {
                  finishMin: finish,
                  finishMax: finish,
                  finishSum: finish,
                  count: 1,
               },
               countAll: 1,
            }
         }
      })

      const statYearReact = []

      const parseRating = obj => {
         const parse = Object.entries(obj)
         parse.pop()

         const str = obj => {
            if (!parse.length) return <></>

            return (
               <>
                  <div className='siddCoast'>
                  {parse[0][0] > 0 ?
                     <>
                        <p>оценка {
                              parse[0][0]}&ensp;-&ensp;{parse[0][1].count
                           } шт
                        </p>
                        <CheckMobile infoBlock={{
                           caption: 'rating',
                           ratings: parse[0][1]
                        }} />
                     </> : <></>
                  }                           
                  </div>
                  {(parse.shift(), str(obj))}
               </>
            )
         }

         return parse.length < 1 ?
            <div className='siddCoast'>
               <p>оценка {parse[0][0]}&ensp;-&ensp;1 шт</p>
               <p></p>
               <p>цена - {splitter(parse[0][1].finishMin)} руб</p>
               <p></p>
            </div> : str(obj)
      }

      for (const i in statYear) {
         if (i !== '0') {
            statYearReact.push(
               <div
                  className='statInfoDifferent'
                  key={i}
               >
                  <p>
                     выпуск {i} года - продано {statYear[i].countAll} шт
                  </p>
                  <div className='sidDetail'>
                     {parseRating(statYear[i])}
                  </div>
               </div>
            )
         }
      }

      return (
         <div id='statInfo'>
            <p id='statInfoDescription'>
               <b>
                  {cache[0].marka_name.toUpperCase()}&nbsp;
                  {cache[0].model_name.toUpperCase()}
               </b>&emsp;
               {
                  tradingFreqMonth / 4 > 1 ?
                     <span>
                        появляется на торгах в среднем {
                           Math.ceil(tradingFreqMonth / 4)
                        } шт в неделю
                     </span> :
                  tradingFreqMonth > 1 ?
                     <span>
                        появляется на торгах в среднем {
                           Math.ceil(tradingFreqMonth)
                        } шт в месяц
                     </span> :
                  <span>на торгах редко, иногда ни одного мотоцикла в месяц</span>
               }
            </p>
            <p>цена в рублях <b>"под ключ"</b> во Владивостоке,&ensp;
               <b>с учётом всех расходов</b></p>
            {statYearReact}
         </div>
      )
   }

   const onClick = () => {
      let lots = mainState.cache.lotsFilter

      if (Object.keys(mainState.selectBlock.model).length) {
         lots = lots.filter(e =>
            e.model_name in mainState.selectBlock.model
        )
      }

      mainState.viewResult === 'list' ?
         mainState.resultBlock.setState( renderLotList(lots) )
      :
         mainState.resultBlock.setState( renderLotPlate(lots) )
   }

   return (
      <div id='infoBlock'>
         {statInfo()}
         <div id='mileageInfo'>
            {mainState.mobile() ? <div></div> : <></>}
            <span>
               <span style={{color: 'green'}}>km</span>
               <span> - пробег в километрах, подтверждён</span>
            </span>
            <span>
               <span style={{color: 'green'}}>mi</span>
               <span> - пробег в милях, подтверждён</span>
            </span>
            <span>
               <span>
                  йен - цена в Японии,&nbsp;
                  руб - "<b>под ключ</b>" Владивосток
               </span>
            </span>
            <div className='choiceViewResult'>
               {mainState.mobile() ?
                  <></>
                  :
                  <>
                     <div
                        className='list'
                        onClick={() => {
                           mainState.viewResult = 'list'
                           onClick()
                        }}
                     ></div>
                     <div
                        className='plate'
                        onClick={() => {
                           mainState.viewResult = 'plate'
                           onClick()
                        }}
                     ></div>
                  </>
               }
            </div>
         </div>
      </div>
   )
}

export default InfoBlock