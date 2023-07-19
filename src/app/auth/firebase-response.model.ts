export interface SignInWithPasswordResponse {
  displayName: string;
  email: string;
  idToken: string;
  kind: string;
  localId: string;
  profilePicture: string;
  registered: boolean;
}

export interface SignUpResponse {
  email: string;
  idToken: string;
  localId: string;
}

export interface UsernamesDTO {
  [userId: string]: string;
}
