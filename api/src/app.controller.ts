import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { MaterialsService } from './materials/materials.service';
import { Faker, pt_BR, de_AT, de, en, base } from '@faker-js/faker';
import {
  UserCategory,
  UserProfile,
  UserStatus,
} from './users/entities/user.entity';
import {
  MaterialType,
  MaterialStatus,
} from './materials/entities/material.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly materialsService: MaterialsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('counts')
  async getCounts() {
    const users = await this.usersService.count();
    const materials = await this.materialsService.count();
    return { users, materials };
  }

  @Get('populate') // Get, so we can access this route from the browser
  async populate() {
    const users = [];
    const materials = [];

    const faker = new Faker({
      locale: [pt_BR, de_AT, de, en, base],
    });

    // Create 10 random users
    for (let i = 0; i < 10; i++) {
      const user = await this.usersService.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        profile: faker.helpers.arrayElement(Object.values(UserProfile)),
        category: faker.helpers.arrayElement(Object.values(UserCategory)),
        registrationNumber: faker.string.numeric(8),
        course: faker.person.jobTitle(),
        department: faker.company.catchPhraseNoun(),
        status: UserStatus.Active,
      });
      users.push(user);
    }

    // Create 10 random materials
    for (let i = 0; i < 10; i++) {
      const material = await this.materialsService.create({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        type: faker.helpers.arrayElement(Object.values(MaterialType)),
        patrimonyNumber: faker.string.numeric(6),
        status: MaterialStatus.Active,
        quantity: faker.number.int({ min: 1, max: 100 }),
        minimum_quantity: faker.number.int({ min: 1, max: 10 }),
      });
      materials.push(material);
    }

    return {
      message: 'Database populated with test data',
      created: {
        users: users.length,
        materials: materials.length,
      },
    };
  }
}
