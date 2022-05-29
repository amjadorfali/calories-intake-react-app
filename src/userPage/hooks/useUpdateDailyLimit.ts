import { useUpdateDailyLimitMutation } from 'generated/generates';

const useUpdateDailyLimit = (accessToken: string) => {
  return useUpdateDailyLimitMutation({
    endpoint: 'http://localhost:1000/graphql',
    fetchParams: {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    },
  });
};
export default useUpdateDailyLimit;
