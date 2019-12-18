// import morgan from 'morgan'
// import morganJson from 'morgan-json'
// import logger from './logger'

// const morganStream = ({
//   write: (data) => {
//     const details = JSON.parse(data)
//     const shortMessage = `${details.request_method}
//                ${details.request_url} ${details.status} in ${details.response_time} ms`

//     if (details.status >= 500) {
//       logger.error(shortMessage, { details })
//     } else {
//       logger.info(shortMessage, { details })
//     }
//   },
// })
// /* eslint-disable camelcase */
// /* Disabled as must match logging standard */
// const morganFormat = morganJson({
//   remote_addr: ':remote-addr',
//   remote_user: ':remote-user',
//   body_bytes_sent: ':res[content-length]',
//   response_time: ':response-time',
//   status: ':status',
//   request_method: ':method',
//   request_url: ':url',
//   http_version: ':http-version',
//   http_referrer: ':referrer',
//   http_user_agent: ':user-agent',
// })
// /* eslint-enable camelcase */

// export default morgan(morganFormat, ({ stream: morganStream }))
