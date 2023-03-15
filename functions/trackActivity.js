
const TrackActivity = require('../model/Track/TrackActivity')
const moment =require('moment');

const addTime =(lasttime,currenttime,callback)=>{
    const sec0=lasttime.sec, min0=lasttime.min , hours0=lasttime.hours;
    const {hours,min,sec}=currenttime;
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
    // console.log(toupdatetime)
    if (toupdatetime) {
        callback([true, toupdatetime]);
    } else {
        callback([false, []]);

    }
}

const updatePage =async(finddata,findUser,TrackData,VisitedDate,callback) =>{
    let allpages=findUser.VisitedPages
    console.log("Date",TrackData)
    let {UserId}=TrackData;
    let page=TrackData.VisitedPages
    let oldpage=findUser.VisitedPages

    const findPage = oldpage.find(item=> 
        item.pagename===page[0].pagename
    )
    if(findPage){
        await addTime(findPage.visitedtime,page[0].visitedtime,async function(getupdatetime){
           if(getupdatetime[0]){

            await updateTimeInPage(allpages,page[0].pagename,getupdatetime[1],async function(getData){
                console.log(getData,"getData")

                if(getData[0]){
                await updatevisitpage(finddata.TrackData,getData[1],UserId,async function (getupdated){
            
                    // console.log(getupdated[1],"getupdated",VisitedDate)
                    TrackActivity.updateMany({VisitedDate},{$set:{'TrackData':getupdated[1]}},function(err,updateTrack) {
                        console.log(updateTrack)
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
            }
            }) 
        }     
       
        })
    }else{
        // adg new page
        const add=page[0]
        oldpage=[...oldpage,add]
        await updatevisitpage(finddata.TrackData,oldpage,UserId,async function (getupdated){
            
            // console.log(getupdated[1],"getupdated",VisitedDate)
            TrackActivity.updateMany({VisitedDate},{$set:{'TrackData':getupdated[1]}},function(err,updateTrack) {
                console.log(updateTrack)
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
    }
}


const updatevisitpage = async (finddata,oldpage,UserId,callback) =>{
    // console.log("update now",finddata)
        //Find index of specific object using findIndex method.    
        objIndex = finddata.findIndex((item => String(item.UserId)===UserId));
        //Log object to Console.
        // console.log("Before update: ", finddata[objIndex])
        //Update object's name property.
        finddata[objIndex].VisitedPages =oldpage
        //Log object to console again.
        // console.log("After update: ", finddata[objIndex])
        // console.log("After update: ", finddata)
        if(finddata){
            callback([true, finddata]);
        } else {
            callback([false, []]);
        } 
}


const updateTimeInPage = async (allpages,pagename,updatetime,callback) =>{
    //Find index of specific object using findIndex method.
    console.log("all",allpages)    
    objIndex = allpages.findIndex((item => item.pagename===pagename));
    //Log object to Console.
    console.log("Before update: ", objIndex,allpages[objIndex].visitedtime,updatetime)
    //Update object's name property.
    allpages[objIndex].visitedtime =updatetime
    //Log object to console again.
    console.log("After update: ", allpages)
    if(allpages){
        callback([true, allpages]);
    } else {
        callback([false, []]);
    } 
}


const trackActivity = async(data,callback) => {

    const  {VisitedDate,TrackData} = data;
    // find date 
    const finddata= await TrackActivity.findOne({VisitedDate:VisitedDate});
 
    if(finddata){
      
        const updatedata =finddata.TrackData;
        // find user after date matiching
        const findUser = updatedata.find(item=> 
            String(item.UserId)===TrackData.UserId
        )
        if(findUser){

             await updatePage(finddata,findUser,TrackData,VisitedDate,async function(getupdatetime){
                if (getupdatetime) {
                    callback([true, getupdatetime]);
                } else {
                    callback([false, []]);
            
                }
            })
        }else{
            // add new user on same date
            console.log(updatedata)
            const addnewUser =[...updatedata,TrackData]
            // console.log("add new user",addnewUser)
            TrackActivity.updateOne({VisitedDate},{$set:{TrackData:addnewUser}},function(err,updateTrack) {
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

        } 
    }else{
        // add new data
        const trackActivityData=new TrackActivity(data);
        try{
        const result=await trackActivityData.save();
        console.log("result",result)
        if (result) {
            callback([true, result]);
        }
        }catch(error){
           
                callback([false, "can not add"]);
          
        }
    }

}
module.exports = {
    trackActivity
}