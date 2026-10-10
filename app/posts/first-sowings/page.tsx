import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { PostHeader } from "@/components/post-header";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "first-sowings";

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
          src="/illustrations/first-sowings.svg"
          alt="Illustration of an early spring garden: a rake leans against a raised bed where two pale drills hold scattered seed dots, the first seedling leaves have broken the soil, and a seed packet sits on the bed frame."
          width={1200}
          height={675}
          unoptimized
          className="h-auto w-full rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground">
          The first bed of the year, mid-sowing: drills drawn, seed in, and a corner already up.
        </figcaption>
      </figure>

      <Prose>
        <p>
          The season opened the way it always does here: not with a date on the calendar but with a
          handful of soil that finally stopped squeezing into a cold lump. Mid-March on the beds, and
          the top two inches crumbled instead of clung. That was the sign. The parsnip seed went in
          the same afternoon, three seeds to a station down a drill as straight as I could cut it,
          because parsnips forgive almost nothing and never wait.
        </p>
        <p>
          The broad beans had gone in weeks earlier and sulked through two frosty nights, which is
          what broad beans do. By the time I cut the second drill they had shrugged it off — the
          black-leaved ones especially, standing like they had not noticed winter at all. There is a
          stubbornness in them I find reassuring in a plant and slightly alarming in a neighbour.
        </p>
        <p>
          I drew the bed map again, on the back of an envelope as usual, and broke my own rule about
          sowing carrots before the first week of April. The rule exists because a warm week in March
          has fooled me twice, and both fleets of carrot fly eggs arrived on schedule to meet the
          seedlings. This year the seed packets are still in the tin, and the waiting is the work.
        </p>
        <p>
          The last hour went to the compost screen. What fell through the riddle went onto the
          seedbed; what stayed behind went back to the heap to argue about. By the time I raked the
          drills flat the light had gone that thin blue way it does in March, and the bed looked
          almost exactly as it had before I started. That is the strange faith of the first weekend:
          a flat, empty-looking bed that is already, quietly, the whole year&rsquo;s plan.
        </p>
      </Prose>

      <SharePost slug={SLUG} title={post.title} />
    </article>
  );
}