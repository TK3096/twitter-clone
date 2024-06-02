import { type ClassValue, clsx } from 'clsx'

import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
  }).then((res) => res.json())
