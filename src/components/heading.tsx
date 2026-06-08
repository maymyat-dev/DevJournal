interface Props {
  title: string;
  description?: string;
}

function Heading({ title, description }: Props) {
  return (
    <div className="my-6 space-y-1.5 animate-in fade-in duration-300">

      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      
      {description && (
        <p className="text-sm text-muted-foreground/90 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export default Heading;