const PasswordValidator = require("password-validator");
const EmailValidator = require("email-validator");

const UserService = require("./services");

const passwordSchema = new PasswordValidator();
passwordSchema
  .is().min(8)
  .is().max(100)
  .has()
  .uppercase()
  .has()
  .not()
  .spaces();

exports.signIn = async (ctx, next) => {
  const { email, password } = ctx.request.body;

  if (email.length === 0) {
    ctx.throw("Email field is empty.", 400);
  }

  if (!EmailValidator.validate(email)) {
    ctx.throw("Email is not valid.", 400);
  }

  try {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      ctx.throw("No user exists with such email.", 400);
    }

    if (password.length === 0) {
      ctx.throw("Password field is empty.", 400);
    }

    if (!await user.matchesPassword(password)) {
      ctx.throw("Incorrect password. Please try again.", 400);
    }

    ctx.state.user = user;
  } catch (err) {
    ctx.throw(err.message, 400);
  }

  await next();
};

exports.signUp = async (ctx, next) => {
  const { email, password, confirmPassword } = ctx.request.body;

  if (email.length === 0) {
    ctx.throw("Email field is empty.", 400);
  }

  if (!EmailValidator.validate(email)) {
    ctx.throw("Email is not valid.", 400);
  }

  if (password.length === 0) {
    ctx.throw("Password field is empty.", 400);
  }

  if (confirmPassword.length === 0) {
    ctx.throw("Password confirmation field is empty.", 400);
  }

  if (!passwordSchema.validate(password)) {
    ctx.throw("Password is not valid. It should be without spaces, minimum 8 symbols, with at least one uppercase letter.", 400);
  }

  if (password !== confirmPassword) {
    ctx.throw("Password is not equal to password confirmation.", 400);
  }

  try {
    if (!await UserService.isUniqueEmail(email)) {
      ctx.throw("Email has already been taken.", 400);
    }
  } catch (err) {
    ctx.throw(err.message, 400);
  }

  await next();
};

exports.changePassword = async (ctx, next) => {
  const { password, confirmPassword, newPassword } = ctx.request.body;

  if (password.length === 0) {
    ctx.throw("Password field is empty.", 400);
  }

  if (confirmPassword.length === 0) {
    ctx.throw("Password confirmation field is empty.", 400);
  }

  if (newPassword.length === 0) {
    ctx.throw("New password field is empty.", 400);
  }

  if (password !== confirmPassword) {
    ctx.throw("Password is not equal to password confirmation.", 400);
  }

  if (!passwordSchema.validate(newPassword)) {
    ctx.throw("New password is not valid. It should be without spaces, minimum 8 symbols, with at least one uppercase letter.", 400);
  }

  if (!await ctx.state.user.matchesPassword(password)) {
    ctx.throw("Incorrect old password. Please try again.", 400);
  }

  await next();
};
