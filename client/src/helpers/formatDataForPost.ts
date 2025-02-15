interface RawData {
  title?: string;
  description?: string;
  location?: string;
  imageSrc?: File;
  type?: string;
  propertyType?: string;
  area?: number | undefined;
  rooms?: number | undefined;
  price?: number | undefined;
  brand?: string;
  model?: string;
  year?: number | undefined;
  mileage?: number | undefined;
  serviceType?: string;
  experience?: number | undefined;
  cost?: number | undefined;
  workSchedule?: string;
}

export const formatDataForPost = (data: RawData) => {
  const commonFields = {
    name: data.title,
    description: data.description,
    location: data.location,
    type: data.type,
  };

  switch (data.type) {
    case 'Недвижимость':
      return {
        ...commonFields,
        propertyType: data.propertyType,
        area: data.area,
        rooms: data.rooms,
        price: data.price,
      };

    case 'Авто':
      return {
        ...commonFields,
        brand: data.brand,
        model: data.model,
        year: data.year,
        mileage: data.mileage,
      };

    case 'Услуги':
      return {
        ...commonFields,
        serviceType: data.serviceType,
        experience: data.experience,
        cost: data.cost,
        workSchedule: data.workSchedule,
      };

    default:
      return commonFields;
  }
};
