
export const aboutPath = '/about'
export const postsPath = '/posts'
export const profilePath = '/profile'

export const singlePostPath = (id: string | number) => `${postsPath}/${id}`;
export const editPostPath = (id: string | number) => `${postsPath}/${id}/edit`;

export const registerPath = '/auth/sign-up'
export const loginPath = '/auth/sign-in'
export const resetPasswordPath = '/auth/reset-password'
export const changePasswordPath = '/auth/change-password'
