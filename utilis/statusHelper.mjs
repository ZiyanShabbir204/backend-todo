export const statusHelper = (type)=>{
     // 1 for success
    // 2 for internal server error
    // 3 for invalid
    // 4 for not found error

    if(type == 1){
        return 200
    }
    else if(type == 2){
        return 500
    }
    else if (type == 3){
        return 400
    }
    else if(type == 4){
        return 404
    }
    else if(type == 5){
        return 401
    }
    else {
        return 200
    }

   
    
  

}