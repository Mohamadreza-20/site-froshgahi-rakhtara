const RESPONSIVE_WIDTHS = [320, 640, 960, 1280];
const RESPONSIVE_FORMAT = "avif";

function deriveResponsiveSources(src) {
  if (!src || !src.startsWith("/images/") || !/\.(svg|png|jpe?g|webp|avif)$/i.test(src)) return null;
  const match = src.match(/^(.*?)(\.[^.]+)$/);
  if (!match) return null;
  const [, rawBase, extension] = match;
  const base = rawBase.replace(/-(?:320|640|960|1280)$/i, "");
  const isSvg = extension.slice(1).toLowerCase() === "svg";
  const srcSet = RESPONSIVE_WIDTHS.map((width) => `${base}-${width}.avif ${width}w`).join(", ");

  return {
    sources: isSvg ? [{ type: "image/avif", srcSet }] : [{ type: `image/${RESPONSIVE_FORMAT}`, srcSet }],
    fallbackSrcSet: srcSet,
  };
}

export default function OptimizedImage({
  src,
  alt = "",
  width = 640,
  height = 480,
  priority = false,
  sizes = "100vw",
  srcSet,
  responsive = true,
  loading,
  decoding,
  ...props
}) {
  const derived = responsive && !srcSet ? deriveResponsiveSources(src) : null;
  const effectiveSrcSet = srcSet || derived?.fallbackSrcSet;
  const effectiveLoading = loading || (priority ? "eager" : "lazy");
  const effectiveDecoding = decoding || "async";

  return (
    <picture>
      {derived?.sources.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
      ))}
      <img
        src={src}
        srcSet={effectiveSrcSet}
        sizes={effectiveSrcSet ? sizes : undefined}
        width={width}
        height={height}
        loading={effectiveLoading}
        fetchPriority={priority ? "high" : "auto"}
        decoding={effectiveDecoding}
        alt={alt}
        {...props}
      />
    </picture>
  );
}
