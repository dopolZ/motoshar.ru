import {mainState} from '../initData'
import {costBlock} from './costBlock'
import stl from './resultBlock/style.module.css'
import CheckMobile from '../CheckMobile'

export function renderLotPlate(arr) {
   
   const resultLots = arr.map(elem => {      
      return (
         <div
            className={stl.resultItemPlate}
            id={elem.id}
            key={elem.id}
         >
            <div className={stl.itemImgPlate}>
               {
                  !mainState.imgValidCheck(elem.auction_date)
                     .includes('empty') ?
                     
                     <img
                        alt='img'
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
            <div className={stl.itemLotPlate}>
               <CheckMobile lotPlate={{caption: 'lotNum', elem}} />
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
                     <p>торги <span style={{fontWeight: 'bold'}}>сегодня</span></p>
                     :
                     <CheckMobile lotPlate={{caption: 'date', elem}} />                      
               }               
            </div>
            <div className={stl.itemMarkaPlate}>
               <p>{elem.marka_name.toLowerCase()}</p>
               <p>{elem.model_name.toUpperCase()}</p>
               <p>{elem.serial.toUpperCase()}</p>
            </div>
            <div className={stl.itemYearPlate}>
               <p>год {elem.year}</p>
               <p>объём {elem.eng_v} см3</p>
               <p>{mainState.checkMileage(elem.mileage)}
               </p>
            </div>
            <div className={stl.itemCostPlate}>
               {costBlock(elem)}
            </div>
            <div className={stl.itemRatingPlate}>
               {
                  elem.inspection === 'completed' ||
                  elem.inspection === null ?
                     <>
                        <p>оценка</p>
                        <p className={stl.ratingPlate}>{elem.rate}</p>
                     </> :
                     <>
                        <p>ожидается</p>
                        <p>осмотр</p>
                     </>
               }
            </div>
            <div className={stl.plugOnClickPlate}></div>
         </div>
      )
   })

   return resultLots
}
