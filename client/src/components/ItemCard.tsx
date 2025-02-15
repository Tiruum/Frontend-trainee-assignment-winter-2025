import { useNavigate } from 'react-router';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';
import Listing from '@/types/Listing';

export const ItemCard: React.FC<Listing> = ({
  id,
  type,
  imageSrc,
  title,
  description,
  location,
  details,
}) => {
  const navigate = useNavigate();
  const handleRedirect = (id: number) => {
    navigate(`/item/${id}`);
  };
  return (
    <Card
      className="relative flex flex-col gap-6 cursor-pointer overflow-hidden"
      onClick={() => handleRedirect(id)}
    >
      <div className="px-4 py-1 bg-white/50 text-muted-foreground text-sm backdrop-blur-md absolute top-0 left-0 rounded-tl-lg rounded-br-2xl">
        {type}
      </div>
      <CardHeader className="p-0">
        <img
          src={imageSrc}
          alt="ad"
          className="w-full h-48 object-cover bg-slate-300"
        />
        <CardTitle className="px-6 pt-2">{title}</CardTitle>
        <CardDescription className="px-6">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="text-muted-foreground text-sm">
        {[location, ...details].join(' ⋅ ')}
      </CardFooter>
    </Card>
  );
};
