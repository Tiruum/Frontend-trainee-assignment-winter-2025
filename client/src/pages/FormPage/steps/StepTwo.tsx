/**
 * Компонент второго шага формы
 * Отображает динамические поля в зависимости от выбранной категории
 */
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/Form';
import { Input } from '@/components/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';
import { UseFormReturn } from 'react-hook-form';
import { StepTwoFormValues } from '@/types/FormValues';

import { ControllerRenderProps } from 'react-hook-form';

/**
 * Обработчик изменения числовых полей
 * Конвертирует пустую строку в undefined, иначе парсит в число
 */
const handleNumberChange =
  <T extends keyof StepTwoFormValues>(
    field: ControllerRenderProps<StepTwoFormValues, T>
  ) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    field.onChange(value === '' ? undefined : parseFloat(value));
  };

/**
 * @param form - Методы и состояние формы из react-hook-form
 * @param category - Выбранная категория объявления
 */
const StepTwo = ({
  form,
  category,
}: {
  form: UseFormReturn<StepTwoFormValues>;
  category: string;
}) => {
  switch (category) {
    case 'Недвижимость':
      return (
        <>
          <FormField
            name="propertyType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип недвижимости</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип недвижимости" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Квартира">Квартира</SelectItem>
                      <SelectItem value="Дом">Дом</SelectItem>
                      <SelectItem value="Коттедж">Коттедж</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="area"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Площадь (м<sup>2</sup>)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value ?? ''}
                    onChange={handleNumberChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="rooms"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Количество комнат</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value ?? ''}
                    onChange={handleNumberChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цена (₽)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value ?? ''}
                    onChange={handleNumberChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    case 'Авто':
      return (
        <>
          <FormField
            name="brand"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Марка</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите марку" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Lada">Lada</SelectItem>
                      <SelectItem value="Porsche">Porsche</SelectItem>
                      <SelectItem value="BMW">BMW</SelectItem>
                      <SelectItem value="Haval">Haval</SelectItem>
                      <SelectItem value="УАЗ">УАЗ</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="model"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Модель</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="year"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Год выпуска</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value ?? ''}
                    onChange={handleNumberChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="mileage"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пробег (км)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value ?? ''}
                    onChange={handleNumberChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    case 'Услуги':
      return (
        <>
          <FormField
            name="serviceType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип услуги</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип услуги" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Уборка">Уборка</SelectItem>
                      <SelectItem value="Стрижка газона">
                        Стрижка газона
                      </SelectItem>
                      <SelectItem value="Репетиторство">
                        Репетиторство
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="experience"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Опыт работы (лет)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value ?? ''}
                    onChange={handleNumberChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="cost"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Стоимость (₽)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value ?? ''}
                    onChange={handleNumberChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="workSchedule"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>График работы</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      );
    default:
      <div>Некорректная категория</div>;
  }
};

export default StepTwo;
