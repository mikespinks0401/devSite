export const userTransformer = (user) => {
  return {
    email: user.email,
    username: user.username
  }
}
