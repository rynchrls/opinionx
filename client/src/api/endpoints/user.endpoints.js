export const userEndpoints = {
  register_user: (name) => {
    return `/user/register?name=${name}`;
  },
};

export default userEndpoints;
