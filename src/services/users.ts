import { User } from '@src/models/user'

export class UsersService {
  public async create(data: User): Promise<User> {
    const user = new User(data)
    return user.save()
  }
}
