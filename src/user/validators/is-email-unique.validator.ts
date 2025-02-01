import { Injectable } from '@nestjs/common';

import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator } from 'class-validator';
import { UserService } from 'src/user/user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string) {
    console.log(email);
    const user = await this.userService.findOneByEmail(email);
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email is already in use';
  }
}

export function UniqueEmail(validationOptions?: any) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUnique,
    });
  };
}
