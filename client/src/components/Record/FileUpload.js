import { Box, Grid, Button, IconButton, TextField, Typography, Link } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
    const navigate = useNavigate();

    const handleChangeFile = (e) => {
        navigate('/record/create', { state: e.target.files[0] });
    } 

    const PtagStyle = {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px'
    }

    return (
        <Box sx={{ 
            position: 'absolute',
            top: '50%',
            left: '60%',
            width:'60%',
            transform: 'translate(-50%, -50%)'
          }}>
            <p style={PtagStyle}>내 PC에서 음성 파일을 첨부하세요. </p>
            <p style={PtagStyle}>최대 250MB의 mp4, m4a, mp3, amr, flac, wav 확장자를 지원합니다.</p>
            <div style={{textAlign:'center'}}>
                <IconButton variant="contained" aria-label="upload file" component="label" size="large" style={{background: '#ddd'}}>
                    <input type="file" id="file" hidden onChange={handleChangeFile}/>
                    <FileUploadIcon fontSize="inherit"/>
                </IconButton>
            </div>
        </Box>
    );
};

export default FileUpload;