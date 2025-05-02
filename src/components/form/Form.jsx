import { FormProvider, useForm } from "react-hook-form";

const Form = ({ onSubmit, children, defaultValues }) => {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => onSubmit(data, methods))}
        className="p-4"
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
