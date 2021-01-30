const PROTOCOLS = {
  http: 'http://',
  https: 'https://',
  ws: 'ws://',
  wss: 'wss://'
}
const PORT = '3000'
export const HOST = `192.168.1.5:${PORT}`
export const mainApi = {
  baseUrl: `${PROTOCOLS.http}${HOST}/api`,
};
export const WS_HOST = `${PROTOCOLS.ws}${HOST}`

//old prod:  'http://3.135.61.45:8080'
//old dev:  'http://3.135.61.45:8082'

//new prod:  'http://65.1.65.159:8080'
//new dev:  'http://65.1.65.159:8082'
