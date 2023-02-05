let read = $.cookie("read");
$(document).ready(function (){
    if(read=="true"){
        $("#before").hide();
        $("#main").show();
    }
})

function show_after(){
    $("#after").fadeIn("slow");
}
function next(){
        $("#before").fadeOut("slow", function () {
            $("#main").fadeIn("slow");
            $.cookie("read",true,{expires:3});
        })

}
