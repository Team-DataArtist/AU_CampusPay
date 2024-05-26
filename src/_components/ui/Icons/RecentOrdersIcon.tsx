import React from 'react';
import {FaShoppingBag} from "react-icons/fa";

type Props = {
    className?: string
}

const RecentOrdersIcon = ({className}: Props) => {
    return <FaShoppingBag className={className}/>
};

export default RecentOrdersIcon;