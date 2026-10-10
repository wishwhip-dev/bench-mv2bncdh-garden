import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/prose";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { identity } from "../identity";

export const metadata: Metadata = {
  title: "About",
  description: `Who writes ${identity.name}, what the garden is, and how often the posts come.`,
};

/** What the seven beds grow in a normal year, in the order the season meets them. */
const CROPS = [
  { crop: "Broad beans", sown: "February", harvest: "June–July", note: "Sown into cold soil and unbothered by frost; the stubborn opener of the year." },
  { crop: "Parsnips", sown: "March", harvest: "October–January", note: "Freshly collected seed every year; it will not germinate after one winter." },
  { crop: "Lettuce", sown: "April–August", harvest: "May–October", note: "Grown in grit trays after the slug year taught its lesson." },
  { crop: "Runner beans", sown: "May", harvest: "July–October", note: "Half eaten, half left on the cane to dry for next year's seed." },
  { crop: "Tomatoes (Sungold, Marmande)", sown: "March indoors", harvest: "July–September", note: "Three cordons, one growing point each, comfrey tea on Sundays." },
  { crop: "Leeks", sown: "April", harvest: "November–February", note: "The crop that carries the winter and never needs pleading with." },
  { crop: "Garlic", sown: "November", harvest: "July", note: "Under fleece until January; eleven cloves went in this year." },
  { crop: "Carrots", sown: "April, under fleece", harvest: "August–December", note: "Sown late on purpose against carrot fly; sweeter after the first frosts." },
];

export default function AboutPage() {
  return (
    <article className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          About {identity.name}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{identity.description}</p>
      </header>

      <Prose>
        <p>
          I write the blog, and I garden it too. I have been growing vegetables in the same small
          town garden for eleven years, badly for the first three and with a notebook ever since.
          Nothing here is expert advice; it is a diary of what a real back garden does across a
          year, written within a few days of whatever happened.
        </p>
        <p>
          The garden itself is a rectangle behind a Victorian terrace: seven raised beds in two
          long ranks, a compost corner, a black comfrey bin by the fence and one tired apple tree
          that everything else is measured against. The beds are numbered, the order of them turns
          around each year, and every one of them has opinions about where it gets the sun in July
          that I have finally learned to respect.
        </p>
        <p>
          Posts appear roughly fortnightly from the first sowings in March until the beds are put
          to bed in November, and then thin out to whatever winter actually involves — mostly the
          seed order, some cockles of optimism, and the quiet accounting that makes next March
          easier. Each post is a short diary entry with a picture: what the season did, what I got
          wrong, and what worked well enough to repeat.
        </p>
        <p>
          If you want the current season from the beginning, the{" "}
          <Link href="/">index page</Link> lists every post of the growing year, newest first.
        </p>
      </Prose>

      <section aria-labelledby="grown-heading">
        <h2 id="grown-heading" className="text-xl font-medium tracking-tight">
          What the beds grow
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The regular cast, in the order the season meets them.
        </p>
        <div className="mt-3 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Sown</TableHead>
                <TableHead>Harvested</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CROPS.map((row) => (
                <TableRow key={row.crop}>
                  <TableCell className="font-medium">{row.crop}</TableCell>
                  <TableCell>{row.sown}</TableCell>
                  <TableCell>{row.harvest}</TableCell>
                  <TableCell className="text-muted-foreground">{row.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </article>
  );
}