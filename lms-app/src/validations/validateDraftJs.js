export function validateDraftJs(blocks){
    var isValid=false;
    if(blocks){
        isValid = blocks.some(block=>block.text!=undefined && block.text!="" && block.text!=null)
    }
    return isValid;
}
