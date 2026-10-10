import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { PostHeader } from "@/components/post-header";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "seed-saving";

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
          src="/illustrations/seed-saving.svg"
          alt="Illustration of a dry October garden: bean plants brown and rattling on their canes, dried pods open along the stems, two labelled paper envelopes and a jar of seed on the potting bench, and threshed beans scattered on the bed soil."
          width={1200}
          height={675}
          unoptimized
          className="h-auto w-full rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground">
          The drying row and the bench: envelopes labelled, the jar half full, one pod still to open.
        </figcaption>
      </figure>

      <Prose>
        <p>
          The rule I had to learn the hard way: save seed from the plant you would most want to grow
          again, not from the first plant to finish. The earliest pod on the rack is usually the
          runt&rsquo;s; the one that bulks up late on the best stem is the parent. This year that
          meant the beans from the middle cane — never diseased, never checked, pods filled right to
          the string — and not the eager ones at the end of the row that went over early.
        </p>
        <p>
          Dryness is the whole craft. Pods come off the plant when the rattle can be heard across
          the bed, and then come indoors for another fortnight on a windowsill because October air
          still carries damp the seed will remember. Twice I have bagged pods that were not quite
          done and opened the envelope in spring to find exactly the grey-furred disappointment you
          would expect. The windowsill fortnight is not a stage direction. It is the difference
          between seed and hay.
        </p>
        <p>
          Everything gets labelled twice — envelope and jar — because one label is a wish and two
          are a system. Bean, variety, the year, and the plant it came from. In five years I have
          never once regretted writing too much on an envelope, and I have twice been defeated by
          the mysteries inside envelopes that said only &ldquo;beans&rdquo;.
        </p>
        <p>
          The last evening of it, I tipped the threshed seed across the tray and kept back the flat,
          marked, misshapen ones for the kitchen pot. What went into the envelope is the garden&rsquo;s
          opinion of itself, edited down to a cupful. It is the only part of the year&rsquo;s work
          that will still matter in March, and the cheapest.
        </p>
      </Prose>

      <SharePost slug={SLUG} title={post.title} />
    </article>
  );
}