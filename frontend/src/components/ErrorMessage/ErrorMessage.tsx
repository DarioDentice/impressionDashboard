import React from 'react'
import {WrapperError,RowError} from "./ErrorMessage.style.ts";

interface ErrorMessageProps {
    message: string
    details?: Array<string | number | boolean>
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, details }) => {
    return (
        <WrapperError>
            <strong>Error:</strong> {message}
            {details && (
                <RowError>
                    {Object.entries(details).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {String(value)}
                        </li>
                    ))}
                </RowError>
            )}
        </WrapperError>
    )
}
