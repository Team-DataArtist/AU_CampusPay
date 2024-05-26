import React from 'react';

const Navbar = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div className='h-full'>
            {children}
        </div>
    );
};

export default Navbar;