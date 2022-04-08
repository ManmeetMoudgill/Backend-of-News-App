const express   = require('express');
const router=express.Router();

//importing axios from axios
const axios = require('axios');
const url=require('url');

//dummy data for news
const dummynews=[
   {
     "source": {
       "id": null,
       "name": "heise online"
     },
     "author": "Andreas Knobloch",
     "title": "Freitag: Geplünderte Apple-Produkte, Schlag gegen Malware-Botnet",
     "description": "Russlands Truppenbewegungen getrackt + FBI legt russisches Botnet lahm + Wiederbelebung ausgestorbener Arten +  Photovoltaik-Anlagen für zuhause",
     "url": "https://www.heise.de/news/Freitag-Gepluenderte-Apple-Produkte-Schlag-gegen-Malware-Botnet-6666614.html",
     "urlToImage": "https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/3/4/4/9/6/7/3/Wochentage-source-sans-8b42b356a72a3d90.png",
     "publishedAt": "2022-04-08T04:30:00Z",
     "content": "Zahlreiche Apple-Geräte, die im Ukraine-Krieg bei Plünderungen von russischen Soldaten mitgenommen werden, könnten per \"Wo ist?\"-Funktion getrackt werden und dem ukrainischen Militär wichtige Daten ü… [+2628 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "9to5Mac"
     },
     "author": "Chance Miller",
     "title": "Apple stops signing iOS 15.4 following iOS 15.4.1 release with battery life fixes",
     "description": "Just a week after the release of iOS 15.4.1, Apple has stopped signing iOS 15.4 This means that iPhone users can no longer downgrade from iOS 15.4.1 to iOS 15.4, while it oftentimes also has an impact on users who jailbreak. \n more…\nThe post Apple stops signi…",
     "url": "https://9to5mac.com/2022/04/07/apple-stops-signing-ios-15-4-following-ios-15-4-1-release-with-battery-life-fixes/",
     "urlToImage": "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2022/02/iOS-15.4-9to5mac.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1",
     "publishedAt": "2022-04-08T01:09:07Z",
     "content": "Just a week after the release of iOS 15.4.1, Apple has stopped signing iOS 15.4 This means that iPhone users can no longer downgrade from iOS 15.4.1 to iOS 15.4, while it oftentimes also has an impac… [+1254 chars]"
   },
   {
     "source": {
       "id": "reuters",
       "name": "Reuters"
     },
     "author": null,
     "title": "Breakingviews - Credit Agricole steals an M&A march on UniCredit - Reuters.com",
     "description": "Credit Agricole <a href=\"https://www.reuters.com/companies/CAGR.PA\" target=\"_blank\">(CAGR.PA)</a> boss Philippe Brassac is taking the fast lane on Italy’s M&A highway. The French bank scooped up 9% of No. 3 Italian lender Banco BPM <a href=\"https://www.reuter…",
     "url": "https://www.reuters.com/breakingviews/credit-agricole-steals-an-ma-march-unicredit-2022-04-08/",
     "urlToImage": "https://www.reuters.com/resizer/LtBYqnoueNXjF4qKGsThme-9TFU=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/VMFPHYQ6XVL4PKIQYQFCTBX4G4.jpg",
     "publishedAt": "2022-04-08T08:58:00Z",
     "content": "MILAN, April 8 (Reuters Breakingviews) - Credit Agricole (CAGR.PA) boss Philippe Brassac is taking the fast lane on Italys M&amp;A highway. The French bank scooped up 9% of No. 3 Italian lender Banco… [+1659 chars]"
   },
   {
     "source": {
       "id": "reuters",
       "name": "Reuters"
     },
     "author": null,
     "title": "Toshiba's bids plan deserves cautious optimism - Reuters",
     "description": "Chalk up one for Toshiba’s <a href=\"https://www.reuters.com/companies/6502.T\" target=\"_blank\">(6502.T)</a> activist shareholders: the embattled $17 billion group <a href=\"https://www.global.toshiba/content/dam/toshiba/ww/ir/corporate/news/20220407_1.pdf\" targ…",
     "url": "https://www.reuters.com/breakingviews/toshibas-bids-plan-deserves-cautious-optimism-2022-04-08/",
     "urlToImage": "https://www.reuters.com/resizer/IHNNyNhlyjrKt1gCq5pJXckzpVM=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/G6MDF42HDBP3DLWXV37U2SJVYA.jpg",
     "publishedAt": "2022-04-08T04:52:00Z",
     "content": "HONG KONG, April 8 (Reuters Breakingviews) - Chalk up one for Toshibas (6502.T) activist shareholders: the embattled $17 billion group has launched a fresh strategic review to engage with buyout grou… [+1654 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "heise online"
     },
     "author": "Christoph Dernbach",
     "title": "heise+ | Tim Cooks raffiniertes Bündnis mit China: Apples geheimer Pakt",
     "description": "Mit keinem Land der Welt neben den USA ist Apple enger verbunden. Kritiker sprechen von einem Kniefall vor einem diktatorischen Regime.",
     "url": "https://www.heise.de/hintergrund/Tim-Cooks-raffiniertes-Buendnis-mit-China-Apples-geheimer-Pakt-6657956.html",
     "urlToImage": "https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/3/4/4/4/8/7/5/mi_02_22_se_chinadeal_aufmacher_digital-54ca066bc4665b84.png",
     "publishedAt": "2022-04-08T07:30:00Z",
     "content": "Inhaltsverzeichnis\r\nApple hat derzeit in China einen guten Lauf. Das iPhone verkauft sich im Reich der Mitte so gut wie nie. Und die riesigen Produktionsstätten von chinesischen Apple-Partnern wie Fo… [+2388 chars]"
   },
   {
     "source": {
       "id": "reuters",
       "name": "Reuters"
     },
     "author": null,
     "title": "Taiwan March exports hit new record, Ukraine war clouds outlook - Reuters.com",
     "description": "Taiwan's exports rose for a 21st straight month in March to a new record in line with forecasts, boosted by continued strong tech demand, though the government warned of continued supply chain uncertainty and the effect of the war in Ukraine.",
     "url": "https://www.reuters.com/world/asia-pacific/taiwan-march-exports-hit-new-record-ukraine-war-clouds-outlook-2022-04-08/",
     "urlToImage": "https://www.reuters.com/pf/resources/images/reuters/reuters-default.png?d=82",
     "publishedAt": "2022-04-08T08:55:00Z",
     "content": "TAIPEI, April 8 (Reuters) - Taiwan's exports rose for a 21st straight month in March to a new record in line with forecasts, boosted by continued strong tech demand, though the government warned of c… [+2321 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "BGR"
     },
     "author": "Christian de Looper",
     "title": "Apple Studio Display review",
     "description": "Apple has a tricky history with discrete computer displays — and it’s a little confusing as to why. The screens in its iPads and MacBooks are stunning, offering vibrant colors and in some cases, high-tech Mini LED backlighting. But those buying a separate dis…",
     "url": "http://bgr.com/reviews/apple-studio-display-review/",
     "urlToImage": "https://bgr.com/wp-content/uploads/2022/04/apple-studio-display-1.jpg?quality=82&strip=all",
     "publishedAt": "2022-04-08T04:00:00Z",
     "content": "Apple has a tricky history with discrete computer displays — and it’s a little confusing as to why. The screens in its iPads and MacBooks are stunning, offering vibrant colors and in some cases, high… [+10008 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "The Guardian"
     },
     "author": "Phil Harrison",
     "title": "Anatomy of a Scandal to Roar: the seven best shows to stream this week",
     "description": "Rupert Friend and Sienna Miller play a Tory MP and his long-suffering wife caught in a sexual assault cover-up, and a starry new series of feminist fables. Plus: the return of Catherine Tate and the Kardashians Continue reading...",
     "url": "https://amp.theguardian.com/tv-and-radio/2022/apr/08/anatomy-of-a-scandal-to-roar-the-seven-best-shows-to-stream-this-week",
     "urlToImage": "https://i.guim.co.uk/img/media/a2b5168fd35918e46093f540487b16b1c3035768/0_0_5000_3000/master/5000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=448d64db9928c94213141faa4b616293",
     "publishedAt": "2022-04-08T06:00:15Z",
     "content": "Pick of the week\r\nAnatomy of a Scandal \r\nRupert Friend in Anatomy of a Scandal. Photograph: Netflix\r\nA sexual assault committed by an MP? Followed by an attempted cover-up? This probably sounded like… [+4496 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "Journal du geek"
     },
     "author": "Julie Hay",
     "title": "Après Loki, Tom Hiddleston débarque sur Apple TV+",
     "description": "La star du MCU débarque sur la plateforme SVOD, avec une série adaptée du livre The White Darkness.\nAprès Loki, Tom Hiddleston débarque sur Apple TV+",
     "url": "https://www.journaldugeek.com/2022/04/08/apres-loki-tom-hiddleston-debarque-sur-apple-tv/",
     "urlToImage": "https://www.journaldugeek.com/content/uploads/2021/07/loki-e1640765310412.jpg",
     "publishedAt": "2022-04-08T09:00:36Z",
     "content": "La star du MCU débarque sur la plateforme SVOD, avec une série adaptée du livre The White Darkness.Décidément, Apple TV+ sort le grand jeu pour son catalogue. Après avoir recruté Tom Holland, Taron E… [+2629 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "Applesfera.com"
     },
     "author": "Jesús Quesada",
     "title": "Casi 100 euros, de rebaja en el ambicioso iPhone 13 Pro Max, descuentos en iPad y más ofertas: Cazando Gangas",
     "description": "Otra semana más volvemos con la sección Cazando Gangas, el espacio de Applesfera en el que recopilamos las mejores ofertas de dispositivos Apple: iPhone, iPad, Mac, Apple Watch, AirPods y accesorios compatibles. ¡Empezamos!\n<!-- BREAK 1 -->\n<!--more-->\n\nOfert…",
     "url": "https://www.applesfera.com/general/casi-100-euros-rebaja-ambicioso-iphone-13-pro-max-descuentos-ipad-ofertas-cazando-gangas",
     "urlToImage": "https://i.blogs.es/badcce/cazando-gangas-applesfera/840_560.jpg",
     "publishedAt": "2022-04-08T06:00:53Z",
     "content": "Otra semana más volvemos con la sección Cazando Gangas, el espacio de Applesfera en el que recopilamos las mejores ofertas de dispositivos Apple: iPhone, iPad, Mac, Apple Watch, AirPods y accesorios … [+6907 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "heise online"
     },
     "author": "Ben Schwan",
     "title": "iWork-Update bringt Unterstützung für Kurzbefehle",
     "description": "Auf dem Mac kann nun die Shortcuts-App zur Automatisierung von Pages, Numbers und Keynote verwendet werden. Auch für iOS und iPadOS gibt es eine Aktualisierung.",
     "url": "https://www.heise.de/news/iWork-Update-bringt-Unterstuetzung-fuer-Kurzbefehle-6666730.html",
     "urlToImage": "https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/3/4/4/9/7/4/1/Screen_Shot_2022-04-08_at_08.56.21-7842dca2f40f2de8.png",
     "publishedAt": "2022-04-08T07:29:00Z",
     "content": "Apple hat seiner kostenlosen Bürosuite iWork ein größeres Update verpasst, das auf dem Mac Verbesserungen bei der Automatisierung von Tabellenkalkulation, Präsentationssoftware und Textverarbeitung l… [+1882 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "iMore"
     },
     "author": "Joe Wituschek",
     "title": "Apple has released Safari Technology Preview 143",
     "description": "What you need to know\n\n\nApple has released Safari Technology Preview 143.\nThe latest version of the experimental browser features a number of bug fixes and performance improvements.\nThe update is only for users running macOS Big Sur or macOS Monterey.\n\n\nTest …",
     "url": "https://www.imore.com/apple-has-released-safari-technology-preview-143",
     "urlToImage": "https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2020/08/macos-big-sur-preview-safari-hero.jpg",
     "publishedAt": "2022-04-08T03:55:54Z",
     "content": "The latest version of Safari Technology Preview is here.\r\nToday, Apple released Safari Technology Preview 143. The latest update includes the expected rounds of performance improvements and bug fixes… [+1425 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "iMore"
     },
     "author": "Stephen Warwick",
     "title": "iPhone SE, AirPods orders remain stable, says supply chain",
     "description": "\"...but Taiwan-based Apple supply chain companies have pointed out that they have yet to receive instructions from customers about revising orders...\"\n\nWhat you need to know\n\n\nRecent reports indicated Apple was cutting orders for the supply of some devices.\nN…",
     "url": "https://www.imore.com/iphone-se-airpods-supply-stable-says-supply-chain",
     "urlToImage": "https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2022/03/iphone-se-2022-black-ios-15.jpg",
     "publishedAt": "2022-04-08T10:22:14Z",
     "content": "A new report says that Apple's supply chain is yet to see any requests for revised orders, despite news Apple was slashing production of some of its devices.\r\nA paywalled Digitimes report today state… [+1337 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "The Guardian"
     },
     "author": "Helena Horton Environment reporter",
     "title": "Annual bird count in UK gardens raises hopes for greenfinch",
     "description": "RSPB scientists say small increase in sightings points to first signs of recovery of beleaguered speciesGreenfinch populations, which were previously in steep decline in the UK, are showing the first signs of recovery, according to the latest annual RSPB big …",
     "url": "https://amp.theguardian.com/environment/2022/apr/08/annual-bird-count-uk-gardens-greenfinch",
     "urlToImage": "https://i.guim.co.uk/img/media/44998583806e8379a72bb7f82b42a367791054f7/0_650_5627_3376/master/5627.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=f8f77444f4e3e822ae16b22dd93b737d",
     "publishedAt": "2022-04-08T06:00:16Z",
     "content": "Greenfinch populations, which were previously in steep decline in the UK, are showing the first signs of recovery, according to the latest annual RSPB big garden birdwatch results.\r\nThe citizen scien… [+2805 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "HYPEBEAST"
     },
     "author": "info@hypebeast.com (HYPEBEAST), HYPEBEAST",
     "title": "Unofficial Apple Museum Housing '70s, '80s and '90s Tech to Open in Poland",
     "description": "An unofficial Apple Museum is opening in Poland, offering the most complete collection of some of Apple's greatest hits alongside rarities that many have never seen before.Opening in mid-April, Apple Muzeum Polska's collection includes over 1,600 exhibits in …",
     "url": "https://hypebeast.com/2022/4/apple-muzeum-polska-museum-poland-steve-jobs-tim-cook-iphone-classic-tech-history",
     "urlToImage": "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F04%2Fapple-muzeum-polska-museum-poland-steve-jobs-tim-cook-iphone-classic-tech-history-tw.jpg?w=960&cbr=1&q=90&fit=max",
     "publishedAt": "2022-04-08T10:01:37Z",
     "content": "An unofficial Apple Museum is opening in Poland, offering the most complete collection of some of Apple’s greatest hits alongside rarities that many have never seen before.\r\nOpening in mid-April, App… [+1006 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "HYPEBEAST"
     },
     "author": "info@hypebeast.com (HYPEBEAST), HYPEBEAST",
     "title": "Apple Announces All-Online WWDC 2022 in June",
     "description": "Following in the footsteps of WWDC 2020 and 2021, Apple has now announced that WWDC 2022 will also be an all-online event.Slated to run from June 6 to 10, the conference will \"showcase the latest innovations in iOS, iPadOS, macOS, watchOS, and tvOS, while giv…",
     "url": "https://hypebeast.com/2022/4/apple-wwdc-2022-june-online-event-announcement",
     "urlToImage": "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F04%2Fapple-wwdc-2022-june-online-event-announcement-tw.jpg?w=960&cbr=1&q=90&fit=max",
     "publishedAt": "2022-04-08T04:57:48Z",
     "content": "Following in the footsteps of WWDC 2020 and 2021, Apple has now announced that WWDC 2022 will also be an all-online event.\r\nSlated to run from June 6 to 10, the conference will “showcase the latest i… [+1156 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "iMore"
     },
     "author": "Joe Wituschek",
     "title": "Apple is no longer signing iOS 15.4 for the iPhone",
     "description": "What you need to know\n\n\nApple has stopped signing iOS 15.4 after releasing a newer version of the software.\nUsers are now unable to install iOS 15.4 on their iPhones.\nThe only version of iOS that is now available to be installed is iOS 15.4.1.\n\n\nIt's time to …",
     "url": "https://www.imore.com/apple-no-longer-signing-ios-154-iphone",
     "urlToImage": "https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2022/03/iphone-13-pro-ios-15-hero.jpg",
     "publishedAt": "2022-04-08T04:01:14Z",
     "content": "Apple has stopped signing iOS 15.4, meaning that it is now blocking downgrades to that version of iOS on the iPhone. This means that anyone who wants to install a version of iOS must now install iOS … [+990 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "iMore"
     },
     "author": "Joe Wituschek",
     "title": "How to watch \"Friday Night Baseball\" on Apple TV+",
     "description": "What you need to know\n\n\nThe first games on \"Friday Night Baseball\" are here for Apple TV+.\nThe first game to stream is the New York Mets at the Washington Nationals at 7:00 PM ET. \nThe second game that will stream is the Houston Astros at the Los Angeles Ange…",
     "url": "https://www.imore.com/how-watch-friday-night-baseball-apple-tv",
     "urlToImage": "https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2022/03/apple-tv-plus-mlb.jpg",
     "publishedAt": "2022-04-08T08:00:02Z",
     "content": "Back in March at the company's \"Peek Performance\" event, Apple announced that it was bringing live baseball to Apple TV+ with \"Friday Night Baseball.\" That day is finally here.\r\nThe first games featu… [+2163 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "iMore"
     },
     "author": "Oliver Haslam",
     "title": "Apple TV+ grabs 'The Big Cigar' show about Black Panther boss Huey Newton",
     "description": "What you need to know\n\n\nApple TV+ has bought a new TV series based on Black Panther leader Huey P. Newton.\nNewton was hunted by the FBI and escaped to Cuba with the help of celebrities.\nAndré Holland is in talks to play the lead role.\n\n\nApple TV+ might have a…",
     "url": "https://www.imore.com/apple-tv-will-tell-story-black-panther-leader-huey-newton-big-cigar",
     "urlToImage": "https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2021/08/apple-tv-plus-2021-hero.jpeg",
     "publishedAt": "2022-04-08T09:21:14Z",
     "content": "Source: Bryan M. Wolfe / iMoreApple TV+ has announced that it has picked up a new six-episode TV series that will tell the story of Black Panther leader Huey P. Newton and his escape to Cuba while be… [+1871 chars]"
   },
   {
     "source": {
       "id": null,
       "name": "Applesfera.com"
     },
     "author": "Eduardo Archanco",
     "title": "Netflix es 17 veces más popular que Apple TV+ en EEUU en un estudio mundial de apps de terceros en la App Store",
     "description": "Apple ha resaltado un informe sobre las apps de terceros en la App Store, donde se pone de manifiesto su éxito a nivel regional y global. Se trata de un estudio con el que la compañía quiere defenderse de las acusaciones de monopolio y obstrucción a la innova…",
     "url": "https://www.applesfera.com/app-store-1/netflix-17-veces-popular-que-apple-tv-eeuu-estudio-mundial-apps-terceros-app-store",
     "urlToImage": "https://i.blogs.es/dd0c87/1366_2000-2/840_560.jpeg",
     "publishedAt": "2022-04-08T10:33:40Z",
     "content": "Apple ha resaltado un informe sobre las apps de terceros en la App Store, donde se pone de manifiesto su éxito a nivel regional y global. Se trata de un estudio con el que la compañía quiere defender… [+4074 chars]"
   }
 ];


 //Route 1 ->for fetching all the news from the external api
 router.get('/',(req,res)=>{

  let parsedUrl = url.parse(req.url, true);
  let query=parsedUrl.query;

  
  if(Object.keys(query).length===0){
     //call the external api to get the news data
    var filtereElementts=[];
     dummynews.forEach((el)=>{
       if(el.author!==null){
         var splitDate=el.author.split(/\s+/);
         if(splitDate.length>=2 && splitDate.length<=3){
           filtereElementts.push(el);
         }
       }
  
       });
     res.send(filtereElementts);

  }else{
  res.send(query);

    //filter the data on the basis of the query passed

  }
   


});





module.exports=router;