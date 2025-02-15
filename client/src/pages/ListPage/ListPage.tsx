import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ItemsList } from '@/components/ItemsList';
import { Label } from '@/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';
import { transformListings } from '@/helpers';
import Listing from '@/types/Listing';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

/**
 * Страница списка объявлений
 * Включает фильтрацию по имени, типу и деталям
 */
const ListPage = () => {
  /** Состояние списка объявлений */
  const [ads, setAds] = useState<Listing[]>([]);
  const navigate = useNavigate();

  /**
   * Загрузка списка объявлений при монтировании
   */
  useEffect(() => {
    axios
      .get('http://localhost:3000/items')
      .then(response => {
        setAds(transformListings(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [detailedSearchTerm, setDetailedSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('');

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchChangeType = (type: string) => {
    setSearchType(type);
  };

  const handleDetailedSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailedSearchTerm(e.target.value);
  };

  /**
   * Фильтрация объявлений по всем критериям поиска
   * Учитывает название, тип и детали объявления
   */
  const filteredAds = ads.filter((ad: Listing) => {
    const titleMatch = ad.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const typeMatch =
      searchType && searchType !== 'Все' ? ad.type === searchType : true;
    const detailsMatch = detailedSearchTerm
      ? ad.details
          .join(' ')
          .toLowerCase()
          .includes(detailedSearchTerm.toLowerCase())
      : true;
    return titleMatch && typeMatch && detailsMatch;
  });

  return (
    <div>
      <div className="flex gap-6">
        <div className="text-4xl mb-6 uppercase font-bold">
          Список объявлений
        </div>
        <Button onClick={() => navigate('/form')}>Добавить объявление</Button>
      </div>
      <div className="flex w-full max-w-xl items-center space-x-2 mb-4">
        <div className="flex flex-col gap-2 w-full">
          <Label>Поиск по имени</Label>
          <Input
            type="text"
            placeholder="Поиск по имени"
            onChange={e => handleFilter(e)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label>Поиск по типу</Label>
          <Select onValueChange={type => handleSearchChangeType(type)}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Все">Все</SelectItem>
              <SelectItem value="Недвижимость">Недвижимость</SelectItem>
              <SelectItem value="Услуги">Услуги</SelectItem>
              <SelectItem value="Авто">Авто</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {searchType && (
          <div className="flex flex-col gap-2 w-full">
            <Label>Поиск по деталям</Label>
            <Input onChange={e => handleDetailedSearch(e)} />
          </div>
        )}
      </div>

      <ItemsList data={filteredAds} />
    </div>
  );
};
export default ListPage;
