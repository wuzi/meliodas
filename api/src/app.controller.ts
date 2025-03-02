import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { MaterialsService } from './materials/materials.service';

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
}
