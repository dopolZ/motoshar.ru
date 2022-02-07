import {useState, useEffect} from 'react'
import {mainState} from './initData'
import {useHistory} from 'react-router-dom'

function CheckMobile(props) {
   const history = useHistory()
   const [state, setState] = useState( mainState.mobile('side') )
   mainState.checkMobile = {state, setState}

   const checkPortrait = e => {
      if ( e.target.screen.orientation.type.includes('portrait') ) {
         setState(true)
      } else {
         setState(false)
      }

      history.location.mobMenu = false
      
      mainState.header.setMenuMobSpan(false)
      mainState.nav.setMobOn(false)
   }

   useEffect(() => {
      window.addEventListener('orientationchange', checkPortrait)

      return () => {
         window.removeEventListener('orientationchange', checkPortrait)
      }
   })

   const req = Object.keys(props)[0]

   switch (req) {
      case 'home':
         const home = { 
            section1: state ?
               <p>
                  Статистика собирает итоги торгов всех мотоциклов<br />
                  c понятной ценой и частотой появления на аукционе
                  <br /><br />
                  <b>Некогда? Оставьте заявку, мы всё сделаем!</b>
               </p>
               :
               <>
                  <span>&ensp;</span>
                  <span>Статистика накапливает итоги прошлых торгов, где можно найти любой мотоцикл</span>
                  <span>&ensp;По найденной модели будет доступна информация:</span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;🗸&ensp;средняя корректная стоимость мотоцикла</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;частота появления мотоцикла на торгах в Японии</b></span>
                  <span>&ensp;&ensp;&ensp;&ensp;Меняя фильтры можно точно определить цену на нужную модель учитывая</span>
                  <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;год выпуска, пробег и техническое состояние (оценки экспертов)</span>
                  <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;В результате поиска легко сопоставить свои желания с возможностями<br /></span>
                  <span>&ensp;</span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;Некогда вникать в статистику? Оставьте заявку, мы всё сделаем!</b></span>
                  <span>&ensp;</span>
               </>,
         
            section2: state ?
               <p>
                  Выбирайте лоты которые будут на ближайших торгах<br />
                  С детальным осмотром и гарантией пробега<br /><br />
                  <b>&#8226; подробное описание и комментарии эксперта<br />
                  &#8226; более 30 качественных фотографии всех узлов<br />
                  &#8226; проверка дымности, шумности, электрики<br />
                  &#8226; доступно видео с запуском двигателя<br /><br />
                  Некогда? Оставьте заявку, мы всё сделаем!</b>
               </p>
               :
               <>
                  <span>&ensp;</span>
                  <span>Здесь можно выбрать лоты которые будут на ближайших торгах</span>
                  <span>&ensp;Эксперты принимают на торги технику и проводят детальный осмотр</span>
                  <span>&ensp;&ensp;Определяют корректность пробега с подтверждением</span>
                  <span>&ensp;&ensp;&ensp;И составляют аукционный лист, в который входят:</span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;детальное описание и комментарии эксперта по всем узлам</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;32 качественных фотографии всех узлов</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;видео запуска двигателя слева и справа</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;проверка дымности, шумности, электрики</b></span>
                  <span>&ensp;</span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;Некогда вникать в торги? Оставьте заявку, мы всё сделаем!</b></span>
                  <span>&ensp;</span>
               </>,
         
            section3: state ?
               <>
                  <h2>Калькулятор точной цены мото с аукциона</h2>
                  <p>
                     Цена аукционного мотоцикла складывается из:<br />
                     <b>&#8226; цены мотоцикла в Японии + комиссия банка<br />
                     &#8226; транспорт и хранение мотоцикла в Японии<br />
                     &#8226; таможенная пошлина, ЭПТС, СБКТС, СВХ<br />
                     &#8226; фрахт (морская перевозка мотоцикла)<br />
                     &#8226; адресная доставка от таможни до клиента<br />
                     &#8226; услуги MOTOSHAR</b><br /><br />
                     Всё учтено в калькуляторе, прозрачно и понятно!
                  </p>
               </>
               :
               <>
                  <h2>Калькулятор точной стоимости мотоцикла с аукциона</h2>
                  <span>&ensp;</span>
                  <span>Итоговая стоимость любого аукционного мотоцикла складывается из:</span>
                  <span><b>&ensp;&ensp;&ensp;🗸&ensp;цены мотоцикла в Японии + комиссия банка</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;🗸&ensp;транспортировка, хранение, отправка мотоцикла из Японии</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;фрахт (морская перевозка мотоцикла)</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;таможенная пошлина, получение ЭПТС, СБКТС, СВХ</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;адресная доставка мотоцикла от таможни до заказчика</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;услуги MOTOSHAR</b></span>
                  <span>&ensp;</span>
                  <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;Все пункты учтены в калькуляторе, прозрачно и понятно!</span>
                  <span>&ensp;</span>
               </>,
         
            section4: state ?
               <p>
                  Первый - <b>депозит 10%</b> - полностью зачтём в мото<br />
                  Второй - после покупки мотоцикла на аукционе:<br />
                  <b>цена мото и расходы в Японии + услуги Motoshar</b><br />
                  Третий - после получения ЭПТС на мотоцикл:<br />
                  <b>фрахт, пошлина, склад, экспертиза</b><br />
                  Четвёртый - при получении мотоцикла:<br />
                  <b>оплата адресной доставки</b><br /><br />
                  Все расходы учтены и известны, ничего лишнего!
               </p>
               :
               <>
                  <span>&ensp;</span>
                  <span>Первый, при заключении договора: <b>депозит 10%</b> - зачитывается в стоимость</span>
                  <span>&ensp;Второй, после покупки мотоцикла на аукционе:</span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;🗸&ensp;фактическая цена мотоцикла в Японии + расходы в Японии</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;нашу комиссию вычтем из депозита, остаток зачтём в покупку</b></span>
                  <span>&ensp;&ensp;&ensp;Третий, после получения ЭПТС на мотоцикл:</span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;стоимость морской перевозки - фрахт</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;таможенная пошлина, ЭПТС, СВХ, СБКТС</b></span>
                  <span>&ensp;&ensp;&ensp;&ensp;&ensp;Четвёртый, при получении мотоцикла заказчиком:</span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;адресная доставка оплачивается при получении мотоцикла</b></span>
                  <span>&ensp;</span>
                  <span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;Все расходы учтены и известны, ничего лишнего!</span>
                  <span>&ensp;</span>
               </>,
         
            section5: state ?
               <>
                  <h2>Получение мотоцикла в транспортной</h2>
                  <p>
                     Мотоцикл после таможни получает транспортная<br />
                     Надёжно упакуют в обрешётку и закрепят растяжками<br />
                     Возможна дополнительная фанерная защита<br />
                     Останется дождаться поступлении мотоцикла в город,<br />
                     в пункте выдачи осмотреть и оплатить доставку<br /><br />
                     <b>И получить свой новый мотоцикл!</b>
                  </p>
               </>
               :
               <>
                  <h2>Получение мотоцикла в транспортной компании</h2>
                  <span>&ensp;</span>
                  <span>Мотоцикл после оформления ЭПТС получает транспортная компания</span>
                  <span>&ensp;Упакуют в деревянную обрешётку, закрепят на растяжки, укроют плёнкой</span>
                  <span>&ensp;&ensp;При желании сделают дополнительную наружную фанерную упаковку</span>
                  <span>&ensp;&ensp;&ensp;Заказчику останется дождаться уведомления о поступлении мотоцикла в город,</span>
                  <span>&ensp;&ensp;&ensp;&ensp;приехать в пункт выдачи, оплатить услуги адресной доставки и забрать мотоцикл</span>
               </>,
         
            section6: state ?
               <p>
                  Часто в один день торгуются несколько нужных лотов<br />
                  Мы можем <b>принять несколько ставок</b> одновременно<br />
                  С условием покупки только одно из них!<br /><br />
                  А также:<br />
                  <b>&#8226; отправляем сразу - не ждём сбора контейнера!<br />
                  &#8226; фиксируем курс валюты - гарантия стоимости!<br />
                  &#8226; дополнительная фотоопись мотоцикла в Японии!<br />
                  &#8226; обслуживание в нашей классной ремзоне!</b>
               </p>
               :
               <>
                  <span>&ensp;</span>
                  <span>Часто в один день торгуются несколько интересных мотоциклов</span>
                  <span>&ensp;Это могут быть разные или одинаковые модели, торгующиеся в один день</span>
                  <span>&ensp;&ensp;Мы можем <b>принять сразу несколько ставок на любые лоты</b> одновременно</span>
                  <span>&ensp;&ensp;&ensp;С условием покупки только одно из них!</span>
                  <span>&ensp;</span>
                  <span>&ensp;&ensp;&ensp;&ensp;Ещё важные моменты:</span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;мы не ждём сбора контейнера - отправялем каждый мотоцикл сразу!</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;фиксируем курс валюты на день торгов - гарантия стоимости</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;делаем детальную фотоопись мотоцикла в Японии после покупки</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;выбор любой транспортной компании для адресной доставки</b></span>
               </>,
         
            section7: state ?
               <p>
                  Доверьте нам обслуживание Вашего мотоцикла<br />
                  <br />
                  <b>&#8226; грамотно проверим все узлы и электрику<br />
                  &#8226; составим чек-лист и согласуем все работы<br />
                  &#8226; подберём и закажем все нужные запчасти<br />
                  &#8226; установим дополнительное оборудование<br />
                  &#8226; отполируем и оставим дожидаться хозяина</b>
               </p>
               :
               <>
                  <span>&ensp;</span>
                  <span>Мы можем обслужить мотоцикл после покупки и получения</span>
                  <span>&ensp;Имеем большой опыт работы с мототехникой</span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;🗸&ensp;проверим все узлы и электрику</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;составим чек-лист и согласуем необходиме работы</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;подберём и выкупим или закажем все нужные запчасти</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;установим по желанию дополнительное оборудование</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;и оставим дожидаться хозяина!</b></span>
               </>,
         
            section8: state ?
               <p>
                  После обслуживания мотоцикл можно оставить у нас<br />
                  Так же принимаем мотциклы на зимнее хранение<br />
                  Пока мотоцикл у нас, проверим и обсудим работы<br />
                  Подготовим к сезону и оставим дожидаться хозяина<br />
                  <br />
                  <b>&#8226; принимаем ответственно по договору<br />
                  &#8226; помещение тёплое, охраняемое<br />
                  &#8226; оплачивать хранение можно помесячно<br />
                  &#8226; сделаем предсезонное ТО со скидкой</b>
               </p>
               :
               <>
                  <span>&ensp;</span>
                  <span>После покупки и обслуживания мотоцикла его можно оставить у нас на хранении</span>
                  <span>&ensp;Так же возможно оставить мотцикл на зимнее хранение</span>
                  <span>&ensp;&ensp;Пока мотоцикл у нас, проверим его, обсудим обнаруженные замечания</span>
                  <span>&ensp;&ensp;&ensp;Подготовим к сезону и оставим дожидаться хозяина</span>
                  <span>&ensp;</span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;помещение тёплое, охраняемое</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;оплачивать хранение можно помесячно</b></span>
                  <span><b>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;🗸&ensp;сделаем ТО со скидкой</b></span>
               </>,
         
            section9: state ?
               <p>
                  <b>{mainState.mainData.address}<br />
                  {mainState.mainData.cellphone} (whatsapp)<br />
                  {mainState.mainData.email}<br /><br />
                  https://motoshar.ru<br />
                  instagram.com/motoshar.ru<br />
                  vk.com/motoshar</b>
               </p>
               :
               <>
                  <span>&ensp;</span>
                  <span>адрес&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{mainState.mainData.address}</b></span>
                  <span>&ensp;телефон&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{mainState.mainData.cellphone}</b> (whatsapp)</span>
                  <span>&ensp;&ensp;email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{mainState.mainData.email}</b></span>
                  <span>&ensp;&ensp;&ensp;instagram&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><a href='https://instagram.com/motoshar.ru'>https://instagram.com/motoshar.ru</a></b></span>
                  <span>&ensp;&ensp;&ensp;&ensp;vk&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><a href='https://vk.com/motoshar'>https://vk.com/motoshar</a></b></span>
                  <span>&ensp;&ensp;&ensp;&ensp;&ensp;dev&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><a href='https://malkovan.ru'>https://malkovan.ru</a></b></span>
               </>,
         }

         return home[props[req].caption]

      case 'lotPlate':
         const lotPlate = {
            lotNum: state ?
               <p>лот - {props.lotPlate.elem.lot_num}</p> :
               <p>лот {props.lotPlate.elem.lot_num} - {props.lotPlate.elem.auction}</p>,
            
            date: state ?
               <p>{mainState.localDate(
                     {date: props.lotPlate.elem.auction_date})}
               </p> :
               <p>торги {mainState.localDate(
                  {date: props.lotPlate.elem.auction_date})}
               </p>
         }

         return lotPlate[props[req].caption]

      case 'infoBlock':
         const {ratings} = props[req]
         const splitter = mainState.splitter

         const infoBlock = {
            rating: state ?
               ratings.count > 1 ?
                  <>
                     <p>минимум<br />
                        {splitter(ratings.finishMin)} руб
                     </p>
                     <p style={{
                        background: 'rgb(245,245,245)',
                        color: 'black',
                        textShadow: '0 0 1px darkgrey'}}
                     >
                        средняя<br />
                           {
                              splitter(Math.floor(
                                 ratings.finishSum /
                                 ratings.count / 1000) * 1000)
                           } руб
                     </p>
                     <p>максимум<br />
                        {splitter(ratings.finishMax)} руб
                     </p>
                  </>
               :
                  <>
                     <p></p>
                     <p>по цене<br />
                        {splitter(ratings.finishMin)} руб</p>
                     <p></p>
                  </>
            :
               ratings.count > 1 ?
                  <>
                     <p>мин - {
                        splitter(ratings.finishMin)} руб
                     </p>
                     <p style={{
                        background: 'rgb(245,245,245)',
                        color: 'black',
                        textShadow: '0 0 1px darkgrey'}}
                     >
                        средняя - {
                           splitter(Math.floor(
                              ratings.finishSum /
                              ratings.count / 1000) * 1000)
                        } руб
                     </p>
                     <p>макс - {
                        splitter(ratings.finishMax)} руб
                     </p>
                  </>
               :
                  <>
                     <p></p>
                     <p>по цене - {splitter(ratings.finishMin)} руб</p>
                     <p></p>
                  </>
         }
      
         return infoBlock[props[req].caption]

      case 'calc':
         const calc = {
            heading: state ?
               <>
                  <h1>Калькулятор полной стоимости</h1>
                  <h2>учёт всех возможных расходов под "ключ"</h2>
               </>
               :
               <>
                  <h1>Калькулятор стоимости мотоцикла с аукционов Японии</h1>
                  <h2>расчёт с учётом всех возможных расходов под "ключ" в городе заказчика</h2>
               </>,
      
            bigPower: state ?
               <span>от 150 сил?</span> : <span>мощнее 150 сил?</span>,
      
            bidPower: state ? '+ ' : 'акциз ',
      
            kyushuCaption: state ?
               'цена фрахта' : 'фрахт из этого порта дороже',            
         }

         return calc[props[req].caption]

      case 'button':
         const button = {
            'harley-davidson': state ? 'HD' : 'harley-davidson'
         }

         return button[props[req].caption]

      case 'filterBlock':
         const filterBlock = {visible: <></>}

         return filterBlock[props[req].caption]

      case 'lotCard':
         const {elem} = props.lotCard

         const lotCard = {
            statusAndPvi: state ?
               <></>
            :
               <>
                  <p>
                  {
                     elem.status_lot === 'Ranked' ?
                        <span style={{color: 'darkgreen'}}>
                           исправен
                        </span>
                     : 
                        <span style={{color: 'darkred'}}>
                           повреждён
                        </span>
                  }
                  </p>
                  {
                     elem.pvi_date ?
                        <p>ТО до {elem.pvi_date}</p>
                     : 
                        <></>
                  }
               </>,

            markaAndFrame: state ?
               <>
                  <p>
                     {elem.marka_name.toUpperCase()}&ensp;
                     {elem.model_name.toUpperCase()}
                  </p>
                  <p>рама {elem.serial.toUpperCase()}
                     {
                        elem.engine_model ?
                           <>&emsp;двигатель {
                              elem.engine_model.toUpperCase()}</>
                        :
                           <></>                        
                     }
                  </p>
               </>
            :
               <>
                  <p>{elem.marka_name.toUpperCase()}</p>
                  <p>{elem.model_name.toUpperCase()}</p>
                  <p>рама {elem.serial.toUpperCase()}</p>
                  {
                     elem.engine_model ?
                        <p>двигатель {
                           elem.engine_model.toUpperCase()}</p>
                     :
                        <></>                        
                  }
               </>,

            yearAndEng: state ?
               <>
                  <p>год<br />{elem.year}</p>
                  <p>объём<br />{elem.eng_v} cm3</p>
                  <p>пробег<br />{mainState.checkMileage(elem.mileage)}</p>
                  {
                     elem.mileage_pvi ?
                        <p>пробег на ТО<br />
                           {mainState.checkMileage(elem.mileage_pvi)}
                        </p> : <></>
                  }
               </>
            :
               <>
                  <p>год {elem.year}</p>
                  <p>объём {elem.eng_v} см3</p>
                  <p>пробег {mainState.checkMileage(elem.mileage)}</p>
                  {
                     elem.mileage_pvi ?
                        <p>пробег на ТО {
                           mainState.checkMileage(elem.mileage_pvi)
                        }</p> : null
                  }
               </>,

            descriptionCost: state ?
               <>
                  <span>Цена <b>руб</b> - с учётом <b>всех</b> расходов, документов и услуг</span>
                  <br /><span>"под ключ" во Владивостоке</span>
                  <p>Цена <b>йен</b> - чистая цена в Японии</p>
               </>
            :
               <>
                  <span>Цена в <b>рублях</b> указана с учётом всех расходов, 
                     документов и услуг, </span>
                  <span>плюсом только доставка из Владивостока</span>
                  <p>Цена в <b>йенах</b> - чистая цена на аукционе в Японии</p>
               </>,

            descriptionRating: state ?
               <>
                  <span className='lcdRatingPcs'>
                     рама <span>{elem.rate_frame}</span></span>
                  <span className='lcdRatingPcs'>
                     двиг. <span>{elem.rate_eng}</span></span>
                  <span className='lcdRatingPcs'>
                     эл. <span>{elem.rate_el}</span></span>
                  <span className='lcdRatingPcs'>
                     перед <span>{elem.rate_front}</span></span>
                  <span className='lcdRatingPcs'>
                     зад <span>{elem.rate_rear}</span></span>
                  <span className='lcdRatingPcs'>
                     косм. <span>{elem.rate_ext}</span></span>
               </>
            :
               <>
                  <span className='lcdRatingPcs'>
                     рама <span>{elem.rate_frame}</span></span>
                  <span className='lcdRatingPcs'>
                     двигатель <span>{elem.rate_eng}</span></span>
                  <span className='lcdRatingPcs'>
                     электрика <span>{elem.rate_el}</span></span>
                  <span className='lcdRatingPcs'>
                     перед <span>{elem.rate_front}</span></span>
                  <span className='lcdRatingPcs'>
                     зад <span>{elem.rate_rear}</span></span>
                  <span className='lcdRatingPcs'>
                     косметика <span>{elem.rate_ext}</span></span>
               </>,

            inspection: state ?
               <p data-norate>этот мотоцикл ожидает осмотр</p>
            :
               <>
                  <p>ожидается</p>
                  <p>осмотр</p>
               </>,                           
         }

         return lotCard[props[req].caption]

      case 'callback':
         const {data} = props.callback

         const callback = {
            linkToLot: state ?
               <>
                  <p>
                     прикреплена ссылка на лот - <b>{data.lot_num}<br />
                     {data.marka_name.toUpperCase()}&nbsp;
                     {data.model_name}</b>
                  </p>
               </>
            :
               <>
                  <p>
                     ссылка на лот
                     &ensp;<b>{data.lot_num}&nbsp;-&nbsp;
                     {data.marka_name.toUpperCase()}&nbsp;
                     {data.model_name}</b>&nbsp;
                     прикреплена к заявке
                  </p>
               </>
         }

         return callback[props[req].caption]

      default: return <></>
   }
}

export default CheckMobile