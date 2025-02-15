import { z } from 'zod';

const stepOneSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Название должно быть не менее 2 символов.',
    })
    .max(100, {
      message: 'Название должно быть не более 50 символов.',
    }),
  description: z.string().min(2, {
    message: 'Описание должно быть не менее 2 символов.',
  }),
  location: z.string().min(2, {
    message: 'Название должно быть не менее 2 символов.',
  }),
  imageSrc: z
    .instanceof(File)
    .refine(file => file.size > 0, 'Файл не может быть пустым')
    .optional(),
  type: z.enum(['Недвижимость', 'Авто', 'Услуги'], {
    errorMap: () => ({ message: 'Выберите категорию' }),
  }),
});

const stepTwoSchema = (category: string) => {
  switch (category) {
    case 'Недвижимость':
      return z.object({
        propertyType: z
          .string({
            required_error: 'Обязательно для заполнения, строка.',
          })
          .min(2, { message: 'Выберите тип недвижимости.' }),
        area: z
          .number({
            required_error: 'Обязательно для заполнения, число.',
          })
          .positive({ message: 'Площадь должна быть положительным числом.' }),
        rooms: z
          .number({
            required_error: 'Обязательно для заполнения, число.',
          })
          .int({ message: 'Количество комнат должно быть целым числом.' })
          .positive({ message: 'Количество комнат должно быть больше 0.' }),
        price: z
          .number({ required_error: 'Обязательно для заполнения, число.' })
          .positive({ message: 'Введите корректную цену.' }),
      });
    case 'Авто':
      return z.object({
        brand: z
          .string({
            required_error: 'Обязательно для заполнения, строка.',
          })
          .min(2, 'Выберите марку автомобиля.'),
        model: z
          .string({
            required_error: 'Обязательно для заполнения, строка.',
          })
          .min(1, 'Введите модель автомобиля.'),
        year: z
          .number({
            required_error: 'Обязательно для заполнения, число.',
          })
          .min(1900, 'Введите корректный год.')
          .max(new Date().getFullYear(), 'Год не может быть в будущем.'),
        mileage: z
          .number({
            required_error: 'Обязательно для заполнения, число.',
          })
          .optional(),
      });
    case 'Услуги':
      return z.object({
        serviceType: z
          .string({
            required_error: 'Обязательно для заполнения, строка.',
          })
          .min(2, 'Выберите тип услуги.'),
        experience: z
          .number({
            required_error: 'Обязательно для заполнения, число.',
          })
          .positive('Опыт должен быть больше 0 лет.'),
        cost: z
          .number({
            required_error: 'Обязательно для заполнения, число.',
          })
          .positive('Введите корректную стоимость.'),
        workSchedule: z
          .string({
            required_error: 'Обязательно для заполнения, строка.',
          })
          .min(1, 'Обязательно для заполнения, строка.'),
      });
    default:
      return z.object({});
  }
};

export { stepOneSchema, stepTwoSchema };
