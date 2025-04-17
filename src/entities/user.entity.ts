export type UserPros = {
  id: string;
  email: string;
  password: string;
};

export class User {
  constructor(public props: UserPros) {}
}
