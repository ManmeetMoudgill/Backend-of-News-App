const express=require('express');
const router=express.Router();
const cors=require('cors');
require('dotenv').config();

const api_key=process.env.NEWS_API_KEY;
//importing axios from axios
const axios=require('axios');

//Route 1 //fetching an single news from the external api
router.get('/:sourcename', async (req, res) => {
    const authorName=req.query.author;
    let news=await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_key}`);
    
    //fetching  only news whose source name is equal to the source name in the url
    let filteredNews=news.data.articles.filter((el)=>{
        
        return el.source.name===req.params.sourcename && el.author===authorName;
    })
    
    if(filteredNews.length>0 && filteredNews.length===1){
    res.send({
        success:true,
        news:filteredNews[0],
        totalResults:filteredNews.length
    });
    }else{
        res.send({
            success:false,
            news:null,
            totalResults:0
        });
    }
    
});
  



module.exports=router;