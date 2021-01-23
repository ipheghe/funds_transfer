export interface IBanks {
    name: string;
    slug: string;
    code: string;
    longcode?: string;
    gateway?: any;
    pay_with_bank: boolean;
    active: boolean;
    is_deleted: boolean;
    country: string;
    currency: string;
    type: string;
    id: number;
    createdAt: string;
    updatedAt?: string;
}


/**
 * @interface ITransferProps
 */
export interface ITransferProps {
    banks: IBanks[];
    showMessage: (x: string, y: string) => void;
}
