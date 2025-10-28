import {CardWrapper, CardBody, CardHeader} from "./Card.style.ts";
import {type FC, type PropsWithChildren} from 'react'

type CardProps = PropsWithChildren<{
    title: string
}>

const Card: FC<CardProps> = ({title, children}) => {
    return (
        <CardWrapper>
            <CardHeader>{title}</CardHeader>
            <CardBody>{children}</CardBody>
        </CardWrapper>
    )
}

export default Card