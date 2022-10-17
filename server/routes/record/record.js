const { Router } = require("express");
const router = Router();
const { Note, Folder } = require('./../../models')
const axios = require('axios')
const multer = require("multer")
const upload = multer();
 

// 내 노트 등록
//http://localhost:8080/record/ 
router.post('/', async (req, res, next) => {
    console.log(req.body);
    let { title, user_id, contents, file_url, memo, favorites  } = req.body
    try {
        // const authData = await User.findOne({email})
        await Note.create({
            user_id,
            title,
            contents,
            file_url,
            memo,
            favorites,

            // author: authData
        })
        res.json({
            status: true,
            message: '노트가 등록 되었습니다.'
        })
    } catch (e) {
        next(e)
    }
})

// 내 노트 조회
router.get('/', async (req, res, next) => {
    console.log('쿼리입니다', req.query);
    
    let { user_id } = req.params

    let page = Number(req.query.page) || 1 

    if (page < 1) {
        next('존재하지 않는 페이지 입니다.')
        return
    }

    let perPage = Number(req.query.perPage) || 10 
    if (perPage > 10) {
        next('한 페이지에 최대 10개의 노트를 볼 수 있습니다.')
        return
    }

    let total = await Note.countDocuments({})
    
    let note = await Note.find({ user_id: user_id })
                            .sort({ createdAt: -1 })
                            .skip(perPage * (page - 1)) 
                            .limit(perPage)
                            // .populate('folder') 

    let totalPage = Math.ceil(total / perPage)

    res.json({ note, totalPage })

})

// 내 노트 수정

// vito 토큰 발급
router.get("/vito/token", async (req, res, next) => {
    let CLIENT_ID = '3br-QGCM26NbrTCjlbQ1';
    let CLIENT_SECRET = 'kt0-bSwLg-R1Rf5G5mY4YzZyqgSHiJyhzK4u4QAQ';

    await axios.post(`https://openapi.vito.ai/v1/authenticate`,
        {client_id: CLIENT_ID, client_secret: CLIENT_SECRET},
        {
            headers: {
            'content-type': 'application/x-www-form-urlencoded'
            }
        }
    )
    .then(data => { 
        let tokenData = data.data
        res.json({tokenData}) 
    })
    .catch(e => next(e))
})

router.post("/vito/getId", upload.fields([{ name: 'file' }, { name: 'config' }, { name: 'token'}]), async (req, res, next) => {
    console.log(req.token)
    try {
        res.json({message: '대기중'})
    } catch(e) {
        console.log(e)
    }
    let TRANSCRIBE_URL = 'https://openapi.vito.ai/v1/transcribe'
        
    
    await axios.post(TRANSCRIBE_URL, {
    headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjU5NjAzNDMsImlhdCI6MTY2NTkzODc0MywianRpIjoibG9RR1Y2NHQ2bkpGZWlpN0liS2UiLCJwbGFuIjoiYmFzaWMiLCJzY29wZSI6InNwZWVjaCIsInN1YiI6IjNici1RR0NNMjZOYnJUQ2psYlExIn0.QT8ibDq0mVup685KhbFxMbxBkyXlJvf_jvLaAV3yl_4`,
        'content-type': 'application/x-www-form-urlencoded'
        }
    }).then(res => console.log(res.data))
})







module.exports = router


