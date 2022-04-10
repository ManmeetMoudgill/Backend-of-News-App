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

    //if the user wants to order the news by title
    if (isOrderByTitleChecked === true) {
      let OrderArrayData = news;
      OrderArrayData.articles.sort((a, b) => a.title.split(/\s+/)[0].replace(/[^a-zA-Z ]/g, "").localeCompare(b.title.split(/\s+/)[0].replace(/[^a-zA-Z ]/g, "")));
      
     //callling the function which will send the result to the client
     sendResponse(res, OrderArrayData.articles, OrderArrayData.totalResults);

    } else {
      
      //filter the new on the basis of the query parameter
      if (req.query.q!==undefined) {
        
        const newsData = await getNews(req.query.page, req.query.q);
        
        //calling the function which will filter the news on the basis of the author name
        result = filterNewsOnBasisOfAuthorName(newsData);
        
        //callling the function which will send the result to the client
        sendResponse(res, result, newsData.totalResults);

      } else {

        //calling the function which will filter the news on the basis of the author name
        filteredElements = filterNewsOnBasisOfAuthorName(news);

        //callling the function which will send the result to the client
        sendResponse(res, filteredElements, news.totalResults);
      }
    }

  } catch (err) {
    res.send({
      success:false,
      error: err
    })
  }

});


//Route 2-->fetch the top headlines from the external api
router.get('/topHeadlines', async (req, res) => {
  console.log("INSIDE THE TOP HEADLINES");
  try{

   let topHeadlines=await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}`);
   res.send({
     news:topHeadlines.data.articles,
     totalResults:topHeadlines.data.totalResults
   });

  }catch(err){
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
      
      res = await axios.get(`https://newsapi.org/v2/everything?&q=${queryParamter}&apiKey=${api_key}&page=${pageNumber}&pageSize=20`);
      dataGotBackFromApi = res.data;
      
    }
  } catch (err) {
    console.log(err);
  }
  return dataGotBackFromApi;
}



//check whether the author name string contains only two or three words
const filterNewsOnBasisOfAuthorName = (news) => {
  let filteredElements = [];
  news.articles.forEach((el) => {
    
    if (el.author !== null) {
      let authorSplittedArray = el.author.split(/\s+/);
      if (authorSplittedArray.length >= 2 && authorSplittedArray.length <= 3) {
        filteredElements.push(el);
      }
    }
  });
  return filteredElements;
}

//function that recievers the news and totalresult and send the response to the client
const sendResponse = (res,news,totalArticles) => {
  res.send({
    news: news,
    totalArticles:totalArticles,
  });
}


module.exports = router;