/**
 * @interface IToastState
 */
export interface IToastState {
    message: string;
    className: string;
}
  
/**
 * @interface ITableProps
 */
export interface ITableProps {
    config: any;
    headers: any;
    data: any;
    onClick: (x: any) => void;
}
