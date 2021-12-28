import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormInputField from './FormInput/FormInputField'
import FormSelect from './FormSelect/FormSelectField'
import "./form.css";
import FormAutocomplete from './FormAutocomplete/FormAutocomplete'
import { PrimaryButton } from './PrimaryButton'

const schema = yup.object().shape({
  Firstname: yup
    .string()
    .required("First name field is required"),
  Category: yup
    .string()
    .required("It is required to choose a category"),
  Directors:  yup
    .array()
    .required("It is required to select an actor"),
});

export default function Form(props) {
    const methods = useForm(
      {
        resolver: yupResolver(schema),
        defaultValues: {
          Firstname: "",
          Category: "",
          
        }
      });
     const { handleSubmit, formState: {errors}, register} = methods;
     const categories = [
      {
        id: 1,
        label: "Action",
      },
      {
        id: 2,
        label: "Thriller",
      },
      {
        id: 3,
        label: "Comedy",
      },
      {
        id: 4,
        label: "Drama",
      },
    ];
    const directors = [
      { value: 'Quentin Trantino', label: 'Quentin Trantino' },
      { value: 'Danis Tanovic', label: 'Danis Tanovic' },
      { value: 'Pjer Zalica', label: 'Pjer Zalica' },
      { value: 'Martin Scorsese', label: 'Martin Scorsese' },
      { value: 'Wes Anderson', label: 'Wes Anderson' },
    ];
    return (
        <FormProvider {...methods}>
            <form className="formContainer" onSubmit={handleSubmit(data => console.log(data))}>
              <FormInputField 
                name="Firstname" 
                errorobj={errors}
              />
              <FormSelect 
                name="Category"
                options={categories}
                errorobj={errors}
              />
              <FormAutocomplete 
                name="Directors"
                options={directors}
                placeholder="Please select directors"
                isMulti
                required={true}
                errorobj={errors}
              />
             <PrimaryButton type="submit">SUBMIT</PrimaryButton>
            </form>
        </FormProvider>
    )
}
