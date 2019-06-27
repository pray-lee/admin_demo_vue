const express = require('express')
const router = express.Router()
const passport = require('passport')
const Profile = require('../../models/Profile')

// add profile
router.post('/add', passport.authenticate('jwt', {session:false}), (req, res) => {
   const profile = {}
   const requestData = req.body
   for (let i in requestData) {
      if (Object.prototype.hasOwnProperty.call(requestData, i)) {
         profile[i] = requestData[i]
      }
   }

   // save profile to mongoDB and return
   new Profile(profile).save()
       .then(profile => {
           res.json(profile)
       })
})

// get profile collections
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.find()
        .then(profiles => {
            if (!profiles) {
                return res.status(404).json('没有内容')
            }
            res.json(profiles)
        })
        .catch(err => res.json('获取失败'))
})

// get single profile
router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    Profile.findOne({_id: req.params.id})
        .then(profile => {
            if (!profile) {
                return res.status(404).json('没有内容')
            }
            res.json(profile)
        }).catch(err => res.json('获取失败'))
})

// update profile
router.post('/update/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const updateProfile = {}
    const requestData = req.body
    for (let i in requestData) {
        if(Object.prototype.hasOwnProperty.call(requestData, i)) {
            updateProfile[i] = requestData[i]
        }
    }

    // update profile and return
   Profile.findOneAndUpdate({_id: req.params.id}, {$set: updateProfile}, {new: true})
       .then(updateProfile => res.json(updateProfile))
})

// delete profile
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndDelete({_id: req.params.id})
        .then(profile => {
            profile.save()
                .then(() => res.json('删除成功'))
        })
        .catch(err => res.json('删除失败'))
})

module.exports = router