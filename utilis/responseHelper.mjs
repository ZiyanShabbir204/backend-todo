export const responseHelper = (success, message, data=null) => {
  if (success) {
    return {
      success,
      data,
      message
    };
  }
 
    return {
      success,
      data,
      message
    };
  
};
