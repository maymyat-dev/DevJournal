import PostItem from "@/features/posts/components/post-item";
import { getPosts } from "../queries/get-posts";
import SearchInput from "@/components/search-input";
import { SearchParams } from "../types/search-params";

interface Props {
  userId?: string | undefined;
  searchParams: SearchParams;
}
async function PostList({ userId = undefined, searchParams }: Props) {
  const posts = await getPosts(userId, searchParams);

  return (
    <div className="mt-5">
      <SearchInput placeholder="Search posts" />
      <div className="mt-5">
        {posts.map((post) => (
          <div key={post.id} className="space-y-6 mb-5">
            <PostItem {...post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
