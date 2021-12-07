import express from 'express'
import { paginateNews } from '../controllers/news.controller'


const router = express.Router()

router.route('/').get(paginateNews)
// router.route('/:page').get(getOne).patch(update).delete(deleteOne)

export default router