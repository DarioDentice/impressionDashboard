import {CardWrapper, CardBody, CardHeader} from "./Card.style.ts";
import {type FC, type PropsWithChildren} from 'react'

type CardProps = PropsWithChildren<{
    title: string
}>

const Card: FC<CardProps> = ({title, children}) => {
    return (
        <CardWrapper>
            <CardHeader><h2>{title}</h2></CardHeader>
            <CardBody>{children}</CardBody>
        </CardWrapper>
    )
}

export default Card