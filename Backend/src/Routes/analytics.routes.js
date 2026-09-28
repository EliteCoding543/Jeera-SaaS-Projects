import  express from 'express'
const AnalyticsRouter = express.Router()
import { isLoggedIn, authorize} from '../Middlewere/index.js'
import { getAllOrgsData, getAnalytics } from '../Controller/analytics.controller.js'


AnalyticsRouter.get(
    "/",
    isLoggedIn,
    authorize("owner"),
    getAnalytics
)

AnalyticsRouter.get(
    "/get-all-orgs-data",
    isLoggedIn,
    authorize("owner"),
    getAllOrgsData
)

export default AnalyticsRouter;



