import {mainState} from '../../initData'
import {costBlock} from '../../filter/costBlock'
import {useState, useEffect} from 'react'
import './style.css'
import CheckMobile from '../../CheckMobile'

export default function LotCardMain(props) {
   const [state, setState] = useState(props.lot)
   mainState.lotCard = {state, setState}

   useEffect(() => {
      window.scrollTo(0, 0)

      return () => mainState.lotCard = {}
   }, [])
   
   if (!state) {
      return (
         <>
            <div id='lotCard'>
               <div id='h1AndDateUpdate'>
                  <h1>Аукционный лист</h1>
                  <div id='dateUpdate'>
                     <span>обновлён </span>
                     <span>{mainState.localDate({})}</span>
                  </div>
               </div>
               <div id='lotCardMainInfo'>
                  <div id='lcmiImg' className='itemDiv itemDivImg' />
                  <div className='itemDiv itemDivLot' />
                  <div className='itemDiv itemDivMarka' />
                  <div className='itemDiv itemDivYear' />
                  <div className='itemDiv itemDivCost' />
                  <div className='itemDiv itemDivRating' />
               </div>
            </div>
         </>
      )
   }

   const srcImgs = []
   const mainImgs = []
   const srcImgsWork = []

   const patternRateText = {
      'Frame': {
         'Mainframe': '',
         'Downtube': '',
         'Stopper': '',
         'Seatrail': '',
         'Step': '',
         'Stand': '',
      },
      'Engine': {
         'Engine': '',
         'Crankcase cover': '',
         'Oil leak': '',
         'Radiator': '',
         'Carburetor': '',
         'Clutch': '', 	
         'Starting motor': '',
      },
      'Electronic Safety Parts': {
         'Key': '',
         'Meter': '',
         'Turn-signal': '',
         'Headlamp': '',
         'Battery': '',
         'Horn': '',
         'Back-lamp': '',
         'Mirror': '',
         'Silencer': '',
         'Exhaustpipe': '',
      },
      'Front': {
         'Tube outer': '',
         'Tube inner': '',
         'Stem steering': '', 	
         'Steering handle bar': '',
         'Front Wheel': '', 	
         'Front Brake': '', 	
         'Front Tire': '',
      },
      'Rear': {
         'Rear shock': '',
         'Swing arm': '',
         'Chain': '',
         'Sprocket': '',
         'Rear Wheel': '',
         'Rear Brake': '',
         'Rear Tire': '',
      },
      'Exterior': {
         'Upper cowl': '',
         'Center cowl': '',
         'Under cowl': '',
         'Side cowl': '',
         'Tank fuel': '',
         'Seat': '',
         'Tail cowl': '',	
         'Front fender': '',
         'Rear fender': '',
         'Screen': '',
      },
   }

   const onClickImg = e => {
      if (e.target.tagName !== 'IMG') return

      let url = e.target.src
      // if (url.includes('image_item')) {
      //    url = url.replace('image_item', 'image_item_high')
      // }
      // if (url.includes('image_cube')) {
      //    url = url.replace('image_cube', 'image_cube_high')
      // }
      // if (url.includes('image_parts')) {
      //    url = url.replace('image_parts', 'image_parts_high')
      // }
         
      props.history.push({
         data: url,
         fast: 'img',
         from: props.history.location.pathname,
      })
   }

   const onLoadImg = (e, url) => {
      if (url) srcImgsWork.push(url)
      e.target.style.opacity = 1
   }

   const onErrorImg = e => {
      e.target.style.transform = 'scale(0)'
   }

   const {createKey} = mainState

   state.images?.split('#').forEach(elem => {
      elem = elem.replace('http://', 'https://')
         .replace('jadb2', 'bdsc')
         .replace('image_cube_high', 'image_cube')

      if ( elem.includes('cube') ) {
         srcImgs.push(elem)

         mainImgs.push(
            <div
               className={state.status_lot === 'Ranked' ?
                  'mainImgsWrap' : 'mainImgsWrapRecycle'}
               key={createKey()}
            >
               <img
                  alt='img'
                  className=
                     {
                        state.status_lot === 'Recycle' ?
                           'objectRecycle' : ''
                     }
                  src={elem}
                  onClick={onClickImg}
                  onLoad={e => onLoadImg(e, elem)}
                  onError={e => onErrorImg(e)}
               />
            </div>
         )
      }
   })

   if (state.status_lot !== 'Ranked') {
      state.info?.rate?.forEach(elem => {
         mainImgs.push(elem.img.split('#').map(elem => {
            elem = elem.replace('http://', 'https://')
               .replace('jadb2', 'bdsc')
               .replace('image_cube_high', 'image_cube')

            if ( elem.includes('cube') ) {
               srcImgs.push(elem)

               return (
                  <div
                     className='mainImgsWrapRecycle'
                     key={createKey()}
                  >               
                     <img
                        alt='img'
                        className='objectRecycle'
                        src={elem}
                        onClick={onClickImg}
                        onLoad={e => onLoadImg(e, elem)}
                        onError={e => onErrorImg(e)}
                     />
                  </div>
               )
            }

            return <></>
         })
      )})
   }

   const lcdRating = () => {
      if (state.status_lot === 'Recycle') {
         return (
            <>
               <div id='lcdRating'>
                  <div id='descriptionRecycle'>
                     <span>
                        лоты со статусом <span style={{color: 'darkred'}}>повреждён</span> не имеют
                        оценок и продаются в состоянии "как есть"
                     </span>
                  </div>
               </div>
               {
                  state.bds_comment || state.seller_comment ?
                     <div id='lcdComments'>
                        {
                           state.bds_comment && state.seller_comment ?
                              <>                      
                                 <div>
                                    <span>комментарии BDS: </span>
                                    <span> {state.bds_comment}</span>
                                 </div>                
                                 <div>
                                    <span>комментарии продавца: </span>
                                    <span> {state.seller_comment}</span>
                                 </div>
                              </> :
                           state.bds_comment ?                    
                              <div style={{width: '100%'}}>
                                 <span>комментарии BDS: </span>
                                 <span> {state.bds_comment}</span>
                              </div> :
                           state.seller_comment ?              
                              <div style={{width: '100%'}}>
                                 <span>комментарии продавца: </span>
                                 <span> {state.seller_comment}</span>
                              </div> : null                         
                        }
                     </div> : null
               }
            </>
         )
      } else {
         return (
            <div id='lcdRating'>               
               <div id='descriptionRating'>
                  <CheckMobile lotCard={{
                     caption: 'descriptionRating',
                     elem: state,
                  }} />
               </div>  
            </div>               
         )
      }
   }

   const inspectionElems = []

   if (state.status_lot !== 'Recycle') {
      state.info?.rate?.forEach(elem => {   
         let [nameRating, description] = elem.txt.split('#')
         let name = nameRating.slice(0, -2)
      
         const keys = Object.keys(patternRateText[name])
   
         const keyValue = []
   
         keys.forEach((key, i) => {
            const keyEnd = keys[i + 1]
            let start = 0
            let end = 0
   
            start = description.indexOf(key + '-') + key.length + 1
            end = description.indexOf(keyEnd + '-') - 1
   
            if (end < 0) end = description.length
   
            let str = description.slice(start, end)
   
            while (true) {
               if (
                     str.endsWith('-') ||
                     str.endsWith(',') ||
                     str.endsWith(' ')
                  ) {
                  str = str.slice(0, -1)
               } else break
            }
   
            if (str) {
               keyValue.push(
                  <div key={createKey()}>
                     <p>{key}</p>
                     <p>{str}</p>
                  </div>            
               )
            }
         })
   
         inspectionElems.push(
            <div className='lcdirDivEmpty' key={createKey()}>
               <div className='lcdirdName'>{nameRating}</div>
               <div className='lcdirdComments lcdirdCommentsEmpty'>{keyValue}</div>
            </div>
         )
      })
   }

   if (state.parts === 'Exist') {
      inspectionElems.push(
         <div className='lcdirDivEmpty' key={createKey()}>
            <div className='lcdirdName'>Запчасти</div>
            <div className='lcdirdComments lcdirdCommentsEmpty'>
               <div>
                  <p>Parts</p>
                  <p>{state.parts}</p>
               </div>
            </div>
         </div>
      )      
   }

   const res =
      <>
         <div id='lotCard'>
            <div id='h1AndDateUpdate'>
               <h1>Аукционный лист</h1>
               {
                  state.change_date ?
                     (
                        <div id='dateUpdate'>
                           <>
                              <span>обновлён </span>
                              <span>
                                 {
                                    mainState.localDate({
                                       date: state.change_date,
                                       time: true
                                    })
                                 }
                              </span>
                           </>
                        </div>
                     ) : null
               }
            </div>
            <div id='lotCardMainInfo'>
               <div id='lcmiImg' className='itemDiv itemDivImg'>
                  <object
                     data={state.image0 ?
                        state.image0.replace('http://', 'https://')
                        :
                        mainState.changeImgUrl(state.id)}
                  >.</object>
               </div>
               <div className='itemDiv itemDivLot'>
                  <p>лот {state.lot_num} - {state.auction}</p>
                  <CheckMobile
                     lotCard={{
                        caption: 'statusAndPvi',
                        elem: state,
                     }}
                  />
                  <p>торги {mainState.localDate({date: state.auction_date})}</p>
               </div>
               <div className='itemDiv itemDivMarka'>
                  <CheckMobile
                     lotCard={{
                        caption: 'markaAndFrame',
                        elem: state,
                     }}
                  />
               </div>
               <div className='itemDiv itemDivYear'>
                  <CheckMobile
                     lotCard={{
                        caption: 'yearAndEng',
                        elem: state,
                     }}
                  />
               </div>
               <div className='itemDiv itemDivCost'>
                  {costBlock(state)}
               </div>
               <div className='itemDiv itemDivRating'>
                  <p>общая</p>
                  <p>оценка</p>
                  <p>{state.rate}</p>
               </div>
            </div>
            <div id='descriptionCost'>
               <CheckMobile lotCard={{
                  caption: 'descriptionCost', elem: state,}} />
            </div>
            <div id='lotCardDetails'>
               {lcdRating()}    
               <div className='lcdMainImgs'>{mainImgs}</div>
               {
                  state.status_lot !== 'Recycle' &&
                  (state.bds_comment || state.seller_comment) ?
                     <div id='lcdComments'>
                        {
                           state.bds_comment && state.seller_comment ?
                              <>
                                 <div>
                                    <span>комментарии BDS: </span>
                                    <span> {state.bds_comment}</span>
                                 </div>
                                 <div>
                                    <span>комментарии продавца: </span>
                                    <span> {state.seller_comment}</span>
                                 </div>
                              </> :
                              state.bds_comment ?                        
                                 <div style={{width: '100%'}}>
                                    <span>комментарии BDS: </span>
                                    <span> {state.bds_comment}</span>
                                 </div> : 
                                 <div style={{width: '100%'}}>
                                    <span>комментарии продавца: </span>
                                    <span> {state.seller_comment}</span>
                                 </div>
                        }
                     </div> : null
               }
               {
                  state.status_lot !== 'Recycle' ?
                     <div className='lcdInfoRateEmpty'>
                        {inspectionElems}          
                     </div> : null
               }
            </div>
         </div>         
      </>

   srcImgs.forEach(e => {
      const imgCheck = new Image()
      imgCheck.onload = () => srcImgsWork.push(e)

      setTimeout(() => imgCheck.src = e, 1000)      
   })

   mainState.lotCard.srcImgsWork = srcImgsWork

   return res
}

// const json = {
//    "change_date":"2021-04-17T11:35:48.453Z",
//    "image0":"http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image1_small/004520210421.jpg",
//    "lot_num":45,
//    "auction":"BDS Kanto",
//    "status_lot":"Ranked"/"Recycle",
//    "pvi_date":"2021/6",
//    "auction_date":"2021-04-20T19:00:00.000Z",
//    "marka_name":"honda",
//    "model_name":"CTX700D",
//    "serial":"RC69-1000398",
//    "engine_model":"RC68E-2000380",
//    "year":2014,
//    "mileage":"11217K",
//    "mileage_pvi":"10,200K",
//    "eng_v":700,
//    "start":250,
//    "finish":0,
//    "rate":5,
//    "rate_frame":5,
//    "rate_eng":5,
//    "rate_front":5,
//    "rate_ext":5,
//    "rate_rear":4,
//    "rate_el":5,
//    "status":"available"/"Sold"/"Un",
//    "images":"http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_cube/004520210421_r.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_cube/004520210421_l.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_cube/004520210421_f.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_cube/004520210421_a.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_cube/004520210421_b.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_cube/004520210421_s.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_cube/004520210421_t.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_cube/004520210421_u.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_parts/004520210421_1.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_parts/004520210421_2.jpg",
//    "info":{
//       "rate":[
//          {
//             "txt":"Engine:5#Engine-EngineRust,UnderFlaw,Crankcase cover-CoverRust,Oil leak-,Radiator-RadiatorRustLv3,Carburetor-,Clutch-,Starting motor-,-",
//             "img":"http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_010_01.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_010_02.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_010_03.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_010_04.jpg"
//          },
//          {
//             "txt":"Front:5#Tube outer-OuterRust,Tube inner-InnerRust,Stem steering-StemRust,Steering handle bar-HandleNot Genuine product,GripNot Genuine product,Front Wheel-WheelFlaw,Front Brake-BreakRust,Front Tire-TireReduce,-",
//             "img":"http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_020_01.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_020_02.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_020_03.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_020_04.jpg"
//          },
//          {
//             "txt":"Exterior:5#Upper cowl-UpperFlaw,Center cowl-CenterFlaw,Under cowl-UnderFlaw,Side cowl-BoxFlawLv3,Tank fuel-TankFlaw,PatInstalled,Seat-SeatCleftLv1,Tail cowl-TailFlaw,Front fender-Front-fenderFlawLv1,Rear fender-Rear-fenderFlaw,Screen-ScreenFlaw",
//             "img":"http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_030_01.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_030_02.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_030_03.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_030_04.jpg"
//          },
//          {
//             "txt":"Rear:4#Rear shock-ShockRust,Swing arm-SwingarmRust,Chain-ChainRust Required replacement,Sprocket-,Rear Wheel-WheelRust,Rear Brake-BreakRust,Rear Tire-TireReduceRequired replacement,-",
//             "img":"http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_040_01.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_040_02.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_040_03.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_040_04.jpg"
//          },
//          {
//             "txt":"Electronic Safety Parts:5#Key-Key1,Meter-,Turn-signal-Turn-signalFlaw,Headlamp-,Battery-,Horn-,Back-lamp-,Mirror-,Silencer-SilencerFlaw Rust,CoverFlaw,Exhaustpipe-Exhaust-pipeRustLv3",
//             "img":"http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_050_01.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_050_02.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_050_03.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_050_04.jpg"
//          },
//          {
//             "txt":"Frame:5#Mainframe-Main-frameFlaw Rust,Downtube-,Stopper-StopperDentLv1,Seatrail-,Step-StepFlaw Bend RustLv3,Stand-StandFlaw Rust,-",
//             "img":"http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_060_01.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_060_02.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_060_03.jpg#http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/image_item/004520210421_060_04.jpg"
//          }
//       ],
//       "video":[
//          "http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/movie_engine/004520210421_r.mp4",
//          "http://bdsc.jupiter.ac/auctiondata/bds/disp/bds/20210421/movie_engine/004520210421_l.mp4"
//       ]
//    },
//    "group_id":0,
//    "group_name":"no group",
//    "url":"http://bdsc.jupiter.ac/NJP20/NJP2012B?btn=Model&manif=H%20&opend=20210421&bdsdisplaymode=Thumbnail&mylist=False&buy=False&exh=False&sort1=DEFAULT_MODEL&page.current=1&dexhno=5023&sort2=NONE&currentrow=211&mvcmodebds=BDS",
//    "model_name_origin":"CTX700D",
//    "inspection":"completed"/"before",
//    "bds_comment":"各所キズ、サビ、変色。",
//    "seller_comment":"",
//    "mileage_history":null,
//    "parts":"No Part",
//    "id":"202104210045",
//    "marka_id":42,
//    "model_id":42573,
//    "color":"RED",
// }

// Rear shock-ShockRust,Swing arm-SwingarmRust,Chain-ChainRust Required replacement,Sprocket-,Rear Wheel-WheelRust,Rear Brake-BreakRust,Rear Tire-TireReduceRequired replacement,-


