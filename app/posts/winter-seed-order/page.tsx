import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { PostHeader } from "@/components/post-header";
import { SharePost } from "@/components/share-post";
import { getPost } from "@/lib/posts";

const SLUG = "winter-seed-order";

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
          src="/illustrations/winter-seed-order.svg"
          alt="Illustration of a January evening seen from inside: through a frost-framed window, snow lies on two raised beds and a bare apple tree while snow falls past a moon; on the table in front of the glass, seed catalogues lie open and stacked, a pencil and a circled order list rest beside a steaming mug of tea."
          width={1200}
          height={675}
          unoptimized
          className="h-auto w-full rounded-lg border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground">
          The kitchen window after the third catalogue: snow on the beds, order list circled, tea on
          the go.
        </figcaption>
      </figure>

      <Prose>
        <p>
          The year turns on the third Sunday of January, when the catalogues come out of the drawer
          and the tea gets a proper pour. Outside, the beds are under snow and doing whatever beds
          do in snow; inside, the order form is the first real decision of the growing year. It is
          the only gardening of the season that happens in a chair, and I have never once done it in
          under two hours.
        </p>
        <p>
          Rule one is to count the envelopes before looking at a single page. Last year&rsquo;s
          saved bean stood at just under half a cup — two full sowings, probably three — and there
          is a packet of leeks in the tin that expires before the leeks do. Every year this audit
          founds a small dynasty of good sense, and every year the paper clippings at the back of
          the catalogue still nearly found a second one.
        </p>
        <p>
          Rule two is that spacing beats variety. Two winters ago the order form had eleven tomato
          cultivars on it, because at Christmas all eleven sounded like different people at a party.
          Each one is really the same person wearing hats. What changes the eating is the spacing,
          the compost and the August sun, and one example with room to spread beats three in single
          file every time. Rule three is that anything ordered in February arrives a week late, and
          the calendar does not accept requests.
        </p>
        <p>
          The form went in the last post bay at dusk with the pencil tucked into the fold, because
          the pencil has one job and knows it. Then the drawer closed and the snow kept falling on
          the fleece outside, and the whole year sat in the room in miniature: counted, circled,
          and on its way. There are worse things to carry into spring than an envelope somebody
          else will fill while your beds sleep.
        </p>
      </Prose>

      <SharePost slug={SLUG} title={post.title} />
    </article>
  );
}