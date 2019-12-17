import { join } from 'path'
import express from 'express'
import expressStaticGzip from 'express-static-gzip'
import { logInfo, logError } from './logging/logger'

const production = process.env.NODE_ENV === 'production'

const app = express()

if (production) {
  app.use(
    '/',
    expressStaticGzip(join(__dirname, '../../client'), {
      indexFromEmptyFile: false,
      enableBrotli: true,
    }),
  )
} else {
  const devConfig = require('../webpack.development') // eslint-disable-line global-require
  const compiler = require('webpack')(devConfig) // eslint-disable-line global-require
  const middleware = require('webpack-dev-middleware')(compiler) // eslint-disable-line global-require
  const hotMiddleware = require('webpack-hot-middleware')(compiler) // eslint-disable-line global-require

  app.use(middleware).use(hotMiddleware)
}

const port = 4000

app
  .get('/healthcheck', (_, response) => response.send())
  // .use('/api', api)
  .get('*', (request, response) => {
    if (production) {
      response.sendFile(join(__dirname, '../../client/index.html'))
    } else {
      request.url = '/' // Let middleware handle the request
      app.handle(request, response)
    }
  })
  .listen(port, '0.0.0.0', (err) => {
    if (err) {
      logError(err)
      return
    }

    logInfo(`Started. Listening on port ${port}.`)
  })
