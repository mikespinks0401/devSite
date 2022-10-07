export const userTransformer = (user) => {
  return {
    id: user.id,
    email: user.email,
  }
}
