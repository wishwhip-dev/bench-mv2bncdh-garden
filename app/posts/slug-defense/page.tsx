import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { PostHeader } from "@/components/post-header";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "slug-defense";

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
          src="/illustrations/slug-defense.svg"
          alt="Illustration of the garden at dusk: a row of lettuces in a raised bed, one with a hole nibbled in its leaves, a slug crossing the soil between them, and a jar sunk into the ground as a beer trap, with copper tape along the bed rail."
          width={1200}
          height={675}
          unoptimized
          className="h-auto w-full rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground">
          The night shift: one slug mid-crossing, one lettuce already nibbled, and the trap sunk
          between them.
        </figcaption>
      </figure>

      <Prose>
        <p>
          The first confession of the season: I found it by lamplight, the big Cos lettuce with a
          crater in its heart the size of a thumbprint. Nothing else in the row was touched. That is
          how it always goes — one plant wrecked, the rest a decoy. I went out with a torch after
          dark the next evening, because ten minutes of night patrol has always told me more than
          any packet of pellets ever promised.
        </p>
        <p>
          The count, over four patrols: eleven slugs on a two-metre stretch, all within a hand&rsquo;s
          reach of the lettuce row. Nine of those eleven were within reach of the same beer trap,
          which had been sitting there doing apparently nothing since April. The lesson I keep
          re-learning is that the trap works but only along the route, not as a fence. Slugs do not
          wander; they commute, along the edges and the undersides, and the trap has to sit on the
          commuter line.
        </p>
        <p>
          The copper tape on the bed rails is the one I want to believe in most, and the one I trust
          least. It looks like it should work, it photographs beautifully, and the slugs travel
          straight over it. What has actually made the difference this spring is duller: watering in
          the morning rather than the evening, so the surface is dry by nightfall, and hoisting the
          lettuce off the soil into a tray of coarse grit that no self-respecting slug will cross.
        </p>
        <p>
          So the tally for late April stands like this: torch patrols, four; trapped, nineteen;
          lettuces lost since the grit tray went in, zero. I will take that. The slugs can have the
          margins and the beer, and I will have the middle of the bed. The deal feels unfair to both
          of us, which is probably why it holds.
        </p>
      </Prose>

      <SharePost slug={SLUG} title={post.title} />
    </article>
  );
}