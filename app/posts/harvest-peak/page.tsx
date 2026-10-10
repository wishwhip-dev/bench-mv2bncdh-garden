import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { PostHeader } from "@/components/post-header";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "harvest-peak";

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
          src="/illustrations/harvest-peak.svg"
          alt="Illustration of the garden in September: a wicker trug on the path between two raised beds, mounded with a squash, tomatoes, runner beans, beets and carrots, with a marrow lying across the front and crops still standing in the beds behind."
          width={1200}
          height={675}
          unoptimized
          className="h-auto w-full rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground">
          The trug mid-week: squash at the back, beets and carrots at the front, and the marrow that
          nobody planned.
        </figcaption>
      </figure>

      <Prose>
        <p>
          Every garden has one week it spends the rest of the year earning, and this year it was the
          second week of September. The trug went out empty at ten and came back at noon with a
          squash riding on top of the tomatoes, which rode on top of everything else. I weighed the
          haul on the kitchen scales out of curiosity and stopped weighing once the cat got involved,
          but the honest estimate is heavier than the cat, and the cat has never been flattered by
          anyone.
        </p>
        <p>
          The courgettes made their last big wave and I made the classic mistake of blinking. Two
          marrows came of it, one of which is now chutney and the other of which is lying across the
          front of every photograph I take of the garden, like a guest who will not go home. There
          should be a word for the specific embarrassment of a marrow discovered at lunch length.
        </p>
        <p>
          The beans came in by the colanderful, and for the first time I picked a row dry instead of
          for the pot — a double row left on the plants to fatten for seed, rattling quietly next to
          the ones being eaten. It is a strange feeling, growing food in two tenses at once: this
          week&rsquo;s supper on the left cane, next year&rsquo;s crop already drying on the right.
        </p>
        <p>
          What the peak week actually teaches is restraint. The temptation is to lift everything at
          once and stand back, but the pumpkins still had a fortnight of skin to harden, the leeks
          were months from done, and the last bed of carrots was sweeter for every cold night I left
          it in the ground. The garden peaks; the harvest does not. Taking the trug in and leaving
          the rest standing took more discipline than any of the growing did.
        </p>
      </Prose>

      <SharePost slug={SLUG} title={post.title} />
    </article>
  );
}