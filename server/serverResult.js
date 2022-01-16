function serverResult(req, res, http) {
   // get lot list
   http.get(req.body.callAPIOptions, function(httpRes) {
      let resData = ''
      
      httpRes.on('data', data => resData += data)
      httpRes.on('end', () => {
         resData = JSON.parse(resData).response

         const modelNameCount = {}

         resData.forEach(elem => {
            elem.model_name in modelNameCount ?
               modelNameCount[elem.model_name] ++ :
               modelNameCount[elem.model_name] = 1   
         })

         res.result.lotList = resData
         res.result.modelNameCount = modelNameCount

         res.send( JSON.stringify(res.result) )
      })
   })
}

module.exports = serverResult