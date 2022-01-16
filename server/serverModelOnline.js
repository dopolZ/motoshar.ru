const sData = require('./serverData.js')
const serverResult = require('./serverResult.js')

function serverModelOnline(req, res, http, next) {
   // get model list
   http.get(req.body.callAPIOptions, function(httpRes) {
      let resData = ''
      
      httpRes.on('data', data => resData += data)
      httpRes.on('end', () => {
         resData = JSON.parse(resData).response

         res.result.modelList = resData

         req.body.sqlForAPIOptions =
         sData.sqlStart
         + '"select%20*%20from%20bike%20'
         + 'where%20marka_id' + req.body.markaId + '%20and%20'
         + 'eng_v%20between%20' + req.body.engineStart + '%20and%20'
         + req.body.engineEnd + '%20and%20'
         + 'auction_date%20in%20'
         + '(select%20distinct%20auction_date%20from%20bike%20order%20by%20'
         + 'auction_date%20desc%20limit%202)%20'
         + 'order%20by%20auction_date,lot_num"'
         + sData.sqlEnd

         req.body.callAPIOptions.path =
            req.body.sqlForAPIOptions + req.body.tokenForAPIOptions

         serverResult(req, res, http, next)
      })
   })
}

module.exports = serverModelOnline