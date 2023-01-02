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
  Text,
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
  helpText?: string;
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
      helpText,
      ...rest
    }: Omit<ControlledInputProps, "ref">,
    ref
  ) => {
    return (
      <FormControl
        isInvalid={Boolean(errors[name])}
        isRequired={isRequired}
        {...formControlProps}
        display="flex"
        flexDir={"column"}
      >
        <FormLabel {...formLabelProps}>{label}</FormLabel>
        <Input placeholder={placeholder} name={name} {...rest} ref={ref} />
        {helpText && (
          <Text textColor={"gray.700"} py={1} fontSize={"sm"}>
            {helpText}
          </Text>
        )}
        <FormErrorMessage {...formErrorMessageProps}>
          {errors[name]?.message}
        </FormErrorMessage>
      </FormControl>
    );
  }
);
