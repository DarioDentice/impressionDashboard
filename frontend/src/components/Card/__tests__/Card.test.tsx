import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import Card from '../Card'

describe('Card', () => {
    it('show title in heading level 2', () => {
        render(
            <Card title="Dashboard">
                <p>Content</p>
            </Card>
        )
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Dashboard')
    })

    it('children render', () => {
        render(
            <Card title="Test">
                <div data-testid="card-content">Hello World</div>
            </Card>
        )
        expect(screen.getByTestId('card-content')).toHaveTextContent('Hello World')
    })
})