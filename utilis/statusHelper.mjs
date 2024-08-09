export const statusHelper = (type)=>{

    switch (type) {
        case "success": return 200
        case "failure" :  return 500
        case "invalid" : return 400
        case "notfound" :  return 404
        default : return 400

    }

}