import diffCard01 from '../assets/images/home/diffcard-01.png';
import diffCard02 from '../assets/images/home/diffcard-02.png';
import diffCard03 from '../assets/images/home/diffcard-03.png';
import diffCard04 from '../assets/images/home/diffcard-04.png';
import diffCard05 from '../assets/images/home/diffcard-05.png';

const diffData = [
    {
        id: 1,
        image: diffCard01,
        title: '休閒級',
        alt: '休閒級圖片',
        altitude: '1,000 公尺以下',
        equipment: '帶水與少許糧食',
        description: '全家皆宜，坡度平緩且設施完善，路面平整好走。',
    },
    {
        id: 2,
        image: diffCard02,
        title: '入門級',
        alt: '入門級圖片',
        altitude: '1,000 公尺 ~ 2,000 公尺',
        equipment: '帶水與適量糧食',
        description: '有些稍難路段，設施相對完善，路面平整。',
    },
    {
        id: 3,
        image: diffCard03,
        title: '健行級',
        alt: '健行級圖片',
        altitude: '2,000 公尺 ~ 3,000 公尺',
        equipment: '需具備登山裝備如糧食、睡袋、炊煮設備',
        description: '有些路段需要事先申請許可，設施相對完善。',
    },
    {
        id: 4,
        image: diffCard04,
        title: '挑戰級',
        alt: '挑戰級圖片',
        altitude: '2,000 公尺 ~ 3,000 公尺',
        equipment: '需具備登山裝備如糧食、睡袋、炊煮設備',
        description: '坡度陡峭，多條路段需要申請許可，氣溫變化大。',
    },
    {
        id: 5,
        image: diffCard05,
        title: '專業級',
        alt: '專業級圖片',
        altitude: '3,000 公尺以上',
        equipment: '需具備登山裝備如糧食、睡袋、炊煮設備',
        description: '氣溫變化大，路況通常不佳，有許多困難和危險路段，需事先申請許可。',
    },
];

const DiffCardList = () => (
    <ul className="diffcard__list list-unstyled gap-4 gap-lg-6 ">
        {diffData.map((item) => (
            <li className="diffcard__card">
                <div className="diffcard__content bg-primary-100">
                    <div className="d-flex flex-column justify-content-center align-items-center p-4">
                        <img src={item.image} className=" mb-3" alt={item.alt} />
                        <h4 className="fs-4 mb-3 text-primary-300">{item.title}</h4>
                    </div>
                    <div className="diffcard__overlay bg-primary-100">
                        <div className="diffcard__row body3-regular mb-2">
                            <span className="diffcard__label fw-bold fs-8">海拔高度</span>
                            <p className="diffcard__text">{item.altitude}</p>
                        </div>

                        <div className="diffcard__row body3-regular mb-2">
                            <span className="diffcard__label fw-bold fs-8">裝備</span>
                            <p className="diffcard__equip">{item.equipment}</p>
                        </div>

                        <div className="diffcard__row body3-regular">
                            <span className="diffcard__label fw-bold fs-8">步道描述</span>
                            <p className="diffcard__desc">{item.description}</p>
                        </div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
);

export default DiffCardList;
