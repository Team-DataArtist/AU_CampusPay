'use client'
import React, {useState} from 'react';
import PaymentBtn from "@/app/_components/ui/Button/PaymentBtn";
import XMarkIcon from "@/app/_components/ui/Icons/XmarkIcon";
import PlusIcon from "@/app/_components/ui/Icons/PlusIcon";
import MinusIcon from "@/app/_components/ui/Icons/MinusIcon";
import Link from "next/link";
import Image from "next/image";

// activeTab 문자열 타입
type activeTab = '학생' | '교직원' | '기숙사';

// 유저가 선택한 상품의 타입
type productItem = {
    label: string;
    price: number;
    quantity: number;
}

// 메뉴 데이터 배열로 정의
const menuData: Record<activeTab, { label: string; price: number; }[]> = {
    '학생': [
        {label: '학생 중식1', price: 4000},
        {label: '학생 중식2', price: 4000}
    ],
    '교직원': [
        {label: '교직원 중식', price: 5000}
    ],
    '기숙사': [
        {label: '학생 조식', price: 1000},
        {label: '학생 중식1', price: 4000},
        {label: '학생 중식2', price: 4000},
        {label: '학생 석식', price: 4000}
    ]
};

const PaymentContainer = () => {
    const [activeTab, setActiveTab] = useState<activeTab>('교직원');
    const [selectedItem, setSelectedItem] = useState<productItem | null>(null);
    /**
     * ### 상품 클릭 이벤트 핸들러
     * label: 상품 이름
     * price: 선택한 상품 가격
     * quantity: 선택한 상품 수량
     */
    const handleItemClick = (label: string, price: number) => {
        if (selectedItem && selectedItem.label === label) {
            setSelectedItem({
                ...selectedItem,
                quantity: selectedItem.quantity + 1
            });
        } else {
            setSelectedItem({
                label,
                price,
                quantity: 1
            });
        }
    };

    // 상품 해제 이벤트 핸들러
    const handleItemDeselection = () => {
        setSelectedItem(null);
    }

    // + 버튼 클릭 이벤트 핸들러
    const handleIncreaseQuantity = () => {
        if (selectedItem && selectedItem.quantity < 999) {
            setSelectedItem({
                ...selectedItem,
                quantity: selectedItem.quantity + 1
            });
        }
    };

    // - 버튼 클릭 이벤트 핸들러
    const handleDecreaseQuantity = () => {
        if (selectedItem && selectedItem.quantity > 1) {
            setSelectedItem({
                ...selectedItem,
                quantity: selectedItem.quantity - 1
            });
        }
    };

    return (
        <>
            <div className="col-span-2 flex flex-col items-center">
                <div className="w-[600px] h-[50px] flex text-[22px] text-white bg-[#454545]">
                    <button
                        onClick={() => setActiveTab('학생')}
                        className={`py-2 px-4 w-full text-center duration-200 hover:bg-primary-color hover:bg-opacity-90 ${activeTab === '학생' ? 'bg-primary-color font-bold' : ''}`}
                    >학생
                    </button>
                    <button
                        onClick={() => setActiveTab('교직원')}
                        className={`py-2 px-4 w-full text-center duration-200 hover:bg-primary-color hover:bg-opacity-90 ${activeTab === '교직원' ? 'bg-primary-color font-bold' : ''}`}
                    >교직원
                    </button>
                    <button
                        onClick={() => setActiveTab('기숙사')}
                        className={`py-2 px-4 w-full text-center duration-200 hover:bg-primary-color hover:bg-opacity-90 ${activeTab === '기숙사' ? 'bg-primary-color font-bold' : ''}`}
                    >기숙사
                    </button>
                </div>

                <div className="flex gap-[40px] mt-[60px]">
                    {menuData[activeTab].map((item, idx) => (
                        <div key={idx} className="w-[240px] h-[350px] bg-white rounded-[6px] cursor-pointer"
                             onClick={() => handleItemClick(item.label, item.price)}>
                            <div className="w-full h-[240px] bg-black-color rounded-t-[6px]">
                                <Image
                                    className="rounded-t-[6px]"
                                    src={'/img/TemporaryMenu.jpg'}
                                    alt={'임시 메뉴 이미지'}
                                    width={240}
                                    height={240}
                                />

                            </div>
                            <div className="p-2 min-w-full leading-[35px]">
                                <h4 className="text-[20px] text-center font-medium">{item.label}</h4>
                                <div className="grid grid-cols-2 grid-rows-2">
                                    {/* Active Tab의 현재 상태값 표시 및  */}
                                    <p className="text-[16px]">{activeTab}</p>
                                    <p></p>
                                    <p className="text-[18px] font-medium">{item.price} 원</p>
                                    <p className="text-right text-[16px]">2023.11.04</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-col justify-center items-center pt-16 border-t-[1px]'>
                {selectedItem ? (
                    <ul className="flex flex-col justify-center w-[800px] h-[200px] bg-[#eaeaea] rounded-[5px]">
                        <li key={selectedItem.label} className="relative grid grid-cols-10 max-h-[120px] mx-[100px] p-[10px] bg-white">
                            <div className="w-[100px] h-[100px] col-span-2 bg-black-color rounded-[1px]">
                                <Image
                                    className="rounded-t-[1px]"
                                    src={'/img/TemporaryMenu.jpg'}
                                    alt={'임시 메뉴 이미지'}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className="p-2 min-w-full col-span-8">
                                <h4 className="text-[20px] font-medium">{selectedItem.label}</h4>
                                <div className="flex gap-44 mt-[10px]">
                                    <p className="text-[18px] font-medium">{selectedItem ? selectedItem.price: 0} 원</p>
                                    <div className="flex gap-3">
                                        <p className="px-3 text-right text-[16px] min-w-[100px] max-w-[100px]">{selectedItem.quantity}개</p>
                                        <button className="w-fit h-fit p-[3px] bg-white border-[1px] border-[#7c7c7c] rounded-[3px]"
                                                onClick={handleIncreaseQuantity}>
                                            <PlusIcon/>
                                        </button>
                                        <button className="w-fit h-fit p-[3px] bg-white border-[1px] border-[#7c7c7c] rounded-[3px]"
                                                onClick={handleDecreaseQuantity}>
                                            <MinusIcon/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button className="absolute p-5 right-0 top-0" onClick={handleItemDeselection}>
                                <XMarkIcon/>
                            </button>
                        </li>
                    </ul>
                ): (
                    <ul className="w-[800px] h-[150px] bg-[#ececec] text-[#555555] text-center rounded-[5px]">
                        <li className="my-16">
                            장바구니가 비었습니다.
                        </li>
                    </ul>
                )}

                <div className="flex flex-col justify-center mt-[30px]">
                    <p className="pb-10 text-center">
                        총 상품 금액: {selectedItem ? selectedItem.price * selectedItem.quantity : 0}원
                    </p>
                    <div className="flex gap-[60px]">
                        <Link href={'/'}>
                            <div className={'bg-[#555555] font-semibold text-center leading-[65px] text-white w-[300px] h-[65px] rounded-[5px] duration-200 hover:bg-[#444444]'}>
                                돌아가기
                            </div>
                        </Link>
                        <PaymentBtn
                            props={selectedItem}
                            className={'bg-primary-color font-semibold text-white w-[300px] h-[65px] border-2 border-solid border-primary-color rounded-[5px] duration-200 hover:bg-[#ff8a00] hover:border-primary-color'}
                        />
                    </div>
                </div>
            </div>

        </>
    );
};

export default PaymentContainer;