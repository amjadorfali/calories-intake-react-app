import { useAddFoodMutation } from 'generated/generates';

const useAddFood = (accessToken: string) => {
  return useAddFoodMutation({
    endpoint: 'http://localhost:1000/graphql',
    fetchParams: {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    },
  });
};
export default useAddFood;
