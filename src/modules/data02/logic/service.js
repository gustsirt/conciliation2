import CustomServiceCsv from "../../../libraries/customs/service.csv.js";
import Data02DaoMongo from "../data/dao.mongo.js";
import TransformOriginData from '../logic/dtos.js'

class Data02Service extends CustomServiceCsv {
  constructor () {
    super(new Data02DaoMongo, TransformOriginData)
  }
  summary = async (match) => await this.dao.summary(match);
}

export default new Data02Service()