import CustomServiceCsv from "../../../libraries/customs/service.csv.js";
import Data01DaoMongo from "../data/dao.mongo.js";

class Data01Service extends CustomServiceCsv {
  constructor () {
    super(new Data01DaoMongo)
  }
}

export default new Data01Service()