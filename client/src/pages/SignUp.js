import { useState } from 'react';
import { Box, Grid, Button, TextField, Typography, Link} from '@mui/material'
import logo from './../assets/images/BADA_logo_full.png';

import server from './../config/server.json'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

let SignUp = () => {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
      user_id: '',
      password: '',
      rePassword: '',
      name: '',
      profile_nick: ''
    })

    const [error, setError] = useState({
      user_id: false,
      password: false,
      rePassword: false,
      name: false,
      profile_nick: false,
      userIdMsg: '이메일을 입력하세요.',
      passwordMsg: '비밀번호를 입력하세요.',
      rePasswordMsg: '비밀번호를 한번 더 입력하세요.',
      nameMsg: '이름을 입력하세요.',
      profileNickMsg: '닉네임을 입력하세요.'
    })

    // 이메일 형식 체크
    let userIdValidationChk = (userId) => { 
      const emailRegex =
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

      return emailRegex.test(userId);
    }

    // 회원가입 버튼 클릭
    let clickSignUpBtn = async () => {
      let userIdErrFlg = false
      let passwordErrFlg = false
      let rePasswordErrFlg = false
      let nameErrFlg = false
      let frofileNickErrFlg = false
      let userIdErrMsg = '이메일을 입력하세요.'
      let passwordErrMsg = '비밀번호를 입력하세요.'
      let rePasswordErrMsg = '비밀번호를 한번 더 입력하세요.'
      // 유효성 체크
      if(userData.user_id === "") {
        userIdErrFlg = true
        userIdErrMsg = "이메일을 입력하세요."
      } 

      if(userData.user_id !== "" && !userIdValidationChk(userData.user_id)) {
        userIdErrFlg = true
        userIdErrMsg = "올바른 이메일 형식을 입력하세요."
      }

      if(userData.password === "") {
        passwordErrFlg = true
        passwordErrMsg = '비밀번호를 입력하세요.'
      }

      if(userData.rePassword === "") {
        rePasswordErrFlg = true
        rePasswordErrMsg = '비밀번호를 한번 더 입력하세요.'
      }

      if(userData.password !== "" && userData.password !== userData.rePassword) {
        passwordErrFlg = true
        rePasswordErrFlg = true
        passwordErrMsg = ''
        rePasswordErrMsg = '비밀번호와 비밀번호 확인이 같지 않습니다.'
      }
      
      if(userData.name === "") {
        nameErrFlg = true
      }

      if(userData.profile_nick === "") {
        frofileNickErrFlg = true
      }

      setError({
        ...error,
        user_id: userIdErrFlg,
        password: passwordErrFlg,
        rePassword: rePasswordErrFlg,
        name: nameErrFlg,
        profile_nick: frofileNickErrFlg,
        userIdMsg: userIdErrMsg,
        passwordMsg: passwordErrMsg,
        rePasswordMsg: rePasswordErrMsg
      })

      // 회원가입
      if(!userIdErrFlg && !passwordErrFlg && !rePasswordErrFlg && !nameErrFlg && !frofileNickErrFlg) {
        await axios.post('http://localhost:8080/user/signUp', userData)
        .then(res => {
          console.log(res)
          if(res.data.status) {
            alert(res.data.status)
            navigate('/login')
          } else{
            alert(res.data.message)
          }
        })
        .catch(e => {
          console.log(e)
        })
      }
    }

    let changeUserData = (e) => {
      setUserData({
          ...userData,
          [e.target.name] : e.target.value
      })
    }

    return (
        <Box sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            maxWidth: '380px',
            minWidth: '310px',
            transform: 'translate(-50%, -50%)'
          }}>
              <Box sx={{ textAlign: 'center' }} mb={3}><img src={logo} alt="로고" width={'140px'}/></Box>
              <Box mb={3}>
                <Typography variant="overline">Email Address</Typography>
                <TextField
                    id="user_id"
                    name="user_id"
                    placeholder="이메일을 입력하세요."
                    fullWidth
                    error={error.user_id}
                    helperText={ error.user_id ? (error.userIdMsg) : ("") }
                    onChange={changeUserData}
                />
              </Box>
              <Box mb={3}>
                <Typography variant="overline">Password</Typography>
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    fullWidth
                    error={error.password}
                    helperText={ error.password ? (error.passwordMsg) : ("") }
                    style={{marginBottom: "8px"}}
                    onChange={changeUserData}
                />
                <TextField
                    id="rePassword"
                    name="rePassword"
                    type="password"
                    placeholder="비밀번호를 한번 더 입력하세요."
                    fullWidth
                    error={error.rePassword}
                    helperText={ error.rePassword ? (error.rePasswordMsg) : ("") }
                    onChange={changeUserData}
                />
              </Box>
              <Box mb={3}>
                <Typography variant="overline">Name</Typography>
                <TextField
                    id="name"
                    name="name"
                    placeholder="이름을 입력하세요."
                    fullWidth
                    error={error.name}
                    helperText={ error.name ? (error.nameMsg) : ("") }
                    onChange={changeUserData}
                />
              </Box>
              <Box mb={3}>
                <Typography variant="overline">Nickname</Typography>
                <TextField
                    id="profile_nick"
                    name="profile_nick"
                    placeholder="닉네임을 입력하세요."
                    fullWidth
                    error={error.profile_nick}
                    helperText={ error.profile_nick ? (error.profileNickMsg) : ("") }
                    onChange={changeUserData}
                />
              </Box>
              <Button variant="contained" size="large" fullWidth sx={{ marginTop:'8px' }} onClick={clickSignUpBtn}>Create Account</Button>
              <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              my={4}
            >
                <Grid item><Typography variant="body2" style={{color: '#C1C1C1'}}>계정이 이미 있으신가요?</Typography></Grid>
                <Grid item><Link href="/login" variant="body2" underline="hover">로그인</Link></Grid>
            </Grid>
          </Box>
    );
};

export default SignUp;