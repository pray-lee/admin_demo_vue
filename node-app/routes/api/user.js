const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../../models/User')

router.get('/test', (req, res) => {
    res.json({msg: 'hello users'})
})

// register
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                res.status(400).send({msg: '该邮箱已被注册'})
            } else {
                const newUser = new User({
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email
                })

                // password hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash
                        // save new user
                        newUser.save()
                            .then(user => res.send(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

//login
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({email})
        .then(user => {
            if (!user) {
               res.status(404).json({msg: '用户不存在'})
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatched => {
                        isMatched ?
                            res.json({msg: '登陆成功'}) :
                            res.status(400).json({msg: '密码错误'})
                    })
            }
        })
})

module.exports = router