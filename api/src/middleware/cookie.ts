export interface ResponseAuthCookie {
  name: string;
  value: string;
  options: {
    path: string;
    expires: Date;
    httpOnly: boolean;
    sameSite: boolean;
    secure: boolean;
  };
}

export const makeValidAuthCookie = (token: string) => {
  return {
    name: 'auth',
    value: token,
    options: {
      path: '/',
      expires: new Date('Jan 1, 2023'), // TODO: Should be 30 days or something
      httpOnly: true,
      sameSite: true,
      secure: true,
    },
  };
};

export const makeInvalidAuthCookie = () => {
  return {
    name: 'auth',
    value: '',
    options: {
      path: '/',
      expires: new Date('Jan 1, 1980'),
      httpOnly: true,
      sameSite: true,
      secure: true,
    },
  };
};
