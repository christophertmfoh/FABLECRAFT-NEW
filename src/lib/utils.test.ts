import { describe, expect, it } from 'vitest'

import { cn } from './utils'

describe('cn utility', () => {
  it('combines class names correctly', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toBe('base-class active-class')
  })

  it('filters out falsy values', () => {
    const result = cn('class1', false, null, undefined, 'class2')
    expect(result).toBe('class1 class2')
  })

  it('merges Tailwind classes correctly', () => {
    // twMerge should handle conflicting classes
    const result = cn('px-2 py-1', 'px-4')
    expect(result).toBe('py-1 px-4') // px-4 should override px-2
  })

  it('handles arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('handles empty inputs', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('handles object notation', () => {
    const result = cn({
      'text-red-500': true,
      'text-blue-500': false,
      'bg-gray-100': true,
    })
    expect(result).toBe('text-red-500 bg-gray-100')
  })
})
