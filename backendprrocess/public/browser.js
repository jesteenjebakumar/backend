document.addEventListener("click",function(e){

     
  
 
     //delete
     if(e.target.classList.contains("delete-me")){
     //, e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
       confirm("do you really want to delete?") 
      axios.post('/delete-data',{ id:e.target.getAttribute("data-id")}).then(function(){
           
           e.target.parentElement.parentElement.remove()
         
      }).catch(function(){
           console.log("error, try again")
      })
   }
 
 })
