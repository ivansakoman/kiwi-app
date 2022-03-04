import { toast } from 'react-toastify';

class ToastService {
    private static opts: object = {
        autoClose: 3000,
        position: 'top-center',
        hideProgressBar: true,
    };

    success = (message: string): void => {
        toast.success(message, ToastService.opts);
    };

    error = (message: string): void => {
        const globalErrorMessage = message ? message : 'There is an error';
        toast.error(globalErrorMessage, Object.assign({}, ToastService.opts, { toastId: 'errorId' }));
    };
}

const toastService = new ToastService();

export default toastService;
