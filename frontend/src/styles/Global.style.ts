import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body, #root {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Roboto', sans-serif;
        color: #333;
        line-height: 1.6;
        box-sizing: border-box;
    }

    *, *::before, *::after {
        box-sizing: inherit;
    }

    input[type="radio"] {
        appearance: none;
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border: 2px solid #ccc;
        border-radius: 50%;
        outline: none;
        cursor: pointer;
        position: relative;
        vertical-align: middle;
    }

    input[type="radio"]:checked {
        border-color: #1890ff;
    }

    input[type="radio"]:checked::before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        background-color: #1890ff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }


    #root {
        display: flex;
        flex-direction: column;
    }
`;