import { GetCurrentAuthenticatedUserQuery, useGetCurrentAuthenticatedUserQuery } from 'generated/generates';
import { useMemo } from 'react';
import lodash from 'lodash';

const useGetCurrUser = (accessToken: string) => {
  const enabled = useMemo(() => !!accessToken, [accessToken]);
  const { data, isError, isLoading, isSuccess, error, refetch } = useGetCurrentAuthenticatedUserQuery(
    {
      endpoint: 'http://localhost:1000/graphql',
      fetchParams: {
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
      },
    },
    //@ts-ignore
    { accessToken },
    {
      enabled: enabled,
      initialData: {
        getCurrentAuthenticatedUser: {
          userName: '',
          foods: [],
          id: '',
          registrationNumber: 0,
          role: '',
          password: '',
          dailyLimit: 2100,
        },
      },
      select: (data) => {
        return {
          ...data,
          getCurrentAuthenticatedUser: {
            ...data.getCurrentAuthenticatedUser,
            foods: lodash.sortBy(data.getCurrentAuthenticatedUser.foods, ['dateTaken']).reverse(),
          },
        };
      },
    }
  );

  return { refetch, error, data: (data || ({} as GetCurrentAuthenticatedUserQuery)).getCurrentAuthenticatedUser, isError, isLoading, isSuccess };
};
export default useGetCurrUser;
