function changeToSel(){
    $("#changeNumModal").modal("show");
}
function setLast(){
    sl = $("#changeNumSelector option:selected").val();
    $("#changeNumModal").modal("hide");
    lastCard = new BasicCards(lastCard.getcolor(),parseInt(sl));
}

function othersCrushDownNow(){
    playerOneCrushed++;
    playerTwoCrushed++;
    playerThreeCrushed++;
}