const express = require('express');
const router = express.Router();
require('dotenv').config();
//importing axios from axios
const axios = require('axios');



const api_key = process.env.NEWS_API_KEY;


//Route 1 ->for fetching all the news from the external api
router.get('/', async (req, res) => {


  try {
    //calling the getNews function
    let news = await getNews(req.query.page);


    //creating an supportive variabele to check whether the user wants to order the news by title or not
    var isOrderByTitleChecked = (req.query.orderByTitle === 'true');





    if (isOrderByTitleChecked === true) {
      let OrderArrayData = news;
      OrderArrayData.articles.sort((a, b) => a.title.split(/\s+/)[0].replace(/[^a-zA-Z ]/g, "").localeCompare(b.title.split(/\s+/)[0].replace(/[^a-zA-Z ]/g, "")));
      res.send({
        totalArticles: news.totalResults,
        news: OrderArrayData.articles
      });
    } else {
      //filter the new on the basis of the query parameter
      if (req.query.q!==undefined) {
        const newsData = await getNews(req.query.page, req.query.p);
        res.send({
          news: newsData.articles,
          totalArticles: newsData.totalResults,
        })
      } else {
        let filtereElementts = [];
        news.articles.forEach((el) => {
          
          if (el.author !== null) {
            let authorSplittedArray = el.author.split(/\s+/);
            if (authorSplittedArray.length >= 2 && authorSplittedArray.length <= 3) {
              filtereElementts.push(el);
            }
          }
        });
        res.send({
          news: filtereElementts,
          totalArticles: news.totalResults,
        });
      }
    }

  } catch (err) {
    console.log(err);
  }

});

//function which gets the news from the external api
const getNews = async (pageNumber = 1, queryParamter) => {
  let dataGotBackFromApi = [];
  try {
    
    let res=null;
    if (queryParamter===undefined) {
      
      res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}&page=${pageNumber}&pageSize=20`);
      dataGotBackFromApi = res.data;

    } else {
      
      res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}&q=${queryParamter}&page=${pageNumber}&pageSize=20`);
      dataGotBackFromApi = res.data;
      
    }
  } catch (err) {
    console.log(err);
  }
  return dataGotBackFromApi;
}




module.exports = router;