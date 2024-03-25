import { useAuthContext } from '@context/AuthContext';

import { useToast } from '@components/shadcn/ui/use-toast';

export const useApi = () => {
  const { token, removeToken } = useAuthContext();
  const { toast } = useToast();
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
        },
        ...(body && { body: JSON.stringify(body) })
      });

      if (res.ok) {
        return (await res.json()) as T;
      } else {
        if (res.status === 403 || res.status === 401) {
          console.log('Wrong token, logging out...');
          removeToken();
          return null;
        } else {
          toast({
            title: 'Error',
            description: 'Something went wrong, check console for more info.'
          });
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
