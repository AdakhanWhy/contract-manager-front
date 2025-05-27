export type UserEntity = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  encryptedPassword: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
}