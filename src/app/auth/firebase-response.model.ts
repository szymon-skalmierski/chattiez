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

export interface LookupResponse {
  kind: string;
  users: {
    createdAt: string;
    disabled: boolean;
    displayName: string;
    email: string;
    emailVerified: boolean;
    lastLoginAt: string;
    localId: string;
    passwordHash: string;
    passwordUpdatedAt: number;
    photoUrl: string;
    providerUserInfo: any[];
    validSince: string;
  }[];
}
