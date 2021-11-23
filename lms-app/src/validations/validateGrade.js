export function validateGrade(grade,maxGrade){
    let error;
    if(grade>maxGrade){
        error=`Grade can't be higher than ${maxGrade.toFixed(2)}!`
    }
    return error
  }
  