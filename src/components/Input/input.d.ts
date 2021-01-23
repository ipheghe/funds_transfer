/**
 * @interface IInputProps
 */
export interface IInputProps {
    name: string;
    type: string;
    onChange: (x?: any) => void;
    value: string | number;
    className?: string;
    placeholder?: string;
}
