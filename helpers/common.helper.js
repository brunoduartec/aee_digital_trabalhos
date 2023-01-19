const _ = require("lodash")

function getArrayOmitingParams(array, filter){
    const arrayFiltered = array.map((item)=>{
        const omitted = _.omit(item,filter)
        return omitted
      })
      return arrayFiltered
}

function getArrayPickingParams(array, filter){
    const arrayFiltered = array.map((item)=>{
        const picked = _.pick(item,filter)
        return picked
      })
      return arrayFiltered
}


module.exports = {
    getArrayOmitingParams,
    getArrayPickingParams
}