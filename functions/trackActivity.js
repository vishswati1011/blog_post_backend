
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
        // await addTime(findPage.visitedtime,page[0].visitedtime,async function(getupdatetime){
        //     allpages= allpages.map(
        //         (item)=>
        //             item.pagename===page[0].pagename ?
        //             {...item,visitedtime:"getupdatetime[1]"}
        //              :item
        //         )
        //         console.log(allpages,"allpages after")
        //         // updatealldata= await updatealldata.map(
        //         //     item=>
        //         //         item.UserId===UserId ?
        //         //          {...item,VisitedPages:allpages}
        //         //          :item
        //         //     )

        //         // console.log(updatealldata[0].VisitedPages,"updated data")

        //     //   TrackActivity.updateOne({VisitedDate},{$set:{TrackData:updatealldata}},function(err,updateTrack) {
        //     //     if(err) {
        //     //       console.log(err);
        //     //     }else{
        //     //         if (updateTrack) {
        //     //             callback([true, updateTrack]);
        //     //         } else {
        //     //             callback([false, []]);
                
        //     //         }
        //     //     }
        //     //   })
        // })
    }else{
        const add=page[0]
        oldpage=[...oldpage,add]
        // console.log(oldpage,"allp")
 
        await updatevisitpage(finddata.TrackData,oldpage,UserId,async function (getupdated){
            
            console.log(getupdated[1],"getupdated",VisitedDate)
            // const data= [
            //     {
            //       UserId: "63f49c23c4ed382aaccf4160",
            //       VisitedPages:[{ "pagename": "blog", "visitedtime": {"hours":2,"min":11,"sec":25 } }],
            //       _id: "63f78a006beb1d7c94bf85e6"
            //     },
            //     {
            //       UserId: "63f49c23c4ed382aaccf4150",
            //       VisitedPages:[{ "pagename": "profile", "visitedtime": {"hours":2,"min":11,"sec":25 } },
            //       { "pagename": "blog", "visitedtime": {"hours":2,"min":11,"sec":25 } }],
            //       _id: "63f78a6f7c8b7f10fc5b3f95"
            //     }
            //   ]
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


const updatettrackata = async (finddata,oldpage,UserId,callback) =>{
    //Find index of specific object using findIndex method.    
    objIndex = finddata.findIndex((item => String(item.UserId)===UserId));
    //Log object to Console.
    console.log("Before update: ", finddata[objIndex])
    //Update object's name property.
    finddata[objIndex].VisitedPages =oldpage
    //Log object to console again.
    console.log("After update: ", finddata[objIndex])
    if(finddata){
        callback([true, finddata]);
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