"use client";

import { useRef, useState } from "react";
import { Check, Copy, ExternalLink, Mail, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * The share panel every post ends with. A client component because it talks to the clipboard and
 * reads the page's own address; everything else on a post page stays a server component.
 *
 * The post's absolute URL only exists in the browser, so it is computed inside event handlers and
 * inside the dialog's content — the content only mounts once the reader opens the dialog, which
 * keeps the server-rendered HTML and the first client render identical.
 */
export function SharePost({ slug, title }: Readonly<{ slug: string; title: string }>) {
  const [copied, setCopied] = useState(false);
  // The share dialog is controlled so its content — which reads the page's address — only mounts
  // once the reader has opened it, after which `window` exists.
  const [shareOpen, setShareOpen] = useState(false);
  // Set when copying fails or the clipboard API is missing: the fallback shows the full URL in a
  // selectable field rather than pretending the copy worked. Never an empty catch.
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const [fallbackNote, setFallbackNote] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function absoluteUrl(): string {
    return `${window.location.origin}/posts/${slug}`;
  }

  async function copyLink() {
    const url = absoluteUrl();
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("This browser has no clipboard to copy to.");
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setFallbackUrl(null);
      setFallbackNote("");
      window.setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      setCopied(false);
      setFallbackUrl(url);
      setFallbackNote(
        error instanceof Error
          ? `${error.message} Copy the link below by hand.`
          : "Copying did not work — copy the link below by hand.",
      );
    }
  }

  function selectFallback() {
    inputRef.current?.select();
  }

  return (
    <footer className="mt-2 border-t border-border pt-6">
      <p className="text-sm text-muted-foreground">Read to the end? Pass it on.</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={copyLink} className="min-h-9">
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {copied ? "Copied" : "Copy link"}
        </Button>

        <Dialog open={shareOpen} onOpenChange={setShareOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="min-h-9">
              <Share2 aria-hidden="true" />
              Share…
            </Button>
          </DialogTrigger>
          {shareOpen && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share this post</DialogTitle>
                <DialogDescription>
                  Each link carries the post&rsquo;s title and address, ready filled in.
                </DialogDescription>
              </DialogHeader>
              <ul className="flex flex-col gap-2">
                {shareLinks(absoluteUrl(), title).map(({ name, href, icon: Icon }) => (
                  <li key={name}>
                    <Button variant="secondary" asChild className="w-full justify-start">
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {Icon ? <Icon aria-hidden="true" /> : <ExternalLink aria-hidden="true" />}
                        Share on {name}
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground">
                The links open the service&rsquo;s own share window in a new tab; nothing is sent
                anywhere until you press send there.
              </p>
            </DialogContent>
          )}
        </Dialog>
      </div>

      {/* Status line, announced to screen readers as it changes. */}
      <p aria-live="polite" className="mt-2 min-h-5 text-sm text-primary">
        {copied ? "Copied — the post's link is on your clipboard." : ""}
      </p>

      {fallbackUrl && (
        <div className="mt-1">
          <div role="alert" className="text-sm text-muted-foreground">
            {fallbackNote}
          </div>
          <Label htmlFor="share-url" className="mt-2 block text-sm">
            Post link
          </Label>
          <Input
            ref={inputRef}
            id="share-url"
            readOnly
            value={fallbackUrl}
            onFocus={selectFallback}
            onClick={selectFallback}
            className="mt-1.5"
          />
        </div>
      )}
    </footer>
  );
}

type ShareLink = { name: string; href: string; icon: typeof Mail | null };

/**
 * The three share targets, with the title and URL passed through `encodeURIComponent` so an
 * apostrophe in a title or an `&` in a query string survives the trip. Called only from the
 * opened dialog's render, where `window` is real.
 */
function shareLinks(url: string, title: string): ShareLink[] {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  return [
    {
      name: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
    },
    {
      name: "X",
      icon: null,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "Bluesky",
      icon: null,
      href: `https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} — ${url}`)}`,
    },
  ];
}