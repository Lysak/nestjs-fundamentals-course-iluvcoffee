import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // getHandler references the method that will be triggered after going through here
    // reflector is used to get metadata that is set using SetMetadata
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;

    // switchToHttp give us access to request, response, and next
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');

    // instead of using process.env would rather use config
    return authHeader === this.configService.get('API_KEY');
  }
}
