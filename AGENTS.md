# Working in this project

A blog. Each post is a route: `/posts/<slug>`, written as ordinary React.

Most tasks on this repository add **one post** and change nothing else. Read this instead of
exploring. It is the whole setup.

## What this project is for

A blog of interactive explainer posts, where each task usually adds one post.

Good for: explainers with charts and controls; tutorials and walkthroughs; essays with live demos; visual or 3D explanations.

Not built for: saving anything between visits; accounts or sign-in; calling outside services or APIs; calling an AI model.

A request that needs one of these is outside what this project can deliver as it stands: plan the closest thing it can, and say plainly what was left out.

## Stack

Next.js App Router · TypeScript · Tailwind CSS · shadcn/ui · 14 shadcn/ui components pre-installed (dialog, select, table, card, form inputs, tabs, alert) · 11 more shadcn/ui components (accordion, collapsible, popover, progress, radio group, scroll area, slider, switch, toggle, toggle group, tooltip) · Recharts (themed chart components, already wired to the palette) · Motion (animation, imported as motion/react) · Canvas 2D and WebGL through CanvasStage · three.js (WebGL 2, software-rendered in the verification browser) · no WebGPU. Posts are files on disk; there is no CMS.

## Layout

```
app/identity.ts              the blog's name, description and colour, set when it was created. Change them only when asked.
app/layout.tsx               site shell — header, footer, metadata template read from identity.ts.
app/page.tsx                 the index. GENERATED from the posts on disk. Do not hand-edit.
app/globals.css              tokens and the `.prose` typography scope.
app/posts/<slug>/page.tsx    one post.
app/posts/<slug>/meta.json   its title, blurb, date and tags.
components/<slug>/           that post's own components. Create it; never import another post's.
lib/<slug>/                  that post's own data and pure logic. Create it the same way.
components/prose.tsx         <Prose> — the typography scope for body copy.
components/post-header.tsx   <PostHeader> — title, date, tags. Every post opens with one.
lib/posts.ts                 reads app/posts/*/meta.json at build time. The index's only source.
scripts/check-density.mjs    npm test and prebuild: fails a post that is prose where panels belong.
app/providers.tsx            "use client" — composed from this project's modules. Already wired into layout.
types/webgpu.d.ts            WebGPU types, for type-checking only. Nothing here may require WebGPU.
template.capabilities.json   what this template ships, declared for the planner. Keep it accurate.
components/ui/               the shadcn components, already themed. See docs/components.md.
lib/utils.ts                 cn() — the className merge helper every shadcn component expects.
components.json              shadcn config: new-york, neutral, rsc, aliases @/components and @/lib.
components/ui/chart.tsx      the Recharts wrapper. Import from it; do not edit it.
components/canvas-stage.tsx  the canvas host. Pass it a renderer; do not hand-roll a canvas.
lib/graphics.ts              what the current browser can draw with (2D, WebGL). No WebGPU.
```

`@/*` resolves to the project root.

The blog's name, description and colour live in `app/identity.ts`; change them there, never in
`layout.tsx`, and only when the task asks. The title, the icons and the share image read it.

## What this project ships

Use these. Do not reinstall them, do not add a second library that does the same job, and do not
hand-roll a slider or a tab strip — they are here and they match the site's styling.

**26 shadcn/ui components in `components/ui/`, already themed:**

```
accordion  alert  badge  button  card  chart  checkbox  collapsible  dialog  input
label  popover  progress  radio-group  scroll-area  select  separator  skeleton  slider
switch  table  tabs  textarea  toggle  toggle-group  tooltip
```

"Which component for which job", under "The shape of a post", maps these to what a reader does.
Anything else from the registry: `npx --yes shadcn@latest add --yes <name>`. Both `--yes` flags are
required — without them the command waits for a prompt nobody can answer and times out.

Each of these is installed and wired up. **Read its document before building on it**: it has the
worked code, and the one setting that silently breaks a panel in verification.

- **Component kit.** 14 shadcn/ui components, the design tokens they need, and the cn() helper. Read `docs/components.md` before building on it.
- **Charts.** Recharts, wrapped and themed. Series colours follow the project's palette. Read `docs/charts.md` before building on it.
- **Animation.** Motion for entrances, transitions and list changes. Import from motion/react. Read `docs/motion.md` before building on it.
- **Canvas and 3D.** A canvas host (2D by default, WebGL opt-in with a 2D fallback) that handles sizing, DPR, the frame loop, hidden tabs, reduced motion and failure, plus three.js. Read `docs/graphics.md` before building on it.
- **Visit counts.** Counts how many times the app is opened, for its owner. Already mounted; nothing about visitors is kept. Read `docs/visits.md` before building on it.
- **Footer.** "Made with WishWhip · Report", in the layout. Keep it. Read `docs/attribution.md` before building on it.

Icons come from `lucide-react`.

## Drawing

**The browser that checks the site runs headless with no GPU.** WebGL 1 and WebGL 2 work in
software, slowly — a few thousand triangles, not a million — and `navigator.gpu` finds no
adapter and every read of it is recorded, so nothing on a page may require or read WebGPU. If *What this project ships* lists Canvas and 3D, every
canvas goes in `<CanvasStage>`, three.js needs a WebGL mode, and the stage's `fallback` must say
what the drawing shows (a still, the numbers, or the conclusion in a sentence).

## Read these four files. Do not read other posts.

Everything a post task needs is in this file and four others: `lib/posts.ts` (how the index finds
posts, and the `meta.json` fields it reads), `components/prose.tsx`, `components/post-header.tsx`
and `app/globals.css` (the tokens, and what `.prose` styles). `components/canvas-stage.tsx` is a
fifth, worth opening only for a canvas panel's exact types. **Other posts share no code with
yours.** Do not open them — not for the shape (it is below), not for style. Reading a neighbour
costs thousands of tokens and teaches nothing true of your post.

## What a post owns

A post is self-contained, and owns exactly three places, all named for its slug:

```
app/posts/<slug>/     page.tsx and meta.json — the route
components/<slug>/    its own components: the lab, the panels, the diagram
lib/<slug>/           its own data and pure logic: the model, the constants
```

Create the second and third when the post needs them; most do. The rules for a post task:

- **One post per task.** A task adds or edits exactly one post, and writes only inside its three
  directories. Not another post's — do not open, restructure, retitle, re-date or "improve" them,
  and never import from them — and not the shared files: `prose.tsx`, `post-header.tsx`,
  `canvas-stage.tsx`, `components/ui/`, `lib/posts.ts`. A post that seems to need a shared change
  does not: build it inside its own directories.
- **Do not hand-edit `app/page.tsx`.** It is the generated index. If a post is not appearing, the
  cause is its `meta.json`, not the index.
- **Do not change `app/layout.tsx` or the site header** unless the task actually asks for it; its
  links already meet the tap size.
- Write the post the task asks for, at the length it deserves. A post with one thin paragraph
  under each heading is not a finished post.

## The shape of a post

A post is **an instrument the reader operates**, with prose between the panels — not an essay with
widgets dropped into it. When a task names a topic and says nothing about form, this is the form.

Measured on a finished post that read as a blog article: 29 paragraphs against 5 controls, and 19
of the 24 installed components never imported. That is the failure to avoid, and it happens by
defaulting to a paragraph whenever a panel would have been more work.

**The rule of thumb: no more than two consecutive paragraphs without something to operate.** If a
third is needed, the idea in it is usually a control, a readout or a table that has not been built
yet.

- **Lead with the model.** The thing the reader manipulates is the centre of the post and appears
  early — above the first long passage of prose, not after it.
- **Anything the reader could set, they should set.** A number the prose states is a number the
  prose could instead let them change. Assumptions, rates, counts, thresholds and starting
  conditions are all controls.
- **Every figure on screen is computed.** Never type a number into prose that the model produces —
  interpolate it from the same calculation the panels use. A hardcoded "200 J" beside a panel
  reading 350 J is the single most common defect in these posts.
- **Let the claim fall out of the mechanism.** If the argument is that X produces Y, the reader
  should produce Y by moving X, not read that they would.
- **One chart and one slider is under-built.** A second view of the same model, a breakdown table
  or a before/after comparison is what makes an idea explorable.

### Plan the media before you write any of it

Your first task item is a media plan: one line per section, naming what the reader does there and
what renders it. Put it in your task list so it survives compaction, then build against it. This
is what stops a post defaulting to paragraphs — the medium gets chosen once, deliberately, rather
than implicitly at every heading.

```
section            reader does                    medium
prediction         picks one of three             RadioGroup + Card
the machine        steps through 3 stages         SVG diagram + Button, Motion
one cycle          plays / steps / resets         SVG + Button, live Badge readouts
performance        drags a ratio                  Slider + Table breakdown + ChartContainer
boundary           flips inside / outdoors        ToggleGroup + the same SVG, re-lit
```

One line per section does not mean one control per section. A section usually needs several — the
control that sets the input, the readouts that answer it, and often a second view of the same
result. Five sections with one control each is a plan for an essay with five widgets in it, which
is the exact thing this shape exists to avoid.

Prefer the medium that fits the information, not the one that is quickest: quantities over a range
are a chart, several related figures are a table, one computed figure is a `Badge`, and anything
the reader could vary is a control rather than a sentence. If a section's medium is "paragraph",
say why the thing cannot be operated — that is the question worth asking before writing it.

**Pick the drawing technology deliberately too.** SVG is right for a labelled schematic with a
handful of moving parts, and stays crisp and accessible. Reach for `<CanvasStage>` and three.js
when the visual is genuinely spatial or continuous, or when there are more elements than the DOM
should hold — a field, a flow, thousands of particles, anything with depth or lighting. A diagram
that looks flat and diagrammatic when the subject is physical is a sign the wrong one was chosen.

### Which component for which job

Using six of the components listed above is the symptom of a post that became an essay. Reach for
the one that fits rather than writing a sentence, and never hand-roll one of these.

| The reader needs to | Use |
| --- | --- |
| set a value on a range | `Slider`, or `Input` when the exact number matters |
| pick one of two or three | `RadioGroup`, `ToggleGroup` |
| switch a condition on or off | `Switch`, `Checkbox` |
| pick one of many | `Select` |
| compare two framings of the same model | `Tabs` |
| see a figure the model computed | `Badge` for one, `Table` for a breakdown |
| see a proportion at a glance | `Progress` |
| see the shape of a relationship | `ChartContainer` (Recharts) — `docs/charts.md` |
| read a definition without losing their place | `Tooltip`, `Popover` |
| go deeper, optionally | `Accordion`, `Collapsible` |
| be warned about a caveat or assumption | `Alert` |
| focus on one thing | `Dialog` |
| scan a long list | `ScrollArea` |

Panels themselves go in `Card`, which is what makes a post look built rather than typed. Use
`Separator` between sections of a panel, and `Skeleton` only where something genuinely loads.

## Adding a post

Create **one directory** under `app/posts/` holding exactly two files, `meta.json` and `page.tsx`.
The post's components and logic go in `components/<slug>/` and `lib/<slug>/`, not here.

`app/posts/<slug>/meta.json`:

```json
{
  "title": "The post's title",
  "blurb": "One sentence, shown on the index.",
  "published": "2026-09-11",
  "tags": ["optional", "tags"]
}
```

`published` must be `YYYY-MM-DD` — the index sorts on it as a string, newest first, and an
undated post sorts last.

`app/posts/<slug>/page.tsx` — the whole skeleton, so you never need to read another post:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { PostHeader } from "@/components/post-header";
import { getPost } from "@/lib/posts";

const SLUG = "your-slug";

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
      <Prose><p>A short lead — what the reader is about to operate.</p></Prose>

      {/* The instrument comes first and is the spine of the post. It is a client component of
          its own; the page stays a server component. */}
      <YourLab />

      <Prose><p>One or two paragraphs on what just happened, then the next panel.</p></Prose>
      <YourSecondView />
    </article>
  );
}
```

The slug is the URL, and it must match `SLUG` and the directory name. Lowercase,
hyphen-separated, no spaces.

**Nothing else needs to change.** There is no list of posts to append to — `lib/posts.ts` reads
the directory at build time, which is deliberate: a central registry would be one file that every
post has to edit, and the one file two posts written at the same time would collide on.

## Conventions

**Server components by default.** A post is a server component. Add `"use client"` only to a
child component that needs state, effects or browser APIs — an interactive demo inside a post
goes in its own client component, not by converting the whole post.

**Typography is opt-in.** `app/globals.css` styles nothing by bare element name; body copy is
styled because `<Prose>` wraps it. Do not add bare `h2 {}` or `p {}` rules — in a site with a
page per post they reach every post ever written.

**Tailwind v4 has no `tailwind.config.js`.** Configuration lives in CSS: `app/globals.css` maps
the token set through `@theme inline`, which is what makes `bg-background` exist at all.

**The site is dark, with one palette.** The dark values sit directly on `:root`; there is no
`.dark` class and no light theme. Style with tokens (`bg-card`, `text-muted-foreground`,
`border-border`, `bg-primary`), never with `dark:` variants — they never activate here, and a
`dark:`-styled component renders invisibly against the background.

**`npm run lint` is part of your self-check, and one rule fails most runs.**
`react-hooks/set-state-in-effect`: never call a state setter directly in a `useEffect` body.
Compute derived values during render; setting state inside a callback the effect subscribes to — an
event listener, a timer, a promise's `.then` — is allowed. An animation draws to a canvas or a ref
each frame, never through state.

**Hydration.** Every post is server-rendered, and the HTML must match the first client render.
Never read the current time, `Math.random()`, the visitor's locale or `window` during render; seed
randomness with a constant, or render a placeholder until
`useSyncExternalStore(() => () => {}, () => true, () => false)` reports that hydration is done.

**Images** go in `public/` and are referenced as `/name.png`. Use `next/image`.

**Dependencies.** `npm install <pkg>` works — there is a real shell with network access.

## How this is checked

`scripts/check-density.mjs` runs as `npm test` and again before every `npm run build`, so your own
build check hits it too. It fails when a post has more than 1.5 paragraphs per thing the reader can
operate, counting the post's route and its `components/<slug>/` directory. It is the line between
the posts this project accepted and the one it rejected as "too like a text blog". If it fails, the fix is not to delete paragraphs: it is to turn what a paragraph asserts into
something the reader sets. A post that is genuinely meant to be mostly writing opts out with
`"prose": true` in its `meta.json`, which is a decision a task makes on purpose and shows in review.

When you finish, the supervisor runs `npm install`, `npm test --if-present`, `npm run lint
--if-present` and `npm run build` itself, then opens the built site in a headless browser
and uses it. You cannot run that browser and should not try to imitate it; you pass it by meeting
these requirements:

- **Every route renders visible content and throws nothing** — no uncaught exceptions, console
  errors or failed requests. A post that renders nothing fails even when `npm run build` passed.
- **Every control in a post works when pressed**: a button, slider or toggle the reader can operate
  changes what the post shows and never throws.
  Anything tappable is at least 32px tall and wide at phone width, nav links included; the
  ui-kit defaults already are, so only custom controls need a size.
- **Nothing depends on a GPU** (see "Drawing"): anything behind a context that fails degrades to
  something visible rather than a blank canvas.
- **Every page renders when opened directly** at its own static URL, with no prior navigation. Each
  page is a static route of its own, never only a dynamic route such as `/posts/[slug]`.
- **Nothing is saved between visits**, because this project has nowhere to save it. Something kept
  for this session is fine if it is labelled as one; a list, score or setting offered as saved that
  empties on reload is a lie to the person using the app.
- **The page title is the app's name from `app/identity.ts`**; the check reads it and a placeholder
  title counts against you. Keep the name and description there true to what the app became. Rewrite
  the description in `app/identity.ts` as what the app is, never the request that asked for it.
- **The check records any read of `navigator.gpu`**, and WebGPU access counts against you unless the
  goal explicitly asks for WebGPU.
- **Destructive actions say so in their label**: Delete, Remove, Clear, Reset, Discard, Sign out,
  Log out, Export, Download, Import, Undo. These are never pressed during the check, so none of them
  can be the only way into what a page does — and a control that hides one behind a harmless label
  is a lie to the person using the app. Import and Export mean moving the app's whole data set in or
  out; a control that loads a file as content — a photo, a document, a JSON file to open — is
  "Choose file", "Add photo" or "Load JSON", is pressed like any other control, and is never
  labelled Import.

## Do not

- **Do not scaffold a new application over this one.** No `create-next-app`.
- **Do not run a dev server.** `next dev` / `npm run dev` are blocked; use `npm run build`.
- **Do not install Playwright, Puppeteer or Selenium.** Browser automation is blocked.
- **Do not delete this file.** It is the briefing for every later task on this repository.
