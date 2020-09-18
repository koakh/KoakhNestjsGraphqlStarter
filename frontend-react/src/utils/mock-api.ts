export const userLogin = async ({ email, password }: { email: string, password: string }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com' && password === 'password') {
        resolve();
      } else {
        reject();
      }
    }, 3000);
  });
};
