import { z } from 'zod';

const schema = z.object({
  title: z.string().min(3),
  content: z.string().min(5),
  tags: z.string().array(),
})

export default schema