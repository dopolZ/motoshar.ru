const serverCallback = require('./serverCallback.js')
const serverModel = require('./serverModel.js')
const serverModelOnline = require('./serverModelOnline.js')
const serverModelStat = require('./serverModelStat.js')
const serverResult = require('./serverResult.js')
const express = require('express')
const http = require('http')
const server = express()
const sData = require('./serverData.js')
const host = sData.hostExpress
const port = sData.portExpress
server.use( express.json() )
server.listen(port, host)

server.use('/server/callback', (req, res) => {
   serverCallback(req, res)
})

server.use((req, res, next) => {
   if (req.body.markaId === '0') {
      req.body.markaId =
        '%20not%20in%20(52,58,61,50,73,42,78,43,82,104,101,44,94,45)'
   } else {
      req.body.markaId = '=' + req.body.markaId
   }

   req.body.tokenForAPIOptions = sData.token
   
   //dev
   req.body.callAPIOptions = {
      host: sData.hostDev,
      path: '',
   }

   //prod
   // req.body.callAPIOptions = {
   //    host: sData.hostProd,
   //    port: sData.portProd,
   //    path: '',
   // }

   res.result = {} 

   next()
})

server.use('/server/findLotNum', (req, res) => {
   let dateIn, sortDate = ''

   if (req.body.front === 'online') {
      dateIn = 'auction_date%20in'
      sortDate = 'order%20by%20auction_date%20desc%20limit%202)'
         + 'order%20by%20auction_date,lot_num"'
         + sData.sqlEnd
   } else {
      dateIn = 'auction_date%20not%20in'
      sortDate = 'order%20by%20auction_date%20desc%20limit%202)'
         + 'order%20by%20auction_date%20desc,lot_num%20limit%20100"'
         + sData.sqlEnd
   }   

   req.body.sqlForAPIOptions =
      sData.sqlStart
      + '"select%20*%20from%20bike%20where%20lot_num='
      + req.body.lotNum  + '%20and%20' + dateIn
      + '(select%20distinct%20auction_date%20from%20bike%20'
      + sortDate

   req.body.callAPIOptions.path =
      req.body.sqlForAPIOptions + req.body.tokenForAPIOptions

   serverResult(req, res, http)
})

server.use('/server/modelBlock', (req, res, next) => {
   serverModel(req)

   req.body.callAPIOptions.path =
      req.body.sqlForAPIOptions + req.body.tokenForAPIOptions

   if (req.body.front === 'online') {
      serverModelOnline(req, res, http, next)
   } else {
      serverModelStat(req, res, http, next)
   }
})

server.use('/server/DateAuction', (req, res) => {
   req.body.sqlForAPIOptions =
         sData.sqlStart
         + '"select%20distinct%20auction_date%20from%20bike%20'
         + 'order%20by%20auction_date%20desc%20limit%202"'
         + sData.sqlEnd

   req.body.callAPIOptions.path =
      req.body.sqlForAPIOptions + req.body.tokenForAPIOptions

   // get current auction date
   http.get(req.body.callAPIOptions, function(httpRes) {
      let resData = ''
      
      httpRes.on('data', data => resData += data)
      httpRes.on('end', () => res.send(
         JSON.stringify( JSON.parse(resData).response ) )
      )
   })
})

server.use('/server/CountLots', (req, res) => {
   req.body.sqlForAPIOptions =
         sData.sqlStart
         + '"select%20count(id)%20from%20bike"'
         + sData.sqlEnd

   req.body.callAPIOptions.path =
      req.body.sqlForAPIOptions + req.body.tokenForAPIOptions

   // get current auction date
   http.get(req.body.callAPIOptions, function(httpRes) {
      let resData = ''
      
      httpRes.on('data', data => resData += data)
      httpRes.on('end', () => res.send(
         JSON.parse(resData).response[0]['count'])
      )
   })
})

server.use('/server/id', (req, res) => {
   const sql =
      sData.sqlStart
      + '"select%20*%20from%20bike%20where%20id='
      + req.body.id + '"'
      + sData.sqlEnd

   req.body.callAPIOptions.path =
      sql + req.body.tokenForAPIOptions

      serverResult(req, res, http)
})
