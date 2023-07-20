import { User } from 'src/app/model/user.model';

export type AuthState = {
  user: User | null;
};

export const initialState: AuthState = {
  user: null,
};
