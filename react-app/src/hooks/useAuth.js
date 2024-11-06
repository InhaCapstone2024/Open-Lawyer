// hooks/useAuth.js
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchUserInfo, fetchAccessToken } from '../apis/jwtAuth';

export const useUserInfo = (accessToken) => {
  return useQuery({
    queryKey: ['userInfo', accessToken],
    queryFn: () => fetchUserInfo(accessToken),
    enabled: !!accessToken,
  });
};

export const useFetchAccessToken = (onSuccess) => {
  return useMutation(fetchAccessToken, {
    onSuccess,
    onError: (error) => {
      console.error('Error fetching access token:', error);
    },
  });
};
