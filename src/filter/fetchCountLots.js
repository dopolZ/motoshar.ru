import {mainState} from '../initData'

export function fetchCountLots() {
   fetch('/server/CountLots')
      .then(res => {
         if (res.ok) return res.text()

         throw new Error(res.statusText)
      })
      .then(res => {
         mainState.filterHeading.setState(
            <>
               количество записей в базе данных:&emsp;
               <b>{mainState.splitter(res)}</b>
            </>
         )
      })
      .catch(() => {
         mainState.filterHeading.setState(
            <>
               что-то пошло не так ... попробуйте обновить
            </>
         )
      })
}