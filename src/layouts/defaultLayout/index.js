import React from 'react'
import { Footer, NavBar } from '../../components'

const DefaultLayout = ({ children, categories }) => {
    return (
        <>
            <NavBar
                settings={['Logout']}
                categories={categories}
            />
            {children}
            <Footer />
        </>
    )
}

export default DefaultLayout