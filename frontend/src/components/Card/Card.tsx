import React from 'react';
import * as Style from './Card.style';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

export function Card({title, children}: CardProps) {
    return (
        <Style.CardWrapper>
            <Style.CardHeader>
                <h2>{title}</h2>
            </Style.CardHeader>
            <Style.CardBody>
                {children}
            </Style.CardBody>
        </Style.CardWrapper>
    );
}