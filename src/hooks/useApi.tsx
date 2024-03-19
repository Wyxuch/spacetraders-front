import { useAuthContext } from '@context/AuthContext';

export const useApi = () => {
  const { token, removeToken } = useAuthContext();
  return async <T, K>(url: string, body?: K, incomingMethod?: 'GET' | 'PUT' | 'POST' | 'DELETE'): Promise<T | null> => {
    try {
      let method = 'GET';
      if (body) {
        method = 'POST';
      }

      if (incomingMethod) {
        method = incomingMethod;
      }

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        return (await res.json()) as T;
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
