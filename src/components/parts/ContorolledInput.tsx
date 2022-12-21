import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  forwardRef,
  FormControlProps,
  FormLabelProps,
  FormErrorMessageProps,
} from "@chakra-ui/react";
import { FieldErrorsImpl, Ref } from "react-hook-form";

export type ControlledInputProps = {
  label: string;
  errors: Partial<FieldErrorsImpl<Record<string, unknown>>>;
  name: string;
  ref: Ref;
  isRequired?: boolean;
  formControlProps?: Omit<FormControlProps, "isInvalid" | "isRequired">;
  formLabelProps?: FormLabelProps;
  formErrorMessageProps?: FormErrorMessageProps;
  placeholder: string;
} & Omit<InputProps, "isRequired">;

export const ControlledInput = forwardRef<ControlledInputProps, "input">(
  (
    {
      label,
      errors,
      name,
      isRequired,
      formControlProps,
      formLabelProps,
      formErrorMessageProps,
      placeholder,
      ...rest
    }: Omit<ControlledInputProps, "ref">,
    ref
  ) => {
    return (
      <FormControl
        isInvalid={Boolean(errors[name])}
        isRequired={isRequired}
        {...formControlProps}
      >
        <FormLabel {...formLabelProps}>{label}</FormLabel>
        <Input placeholder={placeholder} name={name} {...rest} ref={ref} />
        <FormErrorMessage {...formErrorMessageProps}>
          {errors[name]?.message}
        </FormErrorMessage>
      </FormControl>
    );
  }
);
