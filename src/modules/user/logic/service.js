import dayjs from 'dayjs';
import configObject from '../../../config/env.js';
import CustomService from '../../../libraries/customs/service.js';
import { createHashAsync, isValidPasswordAsync } from '../../../libraries/sessions/passwords.js';
import createToken from '../../../libraries/sessions/createToken.js';

class UsersRepository extends CustomService {
  constructor(dao) {
    super(dao);
    this.admins = configObject.uadmins || []
    this.admin_pass = configObject.uadmin_pass
  }

  register = async (userData) => {
    userData.password = await createHashAsync(userData.password)
    const userFound = await this.dao.getBy({email: userData.email});
    if (userFound) throw new Error(`Ya existe un usuario con ese email. pruebe con otro`)
    return await this.dao.create(userData)
  }

  login = async (userData) => {
    // Admin Verification
    if (this.admins.includes(userData.email)) {
      if (await isValidPasswordAsync(userData.password, {password: this.admin_pass})) {
        const token = createToken({id: 0, role: "admin"})
        return {name: "Admin", token}
      } else {
        throw new Error(`Email o contraseña equivocado`);
      }
    }
    // User Verification
    const userFound = await this.dao.getBy({email: userData.email});
    if (!userFound || !isValidPasswordAsync(userData.password, userFound)) {
      throw new Error(`Email o contraseña equivocado`);
    }

    const token = createToken({id: userFound._id, role: userFound.role})
    await this.dao.update({_id: userFound._id}, {lastconnection: new Date()})
    return {name: userFound.first_name, token}
  }

  logout = async () => {}
  
  updatePassword = async (uid, password) => {
    password = createHash(password)
    return await this.dao.update({_id: uid}, {password})
  }

  update      = async (eid, elementUpdate)  => {
    const elementToUpdate = (new LastUpdateDTO(elementUpdate)).things;
    return await this.dao.update({_id: eid}, elementToUpdate)
  }

  delete = async (hs = 3) => {
    const timelimit = dayjs().subtract(hs, 'hour').toDate();

    const result = await this.dao.deleteMany({
      lastconnection: { $lt: timelimit },
    });

    return result
  }
}

import UserDaoMongo from '../data/dao.mongo.js';
const usersService = new UsersRepository(new UserDaoMongo())
export default usersService