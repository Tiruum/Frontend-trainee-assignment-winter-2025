'use client';

import { Button } from '@/components/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/Card';
import { Form } from '@/components/Form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { StepOne, StepTwo } from './steps';

import { stepOneSchema, stepTwoSchema } from './steps/schemas';
import { StepTwoFormValues } from '@/types/FormValues';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { toast } from 'sonner';
import { formatDataForPost } from '@/helpers';

const FormPage = () => {
  const STORAGE_KEY = 'formData';
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [stepOneData, setStepOneData] = useState<
    z.infer<typeof stepOneSchema> | undefined
  >();
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const isEditMode = Boolean(params.id);

  const formStepOne = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      imageSrc: undefined,
      type: undefined,
    },
    mode: 'onBlur',
  });

  const watchedType = formStepOne.watch('type');
  const [category, setCategory] = useState<string | null>(watchedType);

  useEffect(() => {
    if (watchedType !== undefined && watchedType !== category) {
      setCategory(watchedType);
    }
  }, [watchedType, category]);

  const formStepTwo = useForm<StepTwoFormValues>({
    resolver: zodResolver(stepTwoSchema(category || '')),
    mode: 'onChange',
    defaultValues: useMemo(
      () => ({
        propertyType: '',
        area: null as unknown as number | undefined,
        rooms: null as unknown as number | undefined,
        price: null as unknown as number | undefined,
        brand: '',
        model: '',
        year: null as unknown as number | undefined,
        mileage: null as unknown as number | undefined,
        serviceType: '',
        experience: null as unknown as number | undefined,
        cost: null as unknown as number | undefined,
        workSchedule: '',
      }),
      []
    ),
  });

  useEffect(() => {
    if (!isEditMode) {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        formStepOne.reset(parsedData.stepOne);
        formStepTwo.reset(parsedData.stepTwo);
        formStepOne.setValue('type', parsedData.stepOne.type);
        setCategory(parsedData.stepOne.type);
      }
    }
  }, [formStepOne, formStepTwo, isEditMode]);

  useEffect(() => {
    if (!isEditMode && !localStorage.getItem('submitted')) {
      const formData = {
        stepOne: formStepOne.getValues(),
        stepTwo: formStepTwo.getValues(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formStepOne, formStepTwo, isEditMode, stepOneData]);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      toast('Загрузка данных');
      axios
        .get(`http://localhost:3000/items/${params.id}`)
        .then(response => {
          const data = response.data;
          setStepOneData({
            title: data.name,
            description: data.description,
            location: data.location,
            type: data.type,
          });
          formStepOne.reset({
            title: data.name,
            description: data.description,
            location: data.location,
            type: data.type,
          });
          formStepOne.setValue('type', data.type);
          formStepTwo.reset(data);
        })
        .catch(error => {
          console.error('Ошибка загрузки объявления:', error);
        })
        .finally(() => {
          setLoading(false);
          toast('Данные загружены');
        });
    }
  }, [formStepOne, formStepTwo, isEditMode, params.id]);

  useEffect(() => {
    if (!isEditMode) {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (localStorage.getItem('submitted')) {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem('submitted');
        } else {
          formStepOne.reset(parsedData.stepOne);
          formStepTwo.reset(parsedData.stepTwo);
          setCategory(parsedData.stepOne.type);
        }
      }
    }
  }, [formStepOne, formStepTwo, isEditMode]);

  const { handleSubmit: handleSubmitStepOne, formState: formStateStepOne } =
    formStepOne;
  const { handleSubmit: handleSubmitStepTwo, formState: formStateStepTwo } =
    formStepTwo;

  const onSubmit = async () => {
    const isValid = await formStepTwo.trigger();
    if (isValid) {
      const secondStepData = formStepTwo.getValues();
      const fullData = { ...stepOneData, ...secondStepData };
      const filteredData = formatDataForPost(fullData);
      try {
        if (isEditMode) {
          const response = await axios.put(
            `http://localhost:3000/items/${params.id}`,
            filteredData
          );
          if (response.status >= 200 && response.status < 300) {
            toast('Объявление успешно обновлено');
            navigate(`/item/${response.data.id}`);
          } else {
            toast(`Ошибка при отправке данных: ${response.statusText}`);
          }
        } else {
          const response = await axios.post(
            'http://localhost:3000/items/',
            filteredData
          );
          if (response.status >= 200 && response.status < 300) {
            localStorage.setItem('submitted', 'true');
            localStorage.removeItem(STORAGE_KEY);
            localStorage.setItem('submitted', 'false');
            toast('Объявление успешно создано');
            navigate(`/item/${response.data.id}`);
          } else {
            toast(`Ошибка при отправке данных: ${response.statusText}`);
          }
        }
      } catch (error) {
        toast(`Ошибка при отправке данных: ${error}`);
      }
    }
  };

  const handleNext = async () => {
    const isValid = await formStepOne.trigger();
    if (isValid) {
      const firstStepData = formStepOne.getValues();
      setStepOneData(firstStepData);
      setCategory(firstStepData.type);
      setStep(1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(0);
    else navigate('/list');
  };

  if (loading) return 'Загрузка';
  return (
    <div className="overflow-scroll">
      <Card className="absolute w-full md:w-1/2 left-1/2 -translate-x-1/2">
        <CardHeader className="text-center text-xl">
          {isEditMode ? 'Редактирование объявления' : 'Размещение объявления'}
        </CardHeader>
        <CardContent>
          {step === 0 && (
            <Form {...formStepOne}>
              <form
                onSubmit={handleSubmitStepOne(onSubmit)}
                className="space-y-8"
              >
                <StepOne form={formStepOne} isEditMode={isEditMode} />
                <div className="flex gap-4">
                  <Button variant={'ghost'} type="button" onClick={handleBack}>
                    <ArrowLeft />
                  </Button>
                  <Button
                    className="w-full"
                    type="button"
                    disabled={!formStateStepOne.isValid}
                    onClick={handleNext}
                  >
                    Далее
                  </Button>
                </div>
              </form>
            </Form>
          )}
          {step === 1 && category && (
            <Form {...formStepTwo}>
              <form
                onSubmit={handleSubmitStepTwo(onSubmit)}
                className="space-y-8"
              >
                <StepTwo form={formStepTwo} category={category} />
                <div className="flex gap-4">
                  <Button variant={'ghost'} type="button" onClick={handleBack}>
                    <ArrowLeft />
                  </Button>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={!formStateStepTwo.isValid}
                    onClick={handleNext}
                  >
                    Опубликовать
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground"></CardFooter>
      </Card>
    </div>
  );
};

export default FormPage;
