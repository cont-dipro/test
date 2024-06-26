import { Prisma, User } from "@prisma/client";
import { Injectable } from "@nestjs/common";

import { UserRepo } from "modules/user/user.repo";

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.userRepo.findOne(userWhereUniqueInput);
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.userRepo.findAll({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.userRepo.create(data);
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.userRepo.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.userRepo.delete(where);
  }

  async checkExistingEmail(email: string): Promise<boolean> {
    const user = await this.findOne({ email });
    return !!user;
  }

  async checkExistingToken(token: string): Promise<boolean> {
    const user = await this.findOne({ token });
    return !!user;
  }
}
