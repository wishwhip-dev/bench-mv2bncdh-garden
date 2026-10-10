import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { PostHeader } from "@/components/post-header";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "watering-heat-spell";

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
          src="/illustrations/watering-heat-spell.svg"
          alt="Illustration of a hot garden under a big pale sun: a large watering can mid-pour over a row of beans standing up dark and fresh, while a second row on the left droops in the heat and cracks split the dry soil."
          width={1200}
          height={675}
          unoptimized
          className="h-auto w-full rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground">
          The whole spell in one picture: drooping on the left, poured-on and upright on the right.
        </figcaption>
      </figure>

      <Prose>
        <p>
          Two weeks over thirty degrees and the garden sorts itself into ranks. The beans, first to
          wilt, first to forgive: half an hour after a proper evening can they are standing up as if
          the whole drought had been a rumour. The leeks never moved at all. And the dahlias, which I
          planted in June against my own better judgement and every local rule, folded on day four and
          did not file for a comeback. I stopped pretending about them on day nine.
        </p>
        <p>
          The round reorganised itself around one discovery: what the beds wanted was not more water
          but fewer, deeper drinks. A dash every evening had been keeping the top inch damp and the
          roots lazy. A long soak at dawn — can left running at the base of each row until the soil
          darkens well past the first knuckle — sent everything down looking for its own water, and
          by the second day of that the plants stopped sulking between feeds.
        </p>
        <p>
          The can is heavy and the arithmetic is honest: one full can per metre of bed, eleven cans
          a round, forty minutes of pouring before the day gets too hot to be out in it. There is no
          way to make that romantic. It is the closest the garden comes to a shift pattern, and the
          only thing I have ever done here that resembles discipline.
        </p>
        <p>
          What kept the beds through it was February&rsquo;s compost, laid thick and forgotten about.
          The mulched half of the bean row went four days between drinks; the bare half went two and
          showed it. Drought does not treat a garden as one thing. It treats every square metre
          according to what it was wearing in winter, and by August there is no arguing with the
          evidence.
        </p>
      </Prose>

      <SharePost slug={SLUG} title={post.title} />
    </article>
  );
}