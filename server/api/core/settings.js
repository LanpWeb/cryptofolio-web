const PasswordValidator = require("password-validator");

const withAuth = require("../../middleware/withAuth");

const User = require("../../models/users");

const passwordSchema = new PasswordValidator();
passwordSchema
  .is().min(8)
  .is().max(100)
  .has()
  .uppercase()
  .has()
  .not()
  .spaces();

exports.init = router => router.post("/api/change-password", withAuth, async ctx => {
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

  await User.update({ _id: ctx.state.user.id }, { $set: { password: newPassword } });

  ctx.status = 200;
});
