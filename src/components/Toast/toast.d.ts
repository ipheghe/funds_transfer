/**
 * @interface IToastState
 */
export interface IToastState {
    message?: any;
    className?: string;
}
  
/**
 * @interface IToastProps
 */
export interface IToastProps {
    timeOut?: number;
    showMessage?: string
}
