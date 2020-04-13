exports.init = (app) =>
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (e) {
      if (e.status) {
        // could use template methods to render error page
        ctx.body = e.message
        ctx.status = e.status
      } else {
        ctx.body = e || 'Error 500'
        ctx.status = 500
      }
    }
  })
