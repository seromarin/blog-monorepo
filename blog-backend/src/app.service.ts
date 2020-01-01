import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  entrypointApi(): string {
    return 'Welcome Home';
  }
}
