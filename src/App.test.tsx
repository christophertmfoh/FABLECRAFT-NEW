import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('FableCraft')).toBeInTheDocument()
  })

  it('displays the landing page header', () => {
    render(<App />)

    // Check header elements
    expect(screen.getByText('FableCraft')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Toggle theme')).toBeInTheDocument()
  })

  it('shows the main value proposition', () => {
    render(<App />)

    expect(screen.getByText('Professional Creative Writing Platform')).toBeInTheDocument()
    expect(screen.getByText(/Replace 15\+ Tools with/)).toBeInTheDocument()
    expect(screen.getByText('One Platform')).toBeInTheDocument()
  })

  it('displays call-to-action buttons', () => {
    render(<App />)

    expect(screen.getByText('Start Free Trial')).toBeInTheDocument()
    expect(screen.getByText('View Demo')).toBeInTheDocument()
  })

  it('shows how it works section', () => {
    render(<App />)

    expect(screen.getByText('Your Complete Writing Workflow')).toBeInTheDocument()
    expect(screen.getByText('Ideation')).toBeInTheDocument()
    expect(screen.getByText('World Crafting')).toBeInTheDocument()
  })

  it('has theme toggle button', () => {
    render(<App />)

    const themeToggle = screen.getByText('Toggle theme')
    expect(themeToggle).toBeInTheDocument()
  })
})
