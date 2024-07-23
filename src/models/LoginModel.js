const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  async register() {
    this.validate();
    if (this.errors.length > 0) return;
    try {
      const salt = bcryptjs.genSaltSync();
      this.body.password = bcryptjs.hashSync(this.body.password, salt);
      this.user = await LoginModel.create(this.body);
    } catch (e) {
      console.log(e);
    }
  }
  validate() {
    this.cleanUp();
    !validator.isEmail(this.body.email) && this.errors.push("Email inválido");

    this.body.password.length < 3 ||
      (this.body.password.length > 50 &&
        this.errors.push("A senha deve ter entre 3 e 50 caracteres"));
  }

  cleanUp() {
    for (const key in this.body) {
      typeof this.body[key] !== "string" && (this.body[key] = "");
    }
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login;
