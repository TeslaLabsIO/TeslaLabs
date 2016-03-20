/**
 * Created by mahmoud on 6/17/14.
 */
var APP_Timers={
    TimeOutArr:[],
    AddTimeOut:function(fn,timeout){
        this.TimeOutArr.push(setTimeout(fn,timeout));
        return (this.TimeOutArr.length-1);
    },
    RemoveTimOut:function(id){//id returned from AddTimeOut fn
        if(this.TimeOutArr[id]){
            clearTimeout(this.TimeOutArr[id])
            this.TimeOutArr[id]=null;
        }else{
            alert('Timer not exist')
        }
    },
    RemoveAllTimeOut:function(){
        for(var i=0 ; i<this.TimeOutArr.length ; i++){
            if(this.TimeOutArr[i]){
                clearTimeout(this.TimeOutArr[i])
                this.TimeOutArr[i]=null;
            }
        }
        this.TimeOutArr=[];
    }
}