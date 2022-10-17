import { useState } from 'react'
import { Box, Grid, Button, TextField, Typography, Link } from '@mui/material'
import logo from './../assets/images/BADA_logo_full.png';

import server from './../config/server.json'
import axios from 'axios'

import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

let Login = () => {
  const navigate = useNavigate()
  const [ cookie, setCookie, removeCookie ] = useCookies(['token'])

  const [userData, setUserData] = useState({
    user_id: '',
    password: ''
  })
  
  const [error, setError] = useState({
    user_id: false,
    password: false,
    userIdMsg: '이메일을 입력하세요.',
    passwordMsg: '비밀번호를 입력하세요.'

  })

  // 이메일 형식 체크
  let userIdValidationChk = (userId) => { 
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return emailRegex.test(userId);
  }

  // 로그인 버튼 클릭
  let clickLoginBtn = async () => {
    let userIdErrFlg = false
    let passwordErrFlg = false
    let userIdErrMsg = ''
    
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
    }
    
    setError({
      ...error,
      user_id: userIdErrFlg,
      password: passwordErrFlg,
      userIdMsg: userIdErrMsg
    })

    if (!userIdErrFlg && !passwordErrFlg) {
      await axios.post(`${server.url}/user/login`, userData)
      .then(res => {
        console.log(res)
        if(res.data.status) {
          setCookie("token", res.data, {path: '/'}); 
          navigate('/record')
        } else{
          alert(res.data.message)
        }
      })
      .catch(e => console.log(e))
    }
  }

  let changeUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  // inline style
  const hrStyle = {
    height: '1px',
    backgroundColor: '#6F8AA3',
    border: '0'
  }

  const btnSocialLoginStyle = {
    transition: 'all .2s',
    outline: '0',
    border: '1px solid transparent',
    padding: '.5rem',
    borderRadius: '50%',
    color: '#fff'
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
            <Box sx={{ textAlign: 'center' }} mb={3}><img src={logo} alt="로고" width={'140px'} /></Box>
            <TextField
                id="user_id"
                name="user_id"
                type="text"
                label="Email" 
                placeholder="Email"
                error={error.user_id}
                helperText={ error.user_id ? (error.userIdMsg) : ("") }
                fullWidth
                margin="normal"
                onChange={changeUserData}
            />
            <TextField
                id="password"
                name="password"
                type="password"
                label="Password" 
                placeholder="Password"
                error={error.password}
                helperText={ error.password ? (error.passwordMsg) : ("") }
                fullWidth
                margin="normal"
                onChange={changeUserData}
            />
            <Button variant="contained" size="large" fullWidth sx={{ marginTop:'8px' }} onClick={clickLoginBtn}>LOGIN</Button>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              my={4}
            >
                <Grid item><Typography variant="body2" style={{color: '#C1C1C1'}}>계정이 없으신가요?</Typography></Grid>
                <Grid item><Link href="/signUp" variant="body2" underline="hover">회원가입</Link></Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <Grid item xs={4}><hr style={hrStyle}/></Grid>
              <Grid item xs={4}><Typography variant="body2" textAlign={'center'} style={{color: '#6F8AA3'}}>SNS 간편로그인</Typography></Grid>
              <Grid item xs={4}><hr style={hrStyle}/></Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item><button style={{...btnSocialLoginStyle, ...{background: '#D93025'}}}><i className="xi-2x xi-google"></i></button></Grid> {/* 소셜로그인 구글 BTN */}
              <Grid item><button style={{...btnSocialLoginStyle, ...{background: '#1FC700'}}}><i className="xi-2x xi-naver"></i></button></Grid> {/* 소셜로그인 네이버 BTN */}
              <Grid item><button style={{...btnSocialLoginStyle, ...{background: '#FFEB00'}}}><i className="xi-2x xi-kakaotalk" style={{color: '#343a40'}}></i></button></Grid> {/* 소셜로그인 네이버 BTN */}
            </Grid>
        </Box>
  );
};
export default Login;
