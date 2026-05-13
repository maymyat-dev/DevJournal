export const ABOUT = '/about'
export const POSTS = '/posts'
export const SINGLE_POST = (id: string | number) => `/posts/${id}`
export const EDIT_POST = (id:string | number ) => `${POSTS}/${id}/edit`