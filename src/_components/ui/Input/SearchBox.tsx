'use client'
import React, {useState} from 'react';
import SearchIcon from "@/app/_components/ui/Icons/SearchIcon";

const SearchBox = () => {
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <div
            className={`
                w-[440px]
                my-10
                mx-auto
                flex
                items-center
                border-solid
                border-2
                border-black-color
                rounded-3xl
                relative
                ${isActive ?'border-2 border-orange-200' : 'border-2'}
            `}
        >
            <label htmlFor="input_search">
                <input
                    id={'input_search'}
                    type="text"
                    placeholder={'검색어를 입력해 주세요'}
                    className='
                        w-[360px]
                        h-12
                        pl-5
                        pr-10
                        rounded-3xl
                        border-none
                        outline-none
                    '
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                />
            </label>
            <button
                className='
                    w-10
                    h-10
                    absolute
                    top-1/2
                    right-3
                    transform
                    -translate-y-1/2
                    text-black-color
                '>
                <SearchIcon/>
            </button>
        </div>
    );
};

export default SearchBox;