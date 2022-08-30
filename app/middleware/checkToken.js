function checkToken() {
  return async function(ctx, next) {
    try {
      // 获取到token
      const token = ctx.request.headers.authorization;
      // 校验token
      const decode = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
      if (decode.username && decode.password) {
        await next();
      } else {
        ctx.body = {
          code: 4000,
          msg: '用户校验失败',
        };
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 4000,
        msg: 'token未通过验证',
      };
    }
  };
}

module.exports = checkToken;
