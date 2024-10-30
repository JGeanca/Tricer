import { toast, Toaster } from 'sonner';

export function FeedbackMessageContainer() {
    return (<Toaster richColors expand={true} position="bottom-right" />)
}

export function useFeedback() {
    const showToast = (type, message, description = '') => {
        const options = { description };

        switch (type) {
            case 'success':
                toast.success(message, options);
                break;
            case 'info':
                toast.info(message, options);
                break;
            case 'warning':
                toast.warning(message, options);
                break;
            case 'error':
                toast.error(message, options);
                break;
            default:
                toast(message, options);
        }
    }

    return {
        showSuccess: (message, description) => showToast('success', message, description),
        showError: (message, description) => showToast('error', message, description),
        showInfo: (message, description) => showToast('info', message, description),
        showWarning: (message, description) => showToast('warning', message, description),
        showDefault: (message, description) => showToast('default', message, description),
    }
}
