import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';

const TrailDetail = () => {
    const [detailData, setDetailData] = useState({});
    const detailApi = axios.create({ baseURL: 'https://yestep.zeabur.app/' });

    useEffect(() => {
        const handleDetailData = async () => {
            try {
                const res = await detailApi.get('/trails');
                console.log(res.data);
                setDetailData(res.data[1]);
            } catch (error) {
                console.log(error);
            }
        };
        handleDetailData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const StarRating = ({ rating }) => {
        const difficultyMap = {
            休閒級: 1,
            入門級: 2,
            健行級: 3,
            挑戰級: 4,
            專業級: 5,
            default: 1,
        };
        const starCount = difficultyMap[rating] || difficultyMap['default'];
        const totalStars = 5;
        return (
            <div className="d-flex">
                {Array.from({ length: totalStars }).map((_, index) => {
                    const isActive = index < starCount;
                    return (
                        <span
                            key={index}
                            style={{ fontSize: '12px' }}
                            className={`material-icons ${isActive ? 'text-primary-300' : 'text-black-200'}`}
                        >
                            star
                        </span>
                    );
                })}
            </div>
        );
    };

    return (
        <div style={{ paddingTop: '110px' }}>
            <Nav isGreen={true} />
            <div className="container">
                <div className="py-16">
                    <div className="row">
                        <div className="col-lg-5">
                            <img
                                src={detailData.trail_image}
                                alt={detailData.trail_address}
                                className="img-fluid object-fit-cover detail-img rounded-24 mb-4"
                            />
                            <iframe
                                className="rounded-24"
                                src={detailData.trail_map_html}
                                width="100%"
                                height="240px"
                                style={{ border: '0' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map"
                            ></iframe>
                        </div>
                        <div className="col-lg-7">
                            <div className="detail-information bg-white rounded-24">
                                <div className="p-8">
                                    {/*標題*/}
                                    <div className="d-flex justify-content-between align-items-start mb-12">
                                        {/*地名 */}
                                        <div>
                                            <p className="sub1-medium text-primary-300 mb-2">
                                                {detailData.trail_address}
                                            </p>
                                            <h1 className="h1">{detailData.trail_name}</h1>
                                        </div>
                                        {/*按鈕 */}
                                        <div className="d-flex flex-column›">
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary-300 p-3 d-flex justify-content-center align-items-center me-3"
                                            >
                                                <span className="material-symbols-outlined m-0">
                                                    favorite
                                                </span>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary-300 p-3 d-flex justify-content-center align-items-center me-3"
                                            >
                                                <span className="material-symbols-outlined me-2">
                                                    add_circle
                                                </span>
                                                <p>加入行程</p>
                                            </button>
                                        </div>
                                    </div>
                                    {/*資訊*/}
                                    <div>
                                        <div className="pb-6 mb-6 border-bottom border-black-100">
                                            <div className="row row-cols-3 ">
                                                <div className="col border-end border-black-100">
                                                    <p className="mb-2 body3-regular text-primary-300">
                                                        難度
                                                    </p>
                                                    <div className="d-flex align-items-center">
                                                        <p className="sub1-medium me-1 ">
                                                            {detailData.trail_difficulty}
                                                        </p>
                                                        <StarRating
                                                            rating={detailData.trail_difficulty}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col border-end border-black-100">
                                                    <p className="mb-2 body3-regular text-primary-300">
                                                        長度
                                                    </p>
                                                    <p className="sub1-medium">
                                                        {detailData.trail_length}
                                                    </p>
                                                </div>
                                                <div className="col">
                                                    <p className="mb-2 body3-regular text-primary-300">
                                                        建議時間
                                                    </p>
                                                    <p className="sub1-medium">
                                                        {detailData.trail_hour}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pb-6  border-bottom border-black-100">
                                            <p className="body1-regular">
                                                {detailData.trail_description}
                                            </p>
                                        </div>
                                        {/*表格 */}
                                        <div className="mb-16">
                                            <div className="border-bottom border-black-100">
                                                <div className="row py-3 ">
                                                    <div className="col-lg-3">
                                                        <p className="body2-medium text-primary-300">
                                                            海拔高度
                                                        </p>
                                                    </div>
                                                    <div className="col-lg-9">
                                                        <p className="body2-medium text-black-800">
                                                            {detailData.trail_altitude} 公尺
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-bottom border-black-100">
                                                <div className="row py-3 ">
                                                    <div className="col-lg-3">
                                                        <p className="body2-medium text-primary-300">
                                                            路面材質
                                                        </p>
                                                    </div>
                                                    <div className="col-lg-9">
                                                        <p className="body2-medium text-black-800">
                                                            {detailData.trail_road_condition}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-bottom border-black-100">
                                                <div className="row py-3 ">
                                                    <div className="col-lg-3">
                                                        <p className="body2-medium text-primary-300">
                                                            所屬系統
                                                        </p>
                                                    </div>
                                                    <div className="col-lg-9">
                                                        <p className="body2-medium text-black-800">
                                                            {detailData.trail_system}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-bottom border-black-100">
                                                <div className="row py-3 ">
                                                    <div className="col-lg-3">
                                                        <p className="body2-medium text-primary-300">
                                                            管理單位
                                                        </p>
                                                    </div>
                                                    <div className="col-lg-9">
                                                        <p className="body2-medium text-black-800">
                                                            {detailData.trail_office}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-bottom border-black-100">
                                                <div className="row py-3 ">
                                                    <div className="col-lg-3">
                                                        <p className="body2-medium text-primary-300">
                                                            電話
                                                        </p>
                                                    </div>
                                                    <div className="col-lg-9">
                                                        <p className="body2-medium text-black-800">
                                                            {detailData.trail_tel}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="bg-primary-50 text-primary-300 body2-bold px-3 py-1 rounded-20 me-2">
                                                {detailData.trail_system}
                                            </span>
                                            <span className="bg-primary-50 text-primary-300 body2-bold px-3 py-1 rounded-20 me-2">
                                                {detailData.trail_region}
                                            </span>
                                            {detailData.trail_tags?.map((item, index) => {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="bg-primary-50 text-primary-300 body2-bold px-3 py-1 rounded-20 me-2"
                                                    >
                                                        {item}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrailDetail;
