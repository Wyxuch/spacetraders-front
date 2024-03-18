import { useAuthContext } from '@context/AuthContext';

export const useApi = () => {
  const { token, removeToken } = useAuthContext();

  // na razie tylko GET działa
  return async <T extends (token: string, ...args: string[]) => Promise<Response>, K>(
    apiCall: T,
    ...args: string[]
  ): Promise<K | null> => {
    try {
      const res = await apiCall(token!, ...(args || ([] as string[])));
      if (res.ok) {
        return (await res.json()) as K;
      } else {
        if (res.status === 403 || res.status === 401) {
          console.log('Wrong token, logging out...');
          removeToken();
          return null;
        } else {
          console.log('Error:', res.status, res.statusText);
          return null;
        }
      }
    } catch (error) {
      // TODO: Handle dat shit
      console.log(error);
      return null;
    }
  };
};
