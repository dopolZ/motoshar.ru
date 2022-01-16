import { mainState } from "../../initData"

const createState = () => {
   const select = {
      bid: '',
      bidPower() {
         return this.valuePower > 150 ?
            mainState.mainData.round(
               this.valuePower * mainState.mainData.taxBigPowerRub
            ) : 0
      },
      brand: true,
      checkKyushu: false,
      costKyushu: Math.ceil(
            mainState.mainData.taxFreightRub / 1000
         ) * 1000,
      checkPower: false,
      currentLot: mainState.lotCard?.state,
      customsI: false,
      deliveryI: false,
      depositBid: 0,
      engine: '',
      engineOptions: [<option key={0}></option>],
      freightI: false,
      valuePower: '',
      year: '',
      yearOptions: [<option key={0}></option>],
   }

   const {currentLot} = select

   if (currentLot) {
      select.bid = currentLot.finish ?
         currentLot.finish * 1000 : currentLot.start * 1000
      select.brand =
         currentLot.marka_id === 42 ||
         currentLot.marka_id === 43 ||
         currentLot.marka_id === 44 ||
         currentLot.marka_id === 45 ?
            true : false
      select.engine = currentLot.eng_v ? 
         currentLot.eng_v + ' - ' + currentLot.eng_v : ''
      select.year = currentLot.year ?
         currentLot.year + ' - ' + currentLot.year : ''
      select.checkKyushu = currentLot.auction.split(' ')[1] === 'Kyushu' ?
         true : false
   }

   mainState.mainData.customs.engine.forEach(elem => {   
      select.engineOptions.push(
         <option key={elem.end}>{elem.start} - {elem.end}</option>
      )
   })

   mainState.mainData.customs.year.forEach(elem => {     
      select.yearOptions.push(
         <option key={elem.end}>{elem.start} - {elem.end}</option>
      )
   })

   return select
}

export default createState