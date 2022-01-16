const sData = require('./serverData.js')

function serverModel(req) {   
   req.body.engineBetween = {
      '250': [0, 250],
      '251-400': [251, 400],
      '401-750': [401, 750],
      '751-1300': [751, 1300],
      '1301': [1301, 9999],
   }

   if (req.body.engine in req.body.engineBetween) {
      [req.body.engineStart, req.body.engineEnd] =
         req.body.engineBetween[req.body.engine]
   } else {
      req.body.engineStart = req.body.engine
      req.body.engineEnd = req.body.engine
   }

   if (req.body.front === 'online') {
      req.body.sqlForAPIOptions =
         sData.sqlStart
         + '"select%20distinct%20model_name,model_id%20'
         + 'from%20bike%20'
         + 'where%20marka_id' + req.body.markaId  + '%20and%20'
         + 'eng_v%20between%20' + req.body.engineStart + '%20and%20'
         + req.body.engineEnd + '%20and%20'
         + 'auction_date%20in%20'
         + '(select%20distinct%20auction_date%20from%20bike%20order%20by%20'
         + 'auction_date%20desc%20limit%202)"'
         + sData.sqlEnd
   } else {     
      req.body.sqlForAPIOptions =
         sData.sqlStart
         + '"select%20distinct%20model_name,model_id%20'
         + 'from%20bike%20'
         + 'where%20marka_id' + req.body.markaId + '%20and%20'
         + 'eng_v%20between%20'
         + req.body.engineStart + '%20AND%20'
         + req.body.engineEnd + '%20and%20'
         + 'auction_date%20not%20in%20'
         + '(select%20distinct%20auction_date%20from%20bike%20order%20by%20'
         + 'auction_date%20desc%20limit%202)%20'
         +'order%20by%20model_name"'
         + sData.sqlEnd
   }
}

module.exports = serverModel