/* eslint-disable import/no-anonymous-default-export */
export default {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  REACT_APP_API_HOST: process.env.REACT_APP_API_HOST,
  REACT_APP_DATABASE_URL: process.env.REACT_APP_DATABASE_URL
}