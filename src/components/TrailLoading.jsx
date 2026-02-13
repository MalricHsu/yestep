import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const TrailLoading = () => {
    return (
        <div className="trail-loader d-flex flex-column justify-content-center align-items-center">
            {/* Lottie 動畫 */}
            <div className="lottie-walk">
                <DotLottieReact
                    src="https://lottie.host/23194543-a105-4a2c-9aef-a7bb23e0f7af/ovybdHnWlR.lottie"
                    loop
                    autoplay
                />
            </div>
            <div className="loading-text">正在探索步道中...</div>
        </div>
    );
};

export default TrailLoading;
