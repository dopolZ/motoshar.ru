function CustomsTable(usd) {
   this.year = [
      { "start": 2018, "end": 2021 },
      { "start": 2016, "end": 2017 },
      { "start": 2014, "end": 2015 },
      { "start": 2011, "end": 2013 },
      { "start": 2008, "end": 2010 },
      { "start": 2004, "end": 2007 },
      { "start": 2000, "end": 2003 },
      { "start": 1885, "end": 1999 },
   ]

   this.engine = [
      { "start": 0, "end": 200 },
      { "start": 201, "end": 300 },
      { "start": 301, "end": 400 },
      { "start": 401, "end": 500 },
      { "start": 501, "end": 600 },
      { "start": 601, "end": 700 },
      { "start": 701, "end": 800 },
      { "start": 801, "end": 900 },
      { "start": 901, "end": 1000 },
      { "start": 1001, "end": 1100 },
      { "start": 1101, "end": 1300 },
      { "start": 1301, "end": 1500 },
      { "start": 1501, "end": 3000 },
   ]
   
   const value = [
      [1312, 978, 714, 598, 486, 407, 301, 189],
      [2965, 2316, 1669, 1411, 1283, 1076, 828, 465],
      [3205, 2741, 2616, 2165, 1532, 1308, 1091, 618],
      [3631, 3086, 2711, 2289, 1826, 1475, 1315, 742],
      [4289, 3621, 2789, 2337, 2016, 1711, 1356, 903],
      [5016, 4091, 2929, 2481, 2196, 1739, 1412, 938],
      [5867, 4751, 3013, 2631, 2304, 1791, 1466, 1011],
      [6500, 5385, 4126, 3018, 2562, 1844, 1614, 1076],
      [7218, 6016, 4491, 3115, 2617, 1911, 1676, 1214],
      [7765, 6411, 4784, 3201, 2817, 2036, 1784, 1296],
      [8569, 6996, 5011, 3265, 3016, 2161, 1914, 1368],
      [9486, 7416, 5953, 3972, 3291, 2424, 1939, 1407],
      [10616, 8091, 6738, 5396, 3927, 2561, 2031, 1466],
   ]

   const calculateCustoms = () => value.map((elem, i) => (
      elem.map(elem => i < 7 ?
         Math.ceil( Math.ceil(elem *= .42 * usd) / 10000) * 10000 :
         Math.ceil( Math.ceil(elem *= .37 * usd) / 10000) * 10000
      )
   ))

   this.value = calculateCustoms()
}

export function InitData(obj) {
   const {front} = obj
   
   this.address = 'Екатеринбург, Крауля 44'
   this.cellphone = '+7 922 290 20 30'
   this.courseJpy = 1.1
   this.courseUsd = 130
   this.customs = new CustomsTable(this.courseUsd)
   this.email = 'info@motoshar.ru'
   this.front = front
   this.minBidLotJpy = 50000

   this.round = num => Math.ceil(num / 1000) * 1000
   
   this.taxBigPowerRub = 511
   this.taxBrokerRub = 7000
   this.taxDealerJpy = 50000
   this.taxFreightUsd = 300
   this.taxSbktsRub = 15000
   this.taxServiceRub = 30000
   this.taxSvhRub = 7000
   this.taxSwiftJpy = 10000

   this.taxDealerRub = Math.floor(this.taxDealerJpy * this.courseJpy)
   this.taxFreightRub = Math.floor(this.taxFreightUsd * this.courseUsd)
   this.taxSwiftRub = Math.floor(this.taxSwiftJpy * this.courseJpy)
   this.taxAllServicesRub =
      this.taxDealerRub + this.taxSwiftRub +
      this.taxFreightRub + this.taxSvhRub + this.taxSbktsRub +
      this.taxBrokerRub + this.taxServiceRub

   this.calcJpyToRub = obj => {
      const {brand, eng_v, year, start,
         finish, clean, marka_id, bid} = obj
      
      const iEngine = this.customs.engine.findIndex(elem => (
         eng_v >= elem.start && eng_v <= elem.end
      ))
         
      const iYear = this.customs.year.findIndex(elem => (
         year >= elem.start && year <= elem.end
      ))

      const japan =
         marka_id === 42 || marka_id === 43 ||
         marka_id === 44 || marka_id === 45 ||
         brand ? true : false

      const importCustoms = bid => eng_v < 801 ?
         this.round(bid * .50 * this.courseJpy) :
         this.round(bid * .45 * this.courseJpy)

      if (clean) {
         return (
            (japan ?
               this.round(this.customs.value[iEngine][iYear]) :
               importCustoms(bid) )
            + this.taxSbktsRub
            + this.taxSvhRub
            + this.taxBrokerRub
         ) || 0
      }

      return ({
         start: this.round(
            (japan ?
               this.customs.value[iEngine][iYear] :
               importCustoms(start * 1000) )
            + (start ?
               this.round(start * this.courseJpy * 1000) :
               this.round(this.minBidLotJpy * this.courseJpy)
            ) + this.taxAllServicesRub || 0
         ),
      
         finish: this.round(
            (japan ?
               this.customs.value[iEngine][iYear] :
               importCustoms(finish * 1000) )
            + this.round(finish * 1000 * this.courseJpy)
            + this.taxAllServicesRub || 0
         ),
      })
   }
}

export const mainState = {
   cache: {
      lotsFetch: '',
      modelsFetch: '',
      lotsFilter: '',
      lotsFilterJsx: '',
      modelsFilter: '',
      modelsFilterJsx: '',
      lastFindLotNum: '',
   },

   mainData: new InitData({front: 'home'}),

   selectBlock: {
      brand: '',
      markaId: '',
      engine: '',
      model: {},
   },

   filter: {
      disabled: true,
      front: '',
      mileageMax: '',
      mileageMin: '',
      ranked: true,
      rateMax: '',
      rateMin: '',
      recycle: false,
      yearMax: '',
      yearMin: '',
   },

   viewResult: 'plate',

   changeImgUrl: id => {
      const url = 'https://bdsc.jupiter.ac/auctiondata/bds/disp/bds/'
      + id.slice(0, 8) + '/image1_small/' + id.slice(-4)
      + id.slice(0, 8) + '.jpg'

      return url
   },

   checkMileage: mileage => {
      if (!mileage) return mileage
      
      if ( Boolean( +mileage.slice(-1) ) ||
           +mileage.slice(-1) === 0) {
         return mileage
      }

      const start = mileage.slice(0, -1)

      const end = (
         mileage.slice(-1) === 'K' ?
            <span style={{color: 'green'}}>
               {mileage.slice(-1).toLowerCase()}m
            </span> :
         mileage.slice(-1) === 'M' ?
            <span style={{color: 'green'}}>
               {mileage.slice(-1).toLowerCase()}i
            </span> :
            <span style={{color: 'red'}}>
               {mileage.slice(-1).toLowerCase()}
            </span>
      )
      
      return <>{start} {end}</>
   },

   imgValidCheck: date => {
      if (Date.parse(date) > Date.now() - 1720000000) { //detail
         return 'full'
      } else if (Date.parse(date) > Date.now() - 31500000000) { //main
         return 'main'
      } else return 'empty'      
   },

   localDate: obj => {
      const {date, time} = obj         

      return (
         !date && !time ?
            new Date().toLocaleString('en-GB', {
               day: 'numeric',
               month: 'short',
               year: 'numeric',
            })
         : !date && time ?
            new Date().toLocaleString('en-GB', {
               day: 'numeric',
               month: 'short',
               year: 'numeric',
               hour: 'numeric',
               minute: 'numeric',
            })
         : date && !time ?
            new Date(date).toLocaleString('en-GB', {
               day: 'numeric',
               month: 'short',
               year: 'numeric',
            })
         :  new Date(date).toLocaleString('en-GB', {
               day: 'numeric',
               month: 'short',
               year: 'numeric',
               hour: 'numeric',
               minute: 'numeric',
         })            
      )
   },

   createKey: () =>
      Math.random() / Math.random() / Math.random() * 10000,

   splitter: num =>
      num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),

   mobile: str => str ?
      window.outerHeight > window.outerWidth
      :
      window.navigator.userAgent.includes('Mobile')
}

export const markaId = {
   "aprilia": 52,
   "bimota": 57,
   "bmw": 58,
   "buell": 61,
   "daelim": 3,
   "ducati": 50,
   "gilera": 71,
   "harley-davidson": 73,
   "honda": 42,
   "husqvarna": 78,
   "kawasaki": 43,
   "kit bike": 1,
   "kit car": 2,
   "ktm": 82,
   "kymco": 98,
   "moto guzzi": 104,
   "motoguzzi": 104,
   "mv agusta": 101,
   "mvagusta": 101,
   "прочие": 0,
   "other": 0,
   "pgo": 102,
   "piaggio": 88,
   "suzuki": 44,
   "sym": 97,
   "triumph": 94,
   "vespa": 100,
   "yamaha": 45,
}
