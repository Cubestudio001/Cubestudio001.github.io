var selected;
        if($.cookie("day")!=null&&$.cookie("day")!="null"){
            selected = new Date($.cookie("day"));
        }
        else{
            alert("您还没有设置您的生日！请点击下方按钮设置");
            $("#cookiealert").hide();
        }
        today = new Date();
        var leapyear=0;
        if(selected.getMonth<=2){
            for(i = selected.getFullYear();i<today.getFullYear();i++){
                if(i%4==0&&i%400!=0){
                    leapyear++;
                }
                else if(i%100==0&&i%400!=0){
                    leapyear++;
                }
            }
        }
        else{
            for(i = selected.getFullYear()+1;i<today.getFullYear();i++){
                if(i%4==0&&i%400!=0){
                    leapyear++;
                }
                else if(i%100==0&&i%400!=0){
                    leapyear++;
                }
            }
        }
        selected.setDate(selected.getDate()+leapyear);
        $(document).ready(function(){
            update();
            setInterval(update,3000);
        })

        function update(){
            var today=new Date();
            var val=(today-selected)/1000/60/60/24/365;
            $("#main").fadeTo("fast",0,function(){
                $("#main").text(val);
                $("#main").fadeTo("fast",1);
            });
        }