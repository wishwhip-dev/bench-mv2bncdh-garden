import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatPublished, listPosts } from "@/lib/posts";

/**
 * The index. Generated from the posts on disk — there is no list to maintain and nothing to edit
 * when a post is added. See `lib/posts.ts`; if a post is not appearing here, the cause is its
 * `meta.json`, not this file.
 */
export default function Home() {
  const posts = listPosts();

  if (posts.length === 0) {
    return (
      <p className="text-muted-foreground">
        No posts yet. Add one at <code>app/posts/&lt;slug&gt;/page.tsx</code>.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-6">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/posts/${post.slug}`}
            className="block rounded-xl outline-none no-underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Card className="transition-colors hover:border-primary/60">
              <CardHeader>
                <CardHeaderTitle>{post.title}</CardHeaderTitle>
                <p className="text-sm text-muted-foreground">
                  <time dateTime={post.published}>{formatPublished(post.published)}</time>
                </p>
              </CardHeader>
              <CardContent>
                {post.blurb && <p className="text-[var(--prose-body)]">{post.blurb}</p>}
              </CardContent>
              {post.tags.length > 0 && (
                <CardFooter className="gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </CardFooter>
              )}
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** h2 rather than CardTitle's default div, so the index reads as a proper list of articles. */
function CardHeaderTitle({ children }: Readonly<{ children: React.ReactNode }>) {
  return <h2 className="text-xl font-medium leading-snug tracking-tight">{children}</h2>;
}
