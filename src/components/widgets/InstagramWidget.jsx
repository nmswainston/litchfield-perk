export default function InstagramWidget({ cardClassName = "" }) {
  return (
    <div className={`w-full ${cardClassName}`}>
      <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-xl ring-1 ring-brand-border bg-brand-background">
        <iframe
          src="https://snapwidget.com/embed/1115439"
          className="snapwidget-widget block w-full border-0 overflow-hidden
                     h-[clamp(210px,36vh,270px)]
                     sm:h-[clamp(300px,42vh,380px)]
                     md:h-[clamp(380px,40vh,460px)]
                     lg:h-[640px]
                     xl:h-[720px]"
          frameBorder="0"
          scrolling="no"
          loading="lazy"
          title="Posts from Instagram"
        />
      </div>

      <p className="mt-3 text-center text-sm text-brand-text-muted">
        Having trouble viewing the feed?{" "}
        <a
          href="https://www.instagram.com/litchfieldperk/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-brand-600"
        >
          View on Instagram
        </a>
      </p>
    </div>
  );
}
