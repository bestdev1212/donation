import { render, screen } from '@testing-library/react'

import App from './App'


test('render App', () => {
    render(<App />)
    const header = screen.getByText(/Donate ETH/i)
    expect(header).toBeInTheDocument()

    const label = screen.getByText(/Amount/i)
    expect(label).toBeInTheDocument()

    const donateButton = screen.getByRole("button")
    expect(donateButton).toBeInTheDocument()
})