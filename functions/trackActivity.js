
const Track = require('../model/Track/Track')


const trackActivity = () => {

    console.log("track Activity")
    const TrackData= Track.find();
}
module.exports = {
    trackActivity
}