import imgStat from './img/stat.webp'
import imgOnline from './img/online.webp'
import imgCalc from './img/calc.webp'
import imgPrice from './img/price.webp'
import imgDelivery from './img/delivery.webp'
import imgHi from './img/hi.webp'
import imgRepair from './img/repair.webp'
import imgStore from './img/store.webp'
import imgContacts from './img/contacts.webp'

import Button from '../buttons/Button'
import NavHome from '../nav/navHome/NavHome'
import Footer from '../footer/Footer'
import {mainState} from '../initData'
import stl from './style.module.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import CheckMobile from '../CheckMobile'

import useCurrency from '../currency/useCurrency'
import fetchCourse from '../currency/fetchCourse'

function Home() {
   const navigate = useNavigate()
   const location = useLocation()

   const {setCurrency} = useCurrency()
   const handleCurrency = () => fetchCourse(setCurrency)

   console.log(useCurrency())

   useEffect(() => {
      mainState.fastBlock.setState(mainState.fastBlockOn(location.state?.fast) )

      mainState.header.setMenuMob(location.state?.navMob)
      mainState.nav.setNavMob(location.state?.navMob)

      const list = () => {
         const section = document.querySelectorAll('section')
         const sectionTop = Array.from(section).map(e => e.offsetTop)

         sectionTop.find((e, i) => {
            if (e - window.pageYOffset + section[i].offsetHeight * .4 > 0) {               
               if (mainState.nav.state !== i) {
                  mainState.nav.setState(i)             
               }
               return true
            }

            return false
         })

         setTimeout(() =>
            window.addEventListener('scroll', list, {once: true})
         , 100)
      }

      window.addEventListener('scroll', list, {once: true})
   
      return () => {
         window.removeEventListener('scroll', list, {once: true})
      }
   })

   const handleClick = e => navigate('/', {
      state: {
         fast: e.target.textContent,
         from: location.pathname,
      }
   })

   return (
      <>
         <NavHome />
         <h1 className={stl.h1}>
            Привозим проверенные мотоциклы&thinsp;
            <Link to='admin'>а</Link>
            укционов японии
         </h1>
         <h2 className={stl.h2} onClick={handleCurrency}>
            работаем от подбора до вручения по всей России
         </h2>
         <section className={stl.section1}>
            <img className={stl.img} src={imgOnline} alt='img'></img>
            <div className={stl.description}>
               <h2>Выбирайте мотоциклы на ближайших торгах</h2>
               <CheckMobile home={{caption: 'section1'}} />
               <div className={stl.buttons}>
                  <Link
                     className={stl.link}
                     to={{
                        pathname: 'online',
                        from: location.pathname,
                     }}
                  >
                     <Button
                        name='торги'
                        class='home'
                     />
                  </Link>
                  <Button
                     class='home'
                     name='заявка'
                     onclick={handleClick}
                  />
               </div>
            </div>            
         </section>
         <section className={stl.section}>
            <img className={stl.img} src={imgStat} alt='img'></img>
            <div className={stl.description}>
               <h2>Смотрите цены в статистике торгов</h2>
               <CheckMobile home={{caption: 'section2'}} />
               <div className={stl.buttons}>
                  <Link
                     className={stl.link}
                     to={{
                        pathname: 'stat',
                        from: location.pathname,
                     }}
                  >
                     <Button
                        name='статистика'
                        class='home'
                     />
                  </Link>
                  <Button
                     class='home'
                     name='заявка'
                     onclick={handleClick}
                  />
               </div>
            </div>
         </section>
         <section className={stl.section}>
            <img className={stl.img} src={imgCalc} alt='img'></img>
            <div className={stl.description}>
               <CheckMobile home={{caption: 'section3'}} />
               <div className={stl.buttons}>
                  <Button
                     class='home'
                     name='калькулятор'
                     onclick={handleClick}
                  />
               </div>
            </div>
         </section>
         <section className={stl.section}>
            <img className={stl.img} src={imgPrice} alt='img'></img>
            <div className={stl.description}>
               <h2>Этапы оплаты в процессе заказа</h2>
               <CheckMobile home={{caption: 'section4'}} />
            </div>
         </section>
         <section className={stl.section}>
            <img className={stl.img} src={imgDelivery} alt='img'></img>
            <div className={stl.description}>
            <CheckMobile home={{caption: 'section5'}} />
            </div>
         </section>
         <section className={stl.section}>
            <img className={stl.img} src={imgHi} alt='img'></img>
            <div className={stl.description}>
               <h2>У нас есть важные преимущества</h2>
               <CheckMobile home={{caption: 'section6'}} />
            </div>
         </section>
         <section className={stl.section}>
            <img className={stl.img} src={imgRepair} alt='img'></img>
            <div className={stl.description}>
               <h2>Постпродажное обслуживание у нас</h2>
               <CheckMobile home={{caption: 'section7'}} />
            </div>
         </section>
         <section className={stl.section}>
            <img className={stl.img} src={imgStore} alt='img'></img>
            <div className={stl.description}>
               <h2>Ответственное & зимнее хранение</h2>
               <CheckMobile home={{caption: 'section8'}} />                
            </div>
         </section>
         <section className={stl.sectionLast}>
            <img className={stl.img} src={imgContacts} alt='img'></img>
            <div className={stl.description}>
               <h2>Все наши контакты</h2>
               <CheckMobile home={{caption: 'section9'}} />            
            </div>
         </section>
         <Footer />
      </>
   )
}

export default Home