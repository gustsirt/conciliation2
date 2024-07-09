import validateFields from "../../../libraries/utils/validatefiels.js";
import CustomController from "../../../libraries/customs/controller.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
    this.requieredfield = {
      register: ['first_name', 'last_name', 'email', 'password'],
      login: ['email', 'password']
    }
  }

  register = async (req, res) => {
    const userData = validateFields(req.body, this.requieredfield.register);
    await this.service.register(userData)
    res.sendSuccess({}, "Registro exitoso. Ahora inicia sesión con el usuario registrado")
  }

  login = async (req, res) => {
    const userData = validateFields(req.body, this.requieredfield.login);
    const {name, token} = await this.service.login(userData)
    res.sendSuccess({token}, "Log In exitoso con: " + name);
  }

  logout = async (req, res) => {
    this.service.logout()
    res.sendSuccess({},"Cerrado de Sesión existoso")
  }

  getUserSession = (req, res) => res.sendSuccess(req.user)

  updatePassword = async (req, res, next) => {
    let { password } = req.body
    await this.service.updatePassword(req.user.id, password)
    res.sendSuccess("Usuario actualizado")
  }
}