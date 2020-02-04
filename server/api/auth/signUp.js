const EmailValidator = require("email-validator");
const PasswordValidator = require("password-validator");

const User = require("../../models/users");

const config = require("../../config/default");

const { createAccessToken, createRefreshToken } = require("../../utils/auth");

const spasswordSchema = new PasswordValidator();
spasswordSchema
  .is().min(8)
  .is().max(100)
  .has()
  .uppercase()
  .has()
  .not()
  .spaces();

exports.init = router => router.post("/api/sign-up", async ctx => {
  const { email, password } = ctx.request.body;

  if (email.length === 0) {
    ctx.throw("Email field is empty.", 400);
  }

  if (!EmailValidator.validate(email)) {
    ctx.throw("Email is not valid.", 400);
  }

  if (password.length === 0) {
    ctx.throw("Password field is empty.", 400);
  }

  if (!spasswordSchema.validate(password)) {
    ctx.throw("Password is not valid. It should be without spaces, minimum 8 symbols, with at least one uppercase letter.", 400);
  }

  if (await User.where({ email }).countDocuments() !== 0) {
    ctx.throw("Email has already been taken.", 400);
  }

  const user = await User.create({ email, password });

  const refreshToken = createRefreshToken(user.id);
  await User.findByIdAndUpdate(user.id, { $push: { refreshTokens: refreshToken } });

  ctx.cookies.set("refreshToken", refreshToken, config.refreshTokenCookie);
  ctx.status = 200;
  ctx.body = {
    accessToken: createAccessToken(user.id)
  };
});
