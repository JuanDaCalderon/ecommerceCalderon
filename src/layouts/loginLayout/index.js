import React from 'react'
import { Footer } from '../../components'

const LoginLayout = ({ children }) => {
    return (
        <>
            {children}
            <Footer />
        </>
    )
}

export default LoginLayout