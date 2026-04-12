interface TensionPointsProps {
  city: string;
}

export default function TensionPoints({ city }: TensionPointsProps) {
  const statements = [
    {
      text: `Right now, somewhere in ${city}, the best night is already happening. Most people will never find it.`,
    },
    {
      text: "The group chat has been going for 40 minutes. Nobody has made a decision. Sound familiar?",
    },
    {
      text: `The people who know ${city} best are not just locals. They are people with better information.`,
    },
  ];

  return (
    <section className="w-full max-w-2xl mx-auto px-4 py-20 md:py-28 space-y-12">
      {statements.map((s, i) => (
        <p
          key={i}
          className="font-display text-xl md:text-2xl leading-relaxed text-brand-text-secondary text-center"
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          {s.text}
        </p>
      ))}
    </section>
  );
}
