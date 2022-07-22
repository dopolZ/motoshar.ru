export default function fetchCourse(setCurrency) {
   
   fetch('/server/CountLots')
      .then(res => {
         if (res.ok) return res.text()

         throw new Error(res.statusText)
      })
      .then(res => setCurrency({jpy: res, usd: res}))
}