import { GetUsersQuery, useGetUsersQuery } from 'generated/generates';
import { useMemo } from 'react';

const useGetUsers = (accessToken: string) => {
  const enabled = useMemo(() => !!accessToken, [accessToken]);
  const { data, isError, isLoading, isSuccess, error, refetch } = useGetUsersQuery(
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
        getUsers: [],
      },
    }
  );

  return { refetch, error, data: (data || ({} as GetUsersQuery)).getUsers, isError, isLoading, isSuccess };
};
export default useGetUsers;
