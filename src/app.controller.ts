import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      message: 'Bienvenido a Cine API',
      status: 'OK',
    };
  }
}
