import React from 'react';
import Navbar from "@/app/_components/nav/Navbar";
import GuideSection from "@/app/_components/GuideSection";

const Guide = () => {
    return (
        <Navbar>
            {/* 스크롤 스냅 기능을 위한 div 설정 */}
            <div style={{ scrollBehavior: 'smooth' }} className="snap-y snap-mandatory h-screen">
                <div className="snap-start">
                    <GuideSection
                        title="로그인 가이드"
                        content={<>
                            CampusPay에 로그인하는 방법을 단계별로 안내합니다.<br />
                            이메일과 비밀번호를 사용하여 로그인하세요.
                        </>}
                    />
                </div>
                <div className="snap-start">
                    <GuideSection
                        title="계정 설정"
                        content="개인 정보를 업데이트하고 알림 설정을 관리하는 방법을 배워보세요."
                    />
                </div>
                <div className="snap-start">
                    <GuideSection
                        title="결제 프로세스"
                        content={<>
                            CampusPay에서 결제를 진행하는 방법에 대한 안내입니다.<br />
                            간편하고 안전한 결제를 위한 단계를 확인하세요.
                        </>}
                    />
                </div>
                <div className="snap-start">
                    <GuideSection
                        title="지원 받기"
                        content="추가 도움이 필요하신가요? 챗봇에 문의하여 빠르고 전문적인 도움을 받으세요."
                    />
                </div>
            </div>
        </Navbar>
    );
};

export default Guide;