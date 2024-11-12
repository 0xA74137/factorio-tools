import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { $Font } from 'bdfparser'
import fetchline from 'fetchline'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function drawBitmapText(text: string, fontName: string): Promise<string> {
  const font = await $Font(fetchline(fontName))
  if(!font || !font.headers){
    throw new Error('Unable to load font')
  }

  return font.draw(text).toString().replace(/\./g, " ");
}
