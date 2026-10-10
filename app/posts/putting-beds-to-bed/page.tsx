import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { PostHeader } from "@/components/post-header";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "putting-beds-to-bed";

export function generateMetadata(): Metadata {
  const post = getPost(SLUG);
  return { title: post?.title, description: post?.blurb };
}

export default function Page() {
  const post = getPost(SLUG);
  if (!post) notFound();

  return (
    <article className="space-y-8">
      <PostHeader title={post.title} published={post.published} tags={post.tags} />

      <figure>
        <Image
          src="/illustrations/putting-beds-to-bed.svg"
          alt="Illustration of a November garden: one raised bed covered with pale fleece pegged down at the corners, garlic shoots pushing the fleece up in one spot, the front bed mulched with dark compost, a compost heap and a fork standing by stacked canes."
          width={1200}
          height={675}
          unoptimized
          className="h-auto w-full rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground">
          The two winters: fleece over the garlic bed, compost mulch on the front bed, and the tools
          already stacked.
        </figcaption>
      </figure>

      <Prose>
        <p>
          November&rsquo;s work is subtraction. Everything above ground that has finished giving gets
          composted, everything below ground stays where it can be eaten out by the frost, and the
          tools get an oil rag and a hook. There is almost nothing here that calls itself urgent, and
          that is precisely why it matters: the beds are never easier to leave well alone than the
          day everything else is being put away.
        </p>
        <p>
          The front bed got its inch of finished compost raked level rather than dug in — earthworms
          do the incorporation over winter if you let them, and they are better at it than I am and
          do not need telling twice. The heap by the corner has been turned twice since September
          and is finally steering towards something crumbly; the half-rotten quotient is honest
          enough that I know it still has a season to go.
        </p>
        <p>
          The fleece went over the garlic bed, not for warmth, though it helps with that, but to
          keep the bulbs from heaving in and out of freeze-thaw cycles until January settles in
          earnest. Everywhere the tips have pushed the gauze up in little tents is a placeholder to
          wake to in spring — this year there are eleven of them, which got checked twice and
          counted eleven both times.
        </p>
        <p>
          The last walk round is a list of things that will matter by March: which bed had beans
          last, which got the worst of the slug year, where the leeks are standing for Christmas.
          None of it gets written down because it is written in the beds themselves. The season
          closes the way it opened, with a flat bed that is remembering everything.
        </p>
      </Prose>

      <SharePost slug={SLUG} title={post.title} />
    </article>
  );
}