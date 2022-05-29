import { useSignInMutation } from 'generated/generates';

const useSignIn = () => {
  return useSignInMutation({
    endpoint: 'http://localhost:1000/graphql',
    fetchParams: {
      headers: {
        'Content-type': 'application/json',
      },
    },
  });
};
export default useSignIn;
