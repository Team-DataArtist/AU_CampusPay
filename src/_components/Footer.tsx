import React from 'react';
import {BsFacebook, BsInstagram} from "react-icons/bs";
import {FiTwitter} from "react-icons/fi";

const Footer = () => {
    return (
        <footer
            className='
                py-10
                flex
                gap-10
                justify-center
                bg-footer-color
                text-white
                max-h-[373px]
            '
        >
            <div>
                <small>
                    AU CampusPay는 안산대학교 졸업과제 출품작으로 실제 사용 가능한 식권을 판매하지 않으므로,<br/>
                    팀 DA는 이에대한 책임을 지지 않습니다.<br/>
                    DA 팀장 : 박장환 | 연락처 : 010-0000-0000 | 경기도 안산시 안산대학교<br/>
                    <span>Copyright&#169;2023 DA. All Rights Reserved.</span>
                </small>
            </div>
            <div className='flex gap-10'>
                <ul>
                    <li>식단표</li>
                    <li>공지 사항</li>
                    <li>문의하기</li>
                    <li>챗봇</li>
                </ul>
                <ul>
                    <li>이용약관</li>
                    <li>개인정보처리방침</li>
                    <li>취소 및 환불 정책</li>
                </ul>
                <ul className='flex gap-5'>
                    <li><BsFacebook/></li>
                    <li><BsInstagram/></li>
                    <li><FiTwitter/></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;