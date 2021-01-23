/**
 * @interface ITransferProps
 */
export interface ITransferProps {
    banks: any;
    showMessage: (x: string, y: string) => void;
    handleSubmit: (x: any) => void;
}
