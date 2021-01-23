
export interface IDetails {
    name: string;
    amount: number;
    bank: string,
    formattedDate: string;
}

/**
 * @interface IViewTransferProps
 */
export interface IViewTransferProps {
    details: IDetails;
}
