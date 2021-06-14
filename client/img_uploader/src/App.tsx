import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {
    Container,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
} from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import './App.css';
import upload_bg from './assets/image/upload_bg.jpg'
import axios from 'axios'

const useStyles = makeStyles({
    root: {
        minWidth: 300,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    title: {
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
    },
    actions: {
        justifyContent: 'center',
    }
})

// Dropzoneの設定
const acceptFile = 'image/*'

type MyFile = File & {
    preview: string
}

const App:React.FC = () => {

    // Style
    const classes = useStyles()

    // State
    const [isShow, setIsShow] = useState(false)
    const [files, setFiles] = useState<MyFile[]>([])

    // ドロップした時の処理
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setIsShow(true)

        setFiles(acceptedFiles.map(
            file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        ))
    }, [])

    // Dropzone
    const { getRootProps, getInputProps, isDragActive, open }
        = useDropzone({ noClick: true, onDrop, accept: acceptFile })

    const upload = () => {
        const data = new FormData()
        files.forEach(file => data.append('file', file))
        axios.post('http://localhost:8000/api/image/', data)
        .then(res => {
            console.log(res)
            setIsShow(false)
            setFiles([])
        })
        .catch(e => {
            console.log(e)
        })
    }

    return (
        <Container maxWidth="sm">
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant='h6' component='h2' className={classes.title}>
                        Image uploader
                    </Typography>
                    <Typography component='p' color='textSecondary' className={classes.subtitle}>
                        drag & drop
                    </Typography>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        {isShow ? (
                            files.map(file => (
                                <img key={file.name} src={file.preview} alt={file.name} width='200' />
                            ))
                        ) : (
                            <img src={upload_bg} alt='bg' className={'upload_img ' + (isDragActive ? 'is-on' : '') } width='200' />
                        )}
                        <input {...getInputProps()} />
                    </div>

                </CardContent>
                
                <CardActions className={classes.actions}>
                    <Button
                        size='small'
                        color='primary'
                        variant='contained'
                        component="span"
                        onClick={open}
                    >Select</Button>
                    {isShow && (
                        <Button
                            size='small'
                            color='primary'
                            variant='contained'
                            component='span'
                            onClick={upload}
                        >Upload</Button>
                    )}
                </CardActions>
            </Card>
        </Container>
    )
}

export default App;
