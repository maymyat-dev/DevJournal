import { getPosts } from "@/features/posts/queries/get-posts";

export async function GET() {
 const posts =   await getPosts(undefined, {
        search: "",
        sort: "desc",
        page: "0"
    });

    return Response.json(posts)
}

