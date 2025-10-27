import React,{type FC} from 'react';
import {CardWrapper,CardBody,CardHeader} from './Card.style';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card:FC<CardProps> = ({title, children}: CardProps) => {
    return (
        <CardWrapper>
            <CardHeader>
                <h2>{title}</h2>
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </CardWrapper>
    );
}
export default Card;