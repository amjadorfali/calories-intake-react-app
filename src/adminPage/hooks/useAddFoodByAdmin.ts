import { useAdminCreateFoodMutation } from 'generated/generates';

const useAddFoodByAdmin = (accessToken: string) => {
  return useAdminCreateFoodMutation({
    endpoint: 'http://localhost:1000/graphql',
    fetchParams: {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    },
  });
};
export default useAddFoodByAdmin;
