import Auto from '@/types/Auto';
import Item from '@/types/Item';
import Listing from '@/types/Listing';
import Service from '@/types/Service';

const transformListings = (data: (Auto | Item | Service)[]): Listing[] => {
  return data.map(item => {
    if ('brand' in item) {
      return {
        id: item.id,
        type: item.type,
        title: item.name,
        description: item.description,
        location: item.location,
        price: null,
        imageSrc: '/images/auto-placeholder.jpg',
        details: [
          `${item.brand}`,
          `${item.model}`,
          `${item.year}`,
          `Пробег ${item.mileage} км`,
        ],
      };
    }
    if ('propertyType' in item) {
      return {
        id: item.id,
        type: item.type,
        title: item.name,
        description: item.description,
        location: item.location,
        imageSrc: '/images/item-placeholder.jpg',
        price: item.price || null,
        details: [
          `${item.propertyType}`,
          `${item.area} м²`,
          `${item.rooms} комн.`,
          `${item.price.toLocaleString('ru-RU')}₽`,
        ],
      };
    }
    if ('serviceType' in item) {
      return {
        id: item.id,
        type: item.type,
        title: item.name,
        description: item.description,
        location: item.location,
        imageSrc: '/images/service-placeholder.jpg',
        price: item.cost || null,
        details: [
          `${item.serviceType}`,
          `Опыт ${item.experience} лет`,
          `${item.cost} ₽`,
          `${item.workSchedule}`,
        ],
      };
    }
    throw new Error('Неизвестный тип объявления');
  });
};

export default transformListings;
