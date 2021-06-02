import { inject, injectable } from 'tsyringe';
import IUsersConnectedRepository from '../repositories/IUsersConnectedRepository';

@injectable()
export default class RegisterUserConnected {
  constructor(
    @inject('UsersConnectedRepository')
    private usersConnectedRepository: IUsersConnectedRepository,
  ) {}

  public async execute(user_id: string, client_id: string): Promise<void> {
    let has_client_id_for_this_user =
      await this.usersConnectedRepository.findByUserId(user_id);

    if (!has_client_id_for_this_user) {
      has_client_id_for_this_user = await this.usersConnectedRepository.create(
        user_id,
        client_id,
      );
    }

    has_client_id_for_this_user.client_id = client_id;

    await this.usersConnectedRepository.save(has_client_id_for_this_user);
  }
}
