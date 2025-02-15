/**
 * Компонент первого шага формы
 * Отображает основные поля для создания объявления
 */
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/Form';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/Select';

import { UseFormReturn } from 'react-hook-form';
import { StepOneFormValues } from '@/types/FormValues';

/**
 * @param form - Методы и состояние формы из react-hook-form
 * @param isEditMode - Флаг режима редактирования
 */
const StepOne: React.FC<{
  form: UseFormReturn<StepOneFormValues>;
  isEditMode: boolean;
}> = ({ form, isEditMode }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Название</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Описание</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Локация</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="imageSrc"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Изображение</FormLabel>
            <FormControl>
              <Input
                type="file"
                onChange={e =>
                  field.onChange(e.target.files ? e.target.files[0] : null)
                }
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Категория</FormLabel>
            <FormControl>
              <Select
                disabled={isEditMode}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Недвижимость">Недвижимость</SelectItem>
                  <SelectItem value="Услуги">Услуги</SelectItem>
                  <SelectItem value="Авто">Авто</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default StepOne;
