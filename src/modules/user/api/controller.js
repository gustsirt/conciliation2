import validateFields from "../../../libraries/validatefiels.js";
import CustomController from "../../../libraries/customs/controller.js";
import usersService from "../logic/service.js";

export default class UsersController extends CustomController {
  constructor() {
    super(usersService);
    this.requieredfield = {
      register: ['first_name', 'last_name', 'email', 'password'],
      login: ['email', 'password']
    }
  }

  register = async (req, res) => {
    try {
      const userData = validateFields(req.body, this.requieredfield.register);
      await this.service.register(userData)
      res.sendSuccess({}, "Registro exitoso. Ahora inicia sesión con el usuario registrado")
    } catch (error) { 
      res.sendCatchError(error) }
  }

  login = async (req, res) => {
    const userData = validateFields(req.body, this.requieredfield.login);
    try {
      const {name, token} = await this.service.login(userData)
      res.sendSuccess({token}, "Log In exitoso con: " + name);
    } catch (error) {
      console.log(error);
      req.logger.error(error);
      res.sendCatchError(error)
    }
  }

  logout = async (req, res) => {
    this.service.logout()
    res.sendSuccess({},"Cerrado de Sesión existoso")
  }

  getUserSession = (req, res) => res.sendSuccess(req.user)

  updatePassword = async (req, res, next) => {
    try {
      let { password } = req.body
      await this.service.updatePassword(req.user.id, password)
      res.sendSuccess("User updated")
    } catch (error) {
      next(error);
    }
  }

  delete = async ( req, res ) => {
    try {
      const { hs } = req.query
      const element = await this.service.delete(hs);
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      req.logger.error(error);
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }
}