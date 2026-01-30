import { ApiResponse, ContactFormData, InquiryFormData } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
}

async function request<T>(
  endpoint: string,
  config: RequestConfig
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...config.headers,
  };

  const response = await fetch(url, {
    method: config.method,
    headers,
    body: config.body ? JSON.stringify(config.body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }

  return data;
}

export const api = {
  get: <T>(endpoint: string): Promise<ApiResponse<T>> =>
    request<T>(endpoint, { method: 'GET' }),

  post: <T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> =>
    request<T>(endpoint, { method: 'POST', body }),

  put: <T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> =>
    request<T>(endpoint, { method: 'PUT', body }),

  patch: <T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> =>
    request<T>(endpoint, { method: 'PATCH', body }),

  delete: <T>(endpoint: string): Promise<ApiResponse<T>> =>
    request<T>(endpoint, { method: 'DELETE' }),
};

export const submitContactForm = async (
  data: ContactFormData
): Promise<ApiResponse<{ success: boolean }>> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('Contact form submitted:', data);

  return {
    success: true,
    data: { success: true },
    message: 'Thank you for contacting us. We will get back to you soon!',
  };
};

export const submitInquiryForm = async (
  data: InquiryFormData
): Promise<ApiResponse<{ success: boolean }>> => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('Inquiry form submitted:', data);

  return {
    success: true,
    data: { success: true },
    message:
      'Your inquiry has been submitted. Our team will contact you shortly!',
  };
};
