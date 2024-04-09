import { z } from 'zod';

export const PaymentSchema = z.object({
    name: z.string(),
    cardNumber: z.string().regex(/^\d{16}$/),
    expiredDate: z.date(),
    securityCode: z.string().regex(/^\d{3}$/)
});
