import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { Videocam } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography
} from '@mui/material'

import React from 'react'

import { config } from '../../config'
import { useSnackBar } from '../../hooks/useSnackbar'

// new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: 'eu-central-1:52ad2e33-dd7b-40b8-93e4-5629b1a04fdc',
// })
const BUCKET_URL = `https://${config.S3_BUCKET}.s3.${config.S3_BUCKET_REGION}.amazonaws.com/`

export function FileUploader() {
  const [s3Client, setS3Client] = React.useState(null)
  const [selectedFiles, setSelectedFiles] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [message, setMessage] = React.useState('')
  const [filesInfos, setFileInfos] = React.useState([])
  const { triggerSnackbar } = useSnackBar()
  React.useEffect(() => {
    const creds = {
      accessKeyId: config.ACCESS_KEY_ID,
      secretAccessKey: config.SECRET_ACCESS_KEY
    }
    if (!s3Client) {
      const s3 = new S3({
        region: config.S3_BUCKET_REGION,
        credentials: creds
      })
      setS3Client(s3)
    }

    return () => {}
  }, [])
  React.useEffect(() => {
    if (s3Client) {
      loadUploadedVideos()
    }
    return () => {}
  }, [s3Client])

  const loadUploadedVideos = () => {
    s3Client.listObjects(
      {
        Bucket: config.S3_BUCKET,
        Prefix: config.S3_BUCKET_FOLDER
      },
      function (err, data) {
        if (err) {
          console.error('There was an error viewing your album: ' + err.message)
          return []
        }
        // const href = this.request.httpRequest.endpoint.href
        const _uploadedVideos = data.Contents.map((videoFile) => {
          const videoFileUrl = BUCKET_URL + videoFile.Key
          const videoFileKey = videoFile.Key.replace(
            config.S3_BUCKET_FOLDER,
            ''
          )
          const videoFileLastModified = videoFile.LastModified
          return {
            videoFileKey,
            videoFileUrl,
            videoFileLastModified
          }
        })
        const uploadedVideos = _uploadedVideos.sort(
          ({ videoFileLastModified: lm1 }, { videoFileLastModified: lm2 }) =>
            lm2 - lm1
        )
        setFileInfos(uploadedVideos.filter((e) => e.videoFileKey) || [])
        return uploadedVideos
      }
    )
  }
  const selectFile = (event) => {
    const files = event.target.files
    const filesize = (files[0].size / 1024 / 1024).toFixed(4)

    if (files[0].name && filesize <= config.FILE_LIMIT_IN_MB) {
      setSelectedFiles(event.target.files)
      if (message) {
        setMessage(' ')
      }
      setProgress(0)
    } else {
      setMessage(
        `File size cannot be greater than ${config.FILE_LIMIT_IN_MB} MB`
      )
    }
  }

  const upload = () => {
    setIsUploading(true)
    const file = selectedFiles[0]
    const target = {
      Bucket: config.S3_BUCKET,
      Key: config.S3_BUCKET_FOLDER + file.name,
      Body: file
    }

    try {
      const parallelUploads3 = new Upload({
        client: s3Client,
        leavePartsOnError: false,
        params: target
      })

      parallelUploads3.on('httpUploadProgress', (progress) => {
        setProgress(parseInt((progress.loaded * 100) / progress.total))
      })

      parallelUploads3.done().then(() => {
        // create a new file
        const videoFileUrl = BUCKET_URL + config.S3_BUCKET_FOLDER + target.Key
        const videoFileKey = target.Key.replace(config.S3_BUCKET_FOLDER, '')
        const videoFileLastModified = new Date()
        setFileInfos((fi) => [
          {
            videoFileKey,
            videoFileUrl,
            videoFileLastModified
          },
          ...fi
        ])
        setIsError(false)
        setSelectedFiles(null)
        setIsUploading(false)
        triggerSnackbar('Hurray! Your video was uploaded successfully!')
      })
    } catch (e) {
      setIsError(true)
      setIsUploading(false)
    }
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container>
        <Grid item xs={10}>
          <LinearProgress
            color={!selectedFiles ? 'inherit' : isError ? 'error' : 'primary'}
            sx={{ height: 15, borderRadius: 5 }}
            variant="determinate"
            value={progress}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography
            textAlign={'right'}
            variant="body2"
            fontWeight={'400'}
            color="InfoText"
          >{`${progress}%`}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            accept="video/mp4,video/x-m4v,video/*"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            onChange={selectFile}
          />
          <Button
            disabled={isUploading}
            fullWidth
            variant="outlined"
            component="span"
          >
            Choose Video
          </Button>
        </label>
      </Grid>
      <Grid
        item
        xs={12}
        container
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Grid item>
          {selectedFiles && selectedFiles.length > 0
            ? selectedFiles[0].name
            : 'No selected file to upload'}
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            component="span"
            disabled={!selectedFiles || isUploading}
            onClick={upload}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="red">
          {message || ' '}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Your Previous Uploads</Typography>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {isUploading && (
            <Skeleton
              component={ListItem}
              width={'100%'}
              height={80}
            ></Skeleton>
          )}
          {filesInfos &&
            filesInfos.map((file, index) => (
              <ListItemButton
                key={index}
                onClick={() => window.open(file.videoFileUrl, '_blank')}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'red' }}>
                    <Videocam />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.videoFileKey}
                  secondary={new Date(
                    file.videoFileLastModified
                  ).toLocaleString()}
                />
              </ListItemButton>
            ))}
        </List>
      </Grid>
      {/* <ul className="list-group">
        {filesInfos &&
          filesInfos.map((file, index) => (
            <ListItemButton divider key={index}>
              <a href={file.url}>{file.name}</a>
            </ListItemButton>
          ))}
      </ul> */}
    </Grid>
  )
}
