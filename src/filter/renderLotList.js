import {mainState} from '../initData'
import {costBlock} from './costBlock'
import stl from './resultBlock/style.module.css'

export function renderLotList(arr) {
   
   const resultLots = arr.map(elem => {   
      return (
         <div
            className={stl.resultItem}
            id={elem.id}
            key={elem.id}
         >
            <div className={stl.itemImg}>
               {
                  !mainState.imgValidCheck(elem.auction_date)
                     .includes('empty') ?
                     
                     <img
                        alt='src'
                        onError={e => e.target.style.transform = 'scale(0)'}
                        onLoad={e => e.target.style.opacity = 1}
                        src={elem.image0 ?
                           elem.image0.replace('http://', 'https://')
                        :
                           mainState.changeImgUrl(elem.id)}
                     />
                  :
                     <></>
               }
            </div>
            <div className={stl.itemLot}>
               <p>лот {elem.lot_num} - {elem.auction}</p>
               <p>
                  {
                     elem.status_lot === 'Ranked' ?
                        <span style={{color: 'darkgreen'}}>
                           исправен
                        </span> : 
                        <span style={{color: 'darkred'}}>
                           повреждён
                        </span>
                  }
               </p>
               {
                  mainState.localDate({}) ===
                  mainState.localDate({date: elem.auction_date}) ?
                     <p>торги <span style={{fontWeight: 'bold'}}>сегодня</span></p> :
                     <p>торги {mainState.localDate({date: elem.auction_date})}</p>                      
               }               
            </div>
            <div className={stl.itemMarka}>
               <p>{elem.marka_name.toLowerCase()}</p>
               <p>{elem.model_name.toUpperCase()}</p>
               <p>{elem.serial.toUpperCase()}</p>
            </div>
            <div className={stl.itemYear}>
               <p>год {elem.year}</p>
               <p>объём {elem.eng_v} см3</p>
               <p>пробег {mainState.checkMileage(elem.mileage)}
               </p>
            </div>
            <div className={stl.itemCost}>
               {costBlock(elem)}
            </div>
            <div className={stl.itemRating}>
               {
                  elem.inspection === 'completed' ||
                  elem.inspection === null ?
                     <>
                        <p>оценка</p>
                        <p className={stl.rating}>{elem.rate}</p>
                     </> :
                     <>
                        <p>ожидается</p>
                        <p>осмотр</p>
                     </>
               }
            </div>
            <div className={stl.plugOnClick}></div>
         </div>
      )
   })

   return resultLots
}
