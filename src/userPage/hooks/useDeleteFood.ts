import { useRemoveFoodMutation } from 'generated/generates';

const useDeleteFood = (accessToken: string) => {
  return useRemoveFoodMutation({
    endpoint: 'http://localhost:1000/graphql',
    fetchParams: {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    },
  });
};
export default useDeleteFood;
