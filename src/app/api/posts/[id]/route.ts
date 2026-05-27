import { getPost } from "@/features/posts/queries/get-post"

interface Params {
    params: Promise<{id: string}>
}

export async function GET(_req: Request, { params }: Params) {
    const id = (await params).id;
    const post = await getPost(id)
    return Response.json(post);
}