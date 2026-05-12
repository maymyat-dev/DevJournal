import { Separator } from "./ui/separator";

interface Props {
    title: string;
    description?: string;
}

function heading({ title, description }: Props) {
    
  return (
      <div className="mb-6">
          <h2>{title}</h2>
          <p>{description}</p>
          <Separator/>
    </div>
  )
}

export default heading