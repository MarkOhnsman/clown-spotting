let DataStore = require('nedb')
let db = new DataStore({
  filename: './data/sightings.db',
  autoload: true
})


function Sighting(clownId, location, spotter, time){
  this.clownId = clownId;
  this.location = location;
  this.spotter = spotter;
  this.time = time;
};

function findSighting(id, cb){
  db.findOne({_id: id}, cb);
};

function addSighting(sighting, cb){
  let newSighting = new Sighting(sighting.clownId, sighting.location, sighting.spotter, sighting.time)
  db.insert(newSighting, function(err, newSighting){
    if(err){
      return cb(err);
    }
      return cb(null, {message:"You're Lucky to be alive..."})
  })
};

function getSightings(cb){
  db.find({}, cb)
};

function deleteSighting(id, cb){
  db.update({_id: id}, {$set: {invalid: true}}, {}, cb)
};

function editSighting(id, newSighting, cb){

  db.update({_id: id}, {$set: {
    clownId: newSighting.clownId,
    location: newSighting.location,
    spotter: newSighting.spotter,
    time: newSighting.time,
  }
 }, {}, cb)
}


module.exports = {
  addSighting,
  getSightings,
  deleteSighting,
  editSighting, 
  getSighting:findSighting
};