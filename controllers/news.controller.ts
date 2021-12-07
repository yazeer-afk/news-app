import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes'
import axios from 'axios'
import cheerio from 'cheerio'

interface INews {
    title: string
    newsUrl: string | undefined
    image: string | undefined
    date: string
}

export const paginateNews = async (_: Request, res: Response) => {

    const url = 'https://www.newsfirst.lk/latest-news/'
    const data: INews[] = []

    const page = await axios(url)
    const $ = cheerio.load(page.data)
    $('.news-lf-section', page.data).each(function () {
        const mainBlock = $(this).find('.main-news-block')
        const title = mainBlock.find('h1').text()
        const newsUrl = mainBlock.find('a').attr('href')
        const image = mainBlock.find('img').attr('src')
        const date = mainBlock.find('.news-set-date').text()

        const news = {
            title, newsUrl, image, date
        }
        data.push(news)

        $('.sub-1-news-block', this).each(function () {
            const title = $(this).find('h2').text()
            const newsUrl = $(this).find('a').attr('href')
            const image = $(this).find('img').attr('src')
            const date = $(this).find('p').text()

            const news = {
                title, newsUrl, image, date
            }
            data.push(news)
        })

    })

    res.status(StatusCodes.OK).json({ data })

}