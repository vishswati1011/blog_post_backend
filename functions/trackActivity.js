
const TrackActivity = require('../model/Track/TrackActivity')
const moment =require('moment');

const addTime =(lasttime,currenttime,callback)=>{
    console.log("lasttime",lasttime)
    const sec0=lasttime.sec, min0=lasttime.min , hours0=lasttime.hours;
    const {hours,min,sec}=currenttime;
    console.log(hours0,min0,sec0,"hour",hours,min,sec) //3:40:55
    let updatemin=0,updatehourse=0
    let updatesec=sec0+sec
    if(updatesec>60){
        updatesec-=60,updatemin++
    }
    updatemin+=min0+min
    if(updatemin>60)
    {
        updatemin-=60,updatehourse++;
    }
    updatehourse+=hours0+hours
    const toupdatetime = {
        hours:updatehourse,
        min:updatemin,
        sec:updatesec
    }
    console.log(toupdatetime)
    if (toupdatetime) {
        callback([true, toupdatetime]);
    } else {
        callback([false, []]);

    }
}
const trackActivity = async(data,callback) => {

    const  {VisitedDate,UserId,VisitedPages} = data;
    const trackData= await TrackActivity.findOne({VisitedDate:VisitedDate});
    // const array=JSON.parse(JSON.stringify(VisitedPages))
    console.log("VisitedDate",VisitedPages[0].pagename)
    
    if(trackData){
      
        let VisitPages=trackData.VisitedPages
        console.log("visitedPAges",VisitPages)
        const pageToUpdate = VisitPages.find(item=> 
            item.pagename===VisitedPages[0].pagename
        )
        console.log(pageToUpdate,"pagetoupdate")
        await addTime(pageToUpdate.visitedtime,VisitedPages[0].visitedtime,async function(getupdatetime){

            console.log("getupdatetime",getupdatetime)
            VisitPages= await VisitPages.map(
                item=>
                    item.pagename===VisitPages[0].pagename ?
                     {...item,visitedtime:getupdatetime[1]}
                     :item
                )
                console.log(VisitPages,"updated data")
              TrackActivity.updateOne({VisitedDate},{$set:{VisitedPages:VisitPages}},function(err,updateTrack) {
                if(err) {
                  console.log(err);
                }else{
                    if (updateTrack) {
                        callback([true, updateTrack]);
                    } else {
                        callback([false, []]);
                
                    }
                }
              })
        })
    
    }else{
        const trackActivityData=new TrackActivity(data);
        const result=await trackActivityData.save();
        console.log("result",result)
    }

}
module.exports = {
    trackActivity
}