function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-16 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-purple-400">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-lg leading-relaxed text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;