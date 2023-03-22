export class CreateUserDto {
  readonly email: string;

  readonly passwordHash: string;

  readonly name: string;

  readonly surname: string;
}
