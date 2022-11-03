// 公众号token验证
function checkAccessToken() {
  return async function(ctx, next) {
    try {
      const bool = await ctx.service.wechat.wechatGetAccesToken.isAccesssToken();
      console.log(bool, 'bool');
      if (bool) {
        await next();
      } else {
        ctx.body = {
          code: 4000,
          msg: 'token已过期,请重新进入',
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

module.exports = checkAccessToken;
