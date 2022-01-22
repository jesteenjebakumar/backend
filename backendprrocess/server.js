let express= require('express')
const req = require('express/lib/request')
const { sendfile } = require('express/lib/response')
const res = require('express/lib/response')
let mongodb=require('mongodb')
let sanitizer=require('./node_modules/cheerio-html-to-text');


let db=null
let app=express()
app.use(express.static( __dirname+'/public'))

const mongoclient= mongodb.mongoclient;

let dbstring='mongodb+srv://Appuser:jose@cluster0.dxsiy.mongodb.net/card?retryWrites=true&w=majority'
let dbname='card'

mongodb.connect(dbstring,{useNewUrlParser:true,useUnifiedTopology: true},function(err,client){
    if(err){
        throw err;
    }
 db=client.db(dbname)
 app.listen(3000,()=>{
   console.log('listening.......');
 })
})

const { listenerCount, title } = require('process')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
function passprocted(req,res,next){// procetect 
  res.set('WWW-Authenticate', 'Basic realm="simple App"')
  if(req.headers.authorization == 'Basic aWQ6am9zZQ=='/*encode the value*/){
    next()
  }else{
    res.status(401).send("please prove id password")
  }
  }
app.use(passprocted)

 app.get('/',function(req, res){// getting the data from the database
     db.collection('items').find().toArray(function(err,items){
      //   console.log(items); 
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Home </title>
            <link rel="stylesheet" href="./assects/css/normalize.css">
            <link rel="stylesheet" href="./assects/css/bootstrap.min.css">
          
            <!-- CSS only -->
            
            <link rel="stylesheet" href="./style.css">
        </head>
        <style>
        body{
            /*
            
            background-image: linear-gradient(90deg, rgba(102, 120, 202, 0.685), rgb(255, 126, 238));
            */
            background-color: rgb(22, 22, 22);
            padding: 0%;
            margin: 0%;
            width: auto;
            height: auto;
        }
        .load{
            position:relative;
            left: -5px;
        }
        button{
            align-items: center;
            position: relative;
            left: 123px;
            border: hidden;
            color: rgb(255, 251, 0);
        background-color: rgb(0, 248, 132);
        transition: 0.8s;
        border-radius: 6px;
        outline-style: hidden;
        
        
        }
        button:hover{
        color: rgb(212, 0, 255);
        transition: 0.8s;
        background-color: rgb(4, 247, 97);
        border-radius: 23px;
        outline-style: hidden;
        }
        button:active{
            outline-style: hidden;
        }
        .two{
            position: absolute;
            left: 123px;
        }
        #small{
           
            overflow: hidden;
           
        }
        #img{
            width: 62px;
            height: 62px;
            border-radius: 30px;
        }
        .cover{
        /*border: red 2px solid;*/
        display: flex;
        shape-rendering: auto;
        gap: 32px;
        min-height: 1430px;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        margin-left: 15px;
        }
        .cards{
           
            color: white;
          background-color: rgba(209, 187, 187, 0.425);
          width: fit-content;
          height:400px;
           overflow: hidden;
          border-radius: 12px;
          transition: 0.5s;
         /* -webkit-box-reflect: below 1px linear-gradient(transparent,rgba(255, 0, 0, 0.3));*/
          z-index: 10;
          -webkit-box-pack: justify;
        }
        input:active{
            background-color: bisque;
        }
        .cards:hover{
           box-shadow: 8px 8px 22px rgb(11, 99, 214),-8px -7px 22px rgb(11, 99, 214)
           ,inset 5px 5px 12px orange; 
            transition: 0.5s;
          
           transition-property: all;
        }
        
        .adjust{
            width: 366px;
        }
        .imgin{
          
           position: relative;
           height: 156px;
          width: 390px;
           
        }
        .protect{
            width: 500px;
            height: 300px;
            border: 2px solid tomato;
            overflow-y: scroll;
            background-color: tomato;
        }
        
        textarea{
            background-color: tomato;
            border-bottom: 12px;
        }
        input{
            outline-style: hidden;
            border: darkviolet;
        }
        @media (max-width:499px) {
            .protect{
                width: 300px;
                height: 300px;
                border: 2px solid springgreen;
                overflow: scroll;
            }
        }
        .conent{
           background-color: rgb(32, 127, 236);
          position: relative;
          bottom: 5px;
           width: 390px;
           height: 269px;
        }
        .link{
            font-size: large;
            color: rgb(17, 0, 255);
           text-decoration: none;
           
           transition: 0.5s;
           
        }
        
        
        .link:hover{
            color: rgb(255, 0, 98);
            transition: 0.5s;
            text-decoration: none;
        }
        .link::before{
            content: "";
            position: absolute;
            left: 0;
           width: 0;
            height: 1.2em;
            background-color:var(--change ,rgb(109, 101, 101));
            transition: 1.8s;
            top: 3;
            bottom: 158px;
            height: 2px;
          
            filter: blur(1px);
        }
        .link:hover::before{
            content: "";
            position: absolute;
            left: 0;
           width: 10%;
            height: 1.2em;
            background-color:var(--change ,rgb(44, 19, 19));
            transition: 1.8s;
            top: 13;
            bottom: 158px;
            height: 2px;
           
            filter: blur(2px);
        }
        
        </style>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        
                <img src="photo.svg" width="30" height="30" class="d-inline-block align-top navbar-brand" alt="" loading="lazy">
                <p  class="navbar-brand  text-center fix">cardinfo</p>
                <button class="navbar-toggler load" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon "></span>
                </button>
              
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav ml-auto pas"><!--mr right ml left -->
                    <li class="nav-item active">
                      <a class="nav-link" href="/">Home </a>
                    </li>
                    <li class="nav-item">
                        <a href="/obout-go" class="nav-link" >obout</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="#">register</a>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        help
                      </a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">facebook</a>
                        <a class="dropdown-item" href="#">instagram</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">github</a>
                      </div>
                    </li>
                   
          </div>
            
            
          </nav>
          
        
          
          <script src="./assects/js/jquery.min.js"></script>
          <script src="./assects/js/bootstrap.min.js"></script>
        </div>
      
        <form action="/create-data"  method="POST">
         <div class="input container">
             <br><br>
             <label for="inp" class="display-4 lead " >  <label for="" class="h1" >title:</label> <input type="text" name="title" class="input-group-text" name="inp" id="title" required></label>
             <br>
           <label for="inp2" class="display-4 lead "><label for="mail" class="move">mail link:</label><input type="text" name='mail' class="mail input-group-text" name="inp2" id="link" required></label>
             <br>
             <label for="inp3" class="protect lead display-4">paragraph::<textarea type="text" class="container big"  name='para'  id="para" cols="34" rows="20" role="input" required></textarea></label>
             
              <br>    <button type="submit" class="para lead " id="output" value="">submit</button>
         </div>
         </form>
         <br>
        
         <hr style="background-color: rgb(0, 255, 115); width: auto;">
        <style>
          textarea{
          font-size: 50px;
          }
        @media (max-width:406px) {
          .conent{
            width: auto;
          }
          .adjust{
            width: auto;
          }
        }
          @media (max-width:360px) {
              .cover{
                margin:auto;
              }
              img{
                width: auto;
              }
              p{
                width: auto;
              }
              textarea{
                font-size: 28px;
              }
          }
          @media (max-width:496px) {
            .mail{
              position: relative;
              margin-left: 58px;
            }
        
          .move{
            position: relative;
            left: -55px;
            flex-basis: content;
          }
        
          }
          #link{
            position: relative;
            left: -39px;
            
          }
          .move{
            position: relative;
            left: -55px;
            flex-basis: content;
          }
          .input{
            color: rgb(24, 24, 0);
             display: flex;
             flex-direction: column;
             overflow: visible;
            align-items: center;
            align-content: center;
            align-self: center;
            
           
          }
          input{
            flex-wrap: wrap;
            text-align: center;
            width: 300px;
            
          }
            #output{
                width: 170px;
                height: 50px;
            }
            .input{
                color: rgb(255, 0, 128);
                font-weight: 500;
                text-shadow: pink 5px 5px 9px ;
                
              /*  border: 2px solid orange;*/
                align-items: center;
                align-self: center;
                justify-content: center;
                text-align: center;
            }
            .title{
                position: relative;
                left: 15px;
        
            }
            .para{
                position: relative;
                left: -4.9px;
            }
        </style>
        <div class="cover" id="cover">
            <div class="cards">
                <img src="https://media.istockphoto.com/photos/house-sparrow-standing-on-fence-stock-phot-picture-id1351436607?b=1&k=20&m=1351436607&s=170667a&w=0&h=Mv4h8iJrzUVv78rINpuc8ZvMjrOVcoWu_tNSfNcd9es=" alt="sample photo" class="imgin">
                <div class="conent">
                    <a href="/">
        
                    <button>sample card</button>
                    </a>
                    <h3>welcome to our blog</h3>
                       <a href="mailto:joseharywillam230@gmail.com" class="link">mail</a>
                       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis 
                           deserunt enim distinctio! Aspernatur, officiis omnis! Natus velit soluta unde quae, aliquam corporis qui vel atque.
                            Quidem suscipit deleniti quis qui!</p>
                </div> 
        </div>
        <div class="cards">
            <img src="https://media.istockphoto.com/photos/house-sparrow-standing-on-fence-stock-phot-picture-id1351436607?b=1&k=20&m=1351436607&s=170667a&w=0&h=Mv4h8iJrzUVv78rINpuc8ZvMjrOVcoWu_tNSfNcd9es=" alt="sample photo" class="imgin">
            <div class="conent">
                <a href="/">
        
                    <button>sample card</button>
                </a>
                <h3>welcome to our blog</h3>
                   <a href="mailto:joseharywillam230@gmail.com" class="link">mail</a>
                   <p class="adjust">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis 
                       deserunt enim distinctio! Aspernatur, officiis omnis! Natus velit soluta unde quae, aliquam corporis qui vel atque.
                        Quidem suscipit deleniti quis qui!</p>
            </div>

        </div>
        
          
       
       
            ${items.map(function(item){
             return ` <div class="cards">
             <img src="https://media.istockphoto.com/photos/house-sparrow-standing-on-fence-stock-phot-picture-id1351436607?b=1&k=20&m=1351436607&s=170667a&w=0&h=Mv4h8iJrzUVv78rINpuc8ZvMjrOVcoWu_tNSfNcd9es=" alt="sample photo" class="imgin">
             <div class="conent">
                     <button  data-id=${item._id}  class='delete-me'> delete the item</button>
                 <h3>${item.title}</h3>
                    <a href="mailto:joseharywillam230@gmail.com" class="link">${item.mail}</a>
                    <p class="adjust">${item.para}</p>
             </div>
             </div>`
            }).join('')
 }
 
 </div>
        
 </div>
 
     </div>
     
 </body>
 <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>



 
 <!-- JavaScript Bundle with Popper -->
 
 <script src="./public/assects/js/jquery.min.js"></script>
  
 <script src='browser.js'></script>
 </html>
 `)
})
 })
        
// createing the data

app.post('/create-data',function(req,res){
  const title=sanitizer.convert(req.body.title)    
  const mail=sanitizer.convert(req.body.mail)  
  const para=sanitizer.convert(req.body.para)  
  var data={'title':title,'mail':mail,'para':para};
  if(data.title==0&&data.mail==0&&data.para==0){
    alert('please enter the input field')
  }
  
  

  else{
   
    
    //console.log(data);      
    db.collection('items').insertOne(data,function(){
      res.redirect('/')

      // redirect to root page
  })
  }
  
 
  })
  //delete the data
app.post('/delete-data',function(req,res){
  db.collection('items').deleteOne({_id:new mongodb.ObjectId(req.body.id)},function(){
    res.send('data deleted')
  })
})
app.get('/obout-go',(req,res)=>{
  res.sendFile(__dirname + '/public/obout.html')
})