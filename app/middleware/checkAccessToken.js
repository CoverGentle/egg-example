// 公众号token验证
function checkAccessToken() {
  return async function(ctx, next) {
    try {
      const bool = await ctx.service.wechat.wechatGetAccesToken.isAccesssToken();
      console.log(bool, 'bool');
      if (bool) {
        await next();
      } else {
        return await ctx.controller.wechat.gzhindex.getAccessToken();
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

