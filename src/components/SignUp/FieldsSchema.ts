import { FormControlProps, InputProps } from "@chakra-ui/react";

interface IFieldSchema {
    formControlProps: FormControlProps;
    inputProps: InputProps;
    label: string;
    stepLevel: number;
}

const FieldSchema: IFieldSchema = [];

export default FieldSchema;
