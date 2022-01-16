import {mainState} from '../../initData'
import stl from './style.module.css'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import CloseButton from '../../closeButton/CloseButton'
import CheckMobile from '../../CheckMobile'

function Callback() {
   const [state, setState] = useState()
   const [data, setData] = useState({
      name: '',
      phone: '',
      personal: false,
   })
   mainState.callback = {state, setState, data, setData}

   const history = useHistory()

   function Answer() {
      const [state, setState] = useState()
      mainState.callbackAnswer = {state, setState}

      const content = !data.name || !data.phone || !data.personal ?
         <>
            <p>НУЖНО ЗАПОЛНИТЬ ВСЕ ПОЛЯ</p>
            <p>ОТМЕТИТЬ СОГЛАСИЕ НА ОБРАБОТКУ ДАННЫХ</p>
         </> :
         <>
            <p>ЗАЯВКА ОТПРАВЛЕНА</p>
            <p>ДО СВЯЗИ</p>
         </>      
   
      return (
         <div className={!state ? stl.answerNo :
            !data.name || !data.phone || !data.personal ?
               stl.answerWarning : stl.answerSend}>
            {content}
         </div>
      )
   }

   const fetchCallback = () => {      
      fetch('/server/callback', {
         method: 'post',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            from: history.location.pathname,
         })
      })
      .then(res => {
         if (!res.ok) {   
            return new Error(res)
         }
   
         return res
      })
      .catch(err => {   
         console.dir(err)
      })
   }

   const onClickClose = () => {
      setState('off')

      setTimeout(() => history.goBack(), 600)
   }

   const onClickSubmit = () => {
      if (!data.name || !data.phone || !data.personal) {                      
         mainState.callbackAnswer.setState({})

         setTimeout(() =>
            mainState.callbackAnswer.setState(),
         3000)
      } else {
         fetchCallback()

         setState('offSend')

         setTimeout( () => mainState.callbackAnswer.setState({}) )

         setTimeout(() => history.goBack(), 3000)
      }
   }

   return (
      <div
         className={state === 'off' ? stl.mainBgClose :
            state === 'offSend' ? stl.mainBgCloseSend : stl.mainBg
         }
      >
         <div className={stl.main}>
            <CloseButton
               className='callback'
               onClick={onClickClose}
            />
            <Answer />
            <div className={stl.h1h2}>
               <h1>обратный звонок</h1>
               <h2>
                  оставьте контакты свяжемся с Вами в ближайшее время
               </h2>
            </div>
            {
               mainState.lotCard?.state ?
                  <div className={stl.lot}>
                     <CheckMobile callback={{
                        caption: 'linkToLot',
                        data: mainState.lotCard.state,
                     }} />
                  </div>
               :
                  <></>
            }
            <div className={stl.inputs}>
               <input
                  className={stl.name}
                  onChange={e => setData({
                     ...data, name: e.target.value
                  })}
                  placeholder='имя'
                  type='textarea'
                  value={data.name}
               />
               <input
                  className={stl.phone}
                  onChange={e => setData({
                     ...data, phone: e.target.value
                  })}
                  placeholder='телефон (whatsapp, telegram)'
                  type='tel'
                  value={data.phone}
               />
               <div>
                  <input
                     className={stl.personal}
                     onChange={() => setData({
                        ...data, personal: !data.personal})}
                     type='checkbox'
                  />
                  <span>согласен на обработку персональных данных</span>
               </div>            
               <input
                  className={stl.submit}
                  onClick={onClickSubmit}
                  type='button'
                  value='отправить'
               />
            </div>
         </div>
      </div>
   )
}

export default Callback