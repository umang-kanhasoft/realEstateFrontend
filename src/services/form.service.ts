import { ApiResponse, ContactFormData, InquiryFormData } from '@/types';

export const FormService = {
  submitContactForm: async (
    _data: ContactFormData
  ): Promise<ApiResponse<{ success: boolean }>> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: 'Thank you for contacting us. We will get back to you soon!',
      data: { success: true },
      status: 'success',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any; // Type assertion needed until ApiResponse is updated globally
  },

  submitInquiryForm: async (
    _data: InquiryFormData
  ): Promise<ApiResponse<{ success: boolean }>> => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message:
        'Your inquiry has been submitted. Our team will contact you shortly!',
      data: { success: true },
      status: 'success',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  },
};
