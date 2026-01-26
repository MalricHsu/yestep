// 引入特色景觀步道圖片
import flower from '../assets/images/home/landscape-flower.svg';
import waterfall from '../assets/images/home/landscape-waterfall.svg';
import stargazing from '../assets/images/home/landscape-stargazing.svg';
import sunrise from '../assets/images/home/landscape-sunrise.svg';
import sunset from '../assets/images/home/landscape-sunset.svg';
import cloud from '../assets/images/home/landscape-cloud.svg';
import birdwatching from '../assets/images/home/landscape-birdwatching.svg';
import sacredTree from '../assets/images/home/landscape-sacredtree.svg';

const landscapeData = [
    {
        id: 1,
        landscapeName: '賞花',
        img: flower,
        tag: 'flower',
        column: 'left',
        alt: '盛開的五顏六色花卉景觀',
    },
    {
        id: 2,
        landscapeName: '瀑布',
        img: waterfall,
        tag: 'waterfall',
        column: 'left',
        alt: '壯麗瀑布景觀',
    },
    {
        id: 3,
        landscapeName: '觀星',
        img: stargazing,
        tag: 'stargazing',
        column: 'left',
        alt: '滿天星空景觀',
    },
    {
        id: 4,
        landscapeName: '日出',
        img: sunrise,
        tag: 'sunrise',
        column: 'center',
        alt: '照耀大地的日出景觀',
    },
    {
        id: 5,
        landscapeName: '晚霞',
        img: sunset,
        tag: 'sunset',
        column: 'center',
        alt: '燦爛迷人的晚霞景觀',
    },
    {
        id: 6,
        landscapeName: '雲海',
        img: cloud,
        tag: 'cloud',
        column: 'right',
        alt: '壯闊的洶湧雲海景觀',
    },
    {
        id: 7,
        landscapeName: '賞鳥',
        img: birdwatching,
        tag: 'birdwatching',
        column: 'right',
        alt: '有著多彩羽毛的小鳥',
    },
    {
        id: 8,
        landscapeName: '神木',
        img: sacredTree,
        tag: 'sacredTree',
        column: 'right',
        alt: '參天神木景觀',
    },
];

// 分類：左中右三欄的資料
const left = landscapeData.filter((item) => item.column === 'left');
const center = landscapeData.filter((item) => item.column === 'center');
const right = landscapeData.filter((item) => item.column === 'right');

// 匯出
export const landscapeColumns = {
    left: left,
    center: center,
    right: right,
};
