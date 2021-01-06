let Koa = require('koa');
let Router = require('koa-router');
const bodyParser = require('koa-bodyparser')

let cors = require('koa2-cors');

const app = new Koa();
app.use(bodyParser());
const router = new Router();

router
  .get('/test/get-data', async ctx => {
    let backJson = {
      bizSuccess: true
    }

   return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 300);
    }).then(() => {
      ctx.body = backJson;
    })
  })
  
app.use(cors())
app.use(router.routes()).use(router.allowedMethods());
app.listen(3003);