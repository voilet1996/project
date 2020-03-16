

console.log(123);



var   drag=document.getElementsByClassName("bar")[0],
      scroll=document.getElementsByClassName("duration")[0],
      container=document.getElementsByClassName("container")[0],
      content=document.getElementsByClassName("content")[0];
var   dragHeight=Math.floor((container.offsetHeight/content.offsetHeight)*scroll.offsetHeight);
var   scrollBlank=scroll.offsetHeight-drag.offsetHeight;
var   contentTop=content.offsetHeight-container.offsetHeight;
      drag.style.height=dragHeight+"px";
    


init();
function init(){
    dragScrollBar(drag,scroll);//滚动条拖拽
  

    btnScroll(drag,scroll);     //按钮控制
    wheelScroll(drag,container,scroll)   //鼠标控制滚动条移动
}
 

function dragScrollBar(item,duration){
    item.onmousedown=function(e){
        e=e||window.event;
        var TopY=e.pageY;
        document.onmousemove=function(e){
             var chaY=e.pageY-TopY;
             if(chaY>0){//往下拖拽
                 item.style.top=chaY+item.offsetTop+"px";
              if((item.offsetTop+chaY+item.offsetHeight)>=duration.offsetHeight){
                  item.style.top=(duration.offsetHeight-item.offsetHeight)+"px";
              }

             }else{
                item.style.top=chaY+item.offsetTop+"px";
                 if((item.offsetTop+chaY)<=0){
                   item.style.top=0+"px";
                 }


             }
             TopY=e.pageY;
             goScroll(item)
        }
        item.onmouseup=function(e){
            document.onmousemove=null;
        }
    }
}



function goScroll(item){
    var percentH=Math.floor((item.offsetTop/(scroll.offsetHeight-drag.offsetHeight))*contentTop);//滚动条上面的空白处占下面空白处的比例和overflow框上面和下面成正比。
    content.style.top=-percentH+"px";
}



function btnScroll(item,duration){
   var box= document.getElementsByTagName("ul")[0];
   box.addEventListener('click',function(e){
       console.log(e.target.className)
      if(e.target.className=='up'){//bar 上
        item.style.top=-10+item.offsetTop+'px';
           if(item.offsetTop<=0){
               item.style.top=0+'px';
           }



      }else if(e.target.className=='down'){
        item.style.top=10+item.offsetTop+'px';
        if((item.offsetTop+item.offsetHeight)>duration.offsetHeight){
            item.style.top=scroll.offsetHeight-drag.offsetHeight +'px';
        }
      }
      goScroll(item)
   },false)
   
}


function wheelScroll(item,box,duration){
    box.addEventListener('mousewheel',goWheel);
    function goWheel(e){
       if(e.wheelDelta==120){
        item.style.top=-10+item.offsetTop+'px';
        if(item.offsetTop<=0){
            item.style.top=0+'px';
        }
       }else{
        item.style.top=10+item.offsetTop+'px';
        if((item.offsetTop+item.offsetHeight)>duration.offsetHeight){
            item.style.top=scroll.offsetHeight-drag.offsetHeight +'px';
        }
        
       }
       goScroll(item)
    }
}