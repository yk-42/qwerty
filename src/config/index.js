export const config = {
  ACCESS_KEY_ID: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.REACT_APP_S3_BUCKET,
  S3_BUCKET_FOLDER: process.env.REACT_APP_S3_BUCKET_FOLDER,
  S3_BUCKET_REGION: process.env.REACT_APP_S3_BUCKET_REGION,
  FILE_LIMIT_IN_MB: 40
}
