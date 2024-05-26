'use client'
import React from 'react';
import {useRouter} from "next/navigation";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PageNation({ currentPage, totalPages, onPageChange }: Props) {
    const router = useRouter();
    const pageNumbers = [];
    let startPage, endPage;

    if (totalPages <= 10) {
        // 전체 페이지 수가 10개 이하인 경우
        startPage = 1;
        endPage = totalPages;
    } else {
        // 전체 페이지 수가 10개를 초과하는 경우
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
    }

    const currentPageNumber = (number: number) => {
        onPageChange(number);
    }

    const buttonStyle = "px-3 py-1 bg-gray-300 text-gray-700 rounded-full mr-2 hover:bg-gray-400 transition duration-300";

    return (
        <div className="flex justify-center items-center mt-4">
            {/* 이전 버튼 */}
            {/*<button
                className={buttonStyle}
                onChange={backPageButton}
                disabled={currentPage === 1}
            >
                <BackArrowBtnIcon/>
            </button>*/}
            {/* 페이지 번호 */}
            {pageNumbers.map(number => (
                <button
                    key={number}
                    className={buttonStyle}
                    onClick={() => currentPageNumber(number)}
                    disabled={currentPage === number}
                >
                    {number}
                </button>
            ))}
            {/* 다음 버튼 */}
            {/*<button
                className={buttonStyle}
                onChange={nextPageButton}
                disabled={currentPage === totalPages}
            >
                <NextArrowButton/>
            </button>*/}
        </div>
    );
};