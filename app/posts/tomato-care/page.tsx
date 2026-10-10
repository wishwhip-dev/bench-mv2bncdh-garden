import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { PostHeader } from "@/components/post-header";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "tomato-care";

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
          src="/illustrations/tomato-care.svg"
          alt="Illustration of a bright summer garden with three tomato plants tied to bamboo canes with figure-of-eight twine, red fruit hanging among the leaves, and pinched side-shoots lying on the path."
          width={1200}
          height={675}
          unoptimized
          className="h-auto w-full rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground">
          One stem per cane, twine in a figure of eight, and the week&rsquo;s pinched shoots left on
          the path.
        </figcaption>
      </figure>

      <Prose>
        <p>
          Mid-July and the tomato row has become a piece of gardening you could teach from. Three
          cordons, three canes, one rule: every plant keeps exactly one growing point, and everything
          else coming out of a leaf joint gets pinched before it becomes an argument. The side-shoots
          snap off with a thumbnail on a dry morning, and by evening the wound has already sealed
          itself into a scab the plant seems proud of.
        </p>
        <p>
          The twine work is the part I enjoy most and explain worst. A figure of eight — looped
          round the cane, then gently round the stem — leaves the stem room to fatten without
          strangling, which a straight loop never does. I twine every Sunday and by Friday the tops
          have always out-run me. This is not a complaint. A tomato plant that has out-grown its
          gardener by Friday is the whole point of the enterprise.
        </p>
        <p>
          Feeding is comfrey tea from the black bin by the fence, tapped off on a Sunday and carried
          round in a watering can. It smells like a promise the neighbourhood wishes I would stop
          making. One can between the three plants a week until the fruit sets hard; then not at
          all, because feeding after the fruit has set is how you grow beautiful leaves and dull
          tomatoes. The leaves are not the crop.
        </p>
        <p>
          The first ripe fruit of the year is always an accident of timing — a Sungold that has
          decided to go orange three days early, hanging exactly at eye height by the path. I eat it
          standing up, before it reaches the kitchen, and write nothing down. Some arithmetic
          doesn&rsquo;t need checking.
        </p>
      </Prose>

      <SharePost slug={SLUG} title={post.title} />
    </article>
  );
}