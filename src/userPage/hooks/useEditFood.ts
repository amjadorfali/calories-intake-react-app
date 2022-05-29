import { useUpdateFoodMutation } from 'generated/generates';

const useEditFood = (accessToken: string) => {
  return useUpdateFoodMutation({
    endpoint: 'http://localhost:1000/graphql',
    fetchParams: {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    },
  });
};
export default useEditFood;
