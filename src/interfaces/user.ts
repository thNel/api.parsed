export interface UserPassPair {
  username: string,
  password: string,
}

export interface JwtPayload {
  username: string,
  iat: number,
  exp: number
}