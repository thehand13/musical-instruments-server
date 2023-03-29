import { Role } from 'src/roles/role.model';

export interface ActiveUserData {
  /**
   * The "subject" of the token. The value of this property is the user ID
   * that granted this token
   */
  sub: number;
  /**
   * The subject`s e-mail
   */
  email: string;
  /**
   * The subject`s role
   */
  roles: Role[];
}
