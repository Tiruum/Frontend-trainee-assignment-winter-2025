import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/AlertDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/Card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/Carousel';
import { transformListings } from '@/helpers';
import { HeartIcon, StarIcon } from '@/icons';
import { cn } from '@/lib/utils';
import Listing from '@/types/Listing';
import axios from 'axios';
import { ArrowLeftIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

const ItemPage = () => {
  const params = useParams();
  const [ad, setAd] = useState<Listing[] | null>(null);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/${params.id}`)
      .then(response => {
        setAd(transformListings([response.data]));
      })
      .catch(error => {
        console.log(error);
      });
  }, [params.id]);

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/list');
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/items/${params.id}`)
      .then(() => {
        toast('Объявление было удалено');
        navigate('/list');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChange = () => {
    navigate(`/form/${params.id}`);
  };

  const [isFav, setIsFav] = useState(false);

  if (!ad)
    return (
      <div>
        Не найдено
        <Button variant={'ghost'} onClick={handleGoBack}>
          Вернуться назад
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant={'ghost'} onClick={handleGoBack}>
          <ArrowLeftIcon />
        </Button>
        <h1 className="text-4xl font-semibold">{ad[0].title}</h1>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-8">
        <div className="col-span-2">
          <Carousel>
            <CarouselContent>
              {[ad[0].imageSrc, ad[0].imageSrc, ad[0].imageSrc].map(
                (imageSrc, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={imageSrc}
                      alt={`ad ${ad[0].id}`}
                      className="w-full aspect-video object-cover rounded-lg bg-slate-300"
                    />
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex gap-1 mt-4">
            {[ad[0].location, ...ad[0].details].map((detail, index) => (
              <Badge key={`detail_${index}`}>{detail}</Badge>
            ))}
          </div>
          <div>{ad[0].description}</div>
        </div>

        <div className="relative">
          <div className="sticky top-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex justify-between items-center">
                  {ad[0].price
                    ? `${ad[0].price.toLocaleString('ru-RU')}₽`
                    : 'Цена не указана'}
                  <HeartIcon
                    onClick={() => setIsFav(!isFav)}
                    className={cn(
                      'w-8 h-8 cursor-pointer transition-all opacity-40',
                      isFav && 'text-rose-500 opacity-100'
                    )}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>ИП</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    Имя продавца
                    <div className="flex gap-0.5">
                      <StarIcon className="w-4 h-4 text-orange-500" />
                      <StarIcon className="w-4 h-4 text-orange-500" />
                      <StarIcon className="w-4 h-4 text-orange-500" />
                      <StarIcon className="w-4 h-4 text-orange-500" />
                      <StarIcon className="w-4 h-4 opacity-40" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                {/* Если объявление создавал другой пользователь */}
                <Button className="w-full">Написать продавцу</Button>
                <Button variant={'secondary'} className="w-full">
                  Показать телефон
                </Button>
                {/* Если объявление создавал текущий пользователь */}
                <Button className="w-full bg-orange-400" onClick={handleChange}>
                  Изменить
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild className="w-full">
                    <Button variant={'destructive'} className="w-full">
                      Удалить
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Это действие нельзя будет отменить
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90"
                        onClick={handleDelete}
                      >
                        Удалить
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemPage;
