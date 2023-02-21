
const TrackActivity = require('../model/Track/TrackActivity')


const trackActivity = (data) => {

    console.log("track Activity")
    const  {VisitedDate,UserId,VisitedPages} = data;
    const TrackData= TrackActivity.find({VisitedDate:VisitedDate});
    if(TrackData.length>0){
        console.log(TrackData);
    }else{
        const trackActivityData=new TrackActivity(data);
        const result=trackActivityData.save();
        console.log("result",result)
    }

}
module.exports = {
    trackActivity
}