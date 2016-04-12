/**
 * Created by xjweng on 2016/4/12 0012.
 */
var num = new Array();

//删除左右两端的空格
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function addNum(btn_type) {
    var num_in = trim(document.getElementById("num_in").value);
    console.log("addNum() action");
    //console.log(num_in);
    if(btn_type === "left_in"){
        if(num_in === "" || parseInt(num_in) != num_in){
            alert("error input");
            return;
        }else{
            num.unshift(num_in);
        }
    }else if(btn_type === "right_in"){
        if(num_in === "" || parseInt(num_in) != num_in){
            alert("error input");
            return;
        }else{
            num.push(num_in);
        }

    }else {
        return;
    }
}

function addHandle(btn_type) {
    addNum(btn_type);
    renderQue();
    document.getElementById("num_in").value = "";
}
function delHandle(btn_type) {
    if(btn_type === "left_out"){
            num.shift();
    }else if(btn_type === "right_out"){
        num.pop();
    }else {
        //任点一个传下标到btn_type
        num.splice(btn_type,1);
    }
    renderQue();
}
function renderQue() {
    //先擦除记录
    var que = document.getElementById("queue");
    var childs = que.childNodes;
    for (var j = childs.length - 1; j >= 0; j--){
        que.removeChild(childs.item(j));
    }
    //正常叠加
    for(var i in num){
        var nspan = document.createElement("span");
        nspan.innerHTML = num[i];
        que.appendChild(nspan);
    }

}
function init() {
    //添加进入绑定事件
    document.getElementById("_in").addEventListener("click",function(event){
        console.log(event.target.id);
        addHandle.call(null,event.target.id);
        console.log(num);
    });

    //左右出
    document.getElementById("_out").addEventListener("click",function(event){
        console.log(event.target.id);
        delHandle.call(null,event.target.id);
        console.log(num);
    });

    //点击出
    document.getElementById("queue").addEventListener("click",function(event){
        event.target.id = "sel_del";
        var que = document.getElementById("queue").getElementsByTagName("span");
        for(var v = 0; v < que.length; v++){
            if(que[v].id === "sel_del"){
                delHandle.call(null,v);
            }
        }
        console.log(num);
    });
}

init();