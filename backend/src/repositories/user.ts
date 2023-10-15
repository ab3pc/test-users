import { CreateUser, UpdateUser } from "../common/types/user";
import { dbConnection } from "../config/config";
import { User } from "../db/models/models";

export class UserRepository {
  private _dbClient: typeof User;

  constructor(sequelizeClient: typeof User) {
    this._dbClient = sequelizeClient;
  }

  public getAll(
    sortByValue: string | null,
    sortByCol: string
  ): Promise<User[]> {

    return this._dbClient.findAll({
      attributes: ["id", "fullname", "email", "phone"],
      where: {
        isActive: true,
      },
      ...(sortByValue && {
        order: [[dbConnection.col(sortByCol), sortByValue]],
      }),
    });
  }

  public create(signUpData: CreateUser): Promise<User> {
    return this._dbClient.create({
      ...signUpData,
    });
  }

  public getById(id: number): Promise<User | null> {
    return this._dbClient.findOne({
      where: {
        id,
      },
    });
  }

  public updateUser(user: User, data: UpdateUser): Promise<User> {
    return user.update({
      ...data,
    });
  }

  public delete(user: User): Promise<User> {
    return user.update({
      isActive: false,
    });
  }

  public getByEmail(email: string): Promise<User | null> {
    return this._dbClient.findOne({
      where: {
        email,
      },
    });
  }
  public getAllByEmail(email: string): Promise<User[] | null> {
    return this._dbClient.findAll({
      where: {
        email,
      },
    });
  }
}
