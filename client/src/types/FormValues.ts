export interface StepOneFormValues {
  title: string;
  description: string;
  location: string;
  imageSrc?: File;
  type: 'Недвижимость' | 'Услуги' | 'Авто';
}

export interface StepTwoFormValues {
  propertyType?: string;
  area?: number;
  rooms?: number;
  price?: number;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  serviceType?: string;
  experience?: number;
  cost?: number;
  workSchedule?: string;
}
