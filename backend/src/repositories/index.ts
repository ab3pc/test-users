import { Sequelize } from 'sequelize';
import { RepositoriesInit } from '../common/types';
import { UserRepository } from './user';
import { User } from '../db/models/User';

export const initRepositories = (): RepositoriesInit => ({
  userRepository: new UserRepository(User),

});

export type Repositories = ReturnType<typeof initRepositories>;

export {
  type UserRepository,
};
