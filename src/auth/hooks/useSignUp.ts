import { useSignUpMutation } from 'generated/generates';

const useSignUp = () => {
  return useSignUpMutation({
    endpoint: 'http://localhost:1000/graphql',
    fetchParams: {
      headers: {
        'Content-type': 'application/json',
      },
    },
  });
};
export default useSignUp;
