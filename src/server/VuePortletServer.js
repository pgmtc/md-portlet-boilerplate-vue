import MdPortletServer from 'md-lib/server/MdPortletServer'
import log from './logger'

export default class TestPortletServer extends MdPortletServer {
  constructor(portletLocation) {
    super('vuePortlet', portletLocation)
    this.expose(::this.doSomeWork);
    this.exposeJob(::this.doSomeWorkAsync)
    this.expose(::this.suicide);
    this.exposeGet('/work', this.workHandler)
  }

  workHandler(req, res, next) {
    log.info('Doing some work via get')
    res.send('Done')
  }
  /* Example of sync call - see TestPortlet for how to call it */
  doSomeWork(context, param1, param2) {
    let userName = context.auth.displayName
    log.debug(`Doing some work for ${userName} ... ${param1}, ${param2}`);
    return `Join: ${param1}:${param2} - ${new Date()}`;
  }

  /* Example of async call - see TestPortlet for how to call it */
  async doSomeWorkAsync(job, context, param1, param2) {
    let userName = context.auth.displayName
    log.debug(`Doing some work for ${userName} ... ${param1}, ${param2}; ${new Date()}`);
    for (let j = 1; j <= 10; j++) {
      job.progress('some progress ' + j)
      await sleep(100)
      if (1 === 0) {
        // if I want to report error
        job.error('There has been some error')
      }
    }
    job.done('job done');
  }

  suicide() {
    log.info(`${this.id} received suicide request. Exiting !!!`)
    setTimeout(process.exit, 0)
    return this.id + ' committing suicide';
  }
}

var sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
