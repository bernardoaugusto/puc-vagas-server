// import { inject, injectable } from 'tsyringe';
// import IUsersRepository from '../repositories/IUsersRepository';

// @injectable()
// export default class RemoveUserService {
//   constructor(
//     @inject('UsersRepository')
//     private usersRepository: IUsersRepository,
//   ) {}

//   public async execute(vacancyId: string): Promise<void> {
//     await this.usersRepository.execute(vacancyId);

//     await this.usersRepository.remove(vacancyId);
//   }
// }
