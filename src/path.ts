export const aboutPath = '/about'
export const postsPath = '/posts'
export const singlePostPath = (id: string | number) => `${postsPath}/${id}`;
export const editPostPath = (id: string | number) => `${postsPath}/${id}/edit`;

export const registerPath = '/register'
export const loginPath = '/login'
export const forgetPasswordPath = '/forget-password'