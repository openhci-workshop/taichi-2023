"use client"

import React, {useState} from 'react'
import classnames from 'classnames';
import ICalendarLink from "react-icalendar-link";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import EventIcon from '@mui/icons-material/Event';
import HelpIcon from '@mui/icons-material/Help';
import StarIcon from '@mui/icons-material/Star';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import NavBar from '@/components/organisms/NavBar'
import SectionTitle from '@/components/molecules/SectionTitle';

import { ThemeProvider } from '@mui/material/styles';
import theme from '@/themes/theme';
import { Aldrich } from 'next/font/google';
import styles from './styles.module.scss'

const aldrich = Aldrich({
	weight: ['400'],
	subsets: ['latin'],
});

const agenda1 = [
  {
    "time": "08:30 - 09:00",
    "title": "Registration",
    "subtitle": null,
    "speaker": null,
    "location": null,
    "live": null,
    "content": null,
  },
  {
    "time": "09:00 - 09:30",
    "title": "Opening Remarks",
    "subtitle": null,
    "speaker": null,
    "location": null,
    "live": null,
    "content": null,
  },
  {
    "time": "09:30 - 10:30",
    "title": "Opening Keynote",
    "subtitle": "The LLM (Large Language Model) Revolution: Implications from Chatbots and Tool-use to Reasoning",
    "link": "/keynote/#1",
    "speaker": "Ed Chi, Distinguished Scientist, Google DeepMind",
    "location": "R103",
    "live": "R101, R102",
    "content": null,
  },
  {
    "time": "10:30 - 10:50",
    "title": "Coffee Break",
    "subtitle": null,
    "speaker": null,
    "location": null,
    "live": null,
    "content": null,
  },
  {
    "time": "10:50 - 11:50",
    "title": "Paper Session",
    "subtitle": "Fiction and Fabrication: Designing and Fabricating Fictional Experiences",
    "speaker": "Chair: Chaung-Wen You",
    "location": "R103",
    "live": "R101, R102",
    "content": [
      {
        "type": "talk",
        "time": "10:50 - 11:02",
        "title": "Envisioning the Intersection of AI and Playable Cities: An Exploratory Study of Designing AI-embedded Urban Play",
        "speaker": "Peng-Kai Hung, Hui-Chun Yang, Shi-Ling Zhang, Yu-Hong Liu, Shu-Heng Tsai and Rung-Huei Liang"
      },
      {
        "type": "talk",
        "time": "11:02 - 11:14",
        "title": "科幻小說與日常經驗的虛構寫作探索",
        "speaker": "Bowen Kong, Rung-Huei Liang, Peng-Kai Hung, Yen-Chen Chen, I-Hao Liao and Li-Yuan Chiou"
      },
      {
        "type": "talk",
        "time": "11:14 - 11:26",
        "title": "AlterConnect：個人數據驅動的 AI 虛構自我之互動經驗探究",
        "speaker": "Yen-Chen Chen and Rung-Huei Liang"
      },
      {
        "type": "talk",
        "time": "11:26 - 11:38",
        "title": "The effect of anthropomorphism and attribution plausibility of agent on human trust",
        "speaker": "Jia-Shiun Tsai, Yihsiu Chen and Po-Liang Chen"
      },
      {
        "type": "talk",
        "time": "11:38 - 11:50",
        "title": "FeltingReel: Density Varying Soft Fabrication with Reeling and Felting",
        "speaker": "Ping-Yi Wang and Lung-Pan Cheng"
      },
    ],
  },
  {
    "time": "11:50 - 13:20",
    "title": "Lunch Break",
    "subtitle": null,
    "speaker": null,
    "location": null,
    "live": null,
    "content": null,
  },
  {
    "time": "13:20 - 16:20",
    "title": "Posters and Demos - Day 1",
    "subtitle": null,
    "speaker": null,
    "location": "Hallway, R105, R107",
    "live": null,
    "content": [
      {
        "type": "poster",
        "time": "",
        "title": "具實物觸感的多模式人機互動體驗實境系統",
        "speaker": "Hsiao-Fang Chang, Jin-Huan Xue and Jing-Jing Fang"
      },
      {
        "type": "poster",
        "time": "",
        "title": "Gift 4 U – Novel and Gamified Gift-giving Platform",
        "speaker": "Ji-Lun Peng, Yung-Ching Yang, Hsiao-Yuan Chin, Pin-Yu Ho and Yun-Chin Hsu"
      },
      {
        "type": "poster",
        "time": "",
        "title": "聊聊跟蹤騷擾：S_Talker跟騷資訊服務平台之原型設計",
        "speaker": "Yu-Jie Lin, Ching-Shiuan Chen and Wei Jeng"
      },
      {
        "type": "poster",
        "time": "",
        "title": "霍格沃茨的語文學習之旅— 初探虛擬同伴設計計畫",
        "speaker": "劉芷均, 許嘉文, 陳心葳"
      },
      {
        "type": "poster",
        "time": "",
        "title": "改變大學生目標實踐行為：結合人工智能與遊戲化之應用程式設計",
        "speaker": "Tzu Yu Huang, Shao Yu Yen, Yi Chin Li, Hsuan Hsuan Su and Jung Chien"
      },
      {
        "type": "poster",
        "time": "",
        "title": "Effects of Actions and Tactile Feedback on Ring Fit Adventure Users’ Body Ownership and Agency toward the Avatar",
        "speaker": "Yi-Jen Chung and Jiunde Lee"
      },
      {
        "type": "poster",
        "time": "",
        "title": "提升居家防震素養：透過 Augmented Reality 推廣居家地震整備行為的策略採取",
        "speaker": "鍾宜蓁, 許任筑, 昌易臻"
      },
      {
        "type": "poster",
        "time": "",
        "title": "漫畫元素輔助虛擬實境敘事之設計考量",
        "speaker": "Tsai-Yuan Huang and Neng-Hao Yu"
      },
      {
        "type": "poster",
        "time": "",
        "title": "可握式虛擬釣魚互動系統原型設計",
        "speaker": "林士喆, 許素朱"
      },
      {
        "type": "poster",
        "time": "",
        "title": "BilliVRd: Virtual Reality Billiards Learning System  Combining Action Analysis and Path Simulation",
        "speaker": "Ming-Da Tsai, Po-Hung Chiang, Chuan-Kai Yang and Tse-Yu Pan"
      },
      {
        "type": "poster",
        "time": "",
        "title": "Toward EEG-Based Objective Assessment of Emotion Intensity",
        "speaker": "Pin-Han Ho, Yong-Sheng Chen and Chun-Shu Wei"
      },
      {
        "type": "poster",
        "time": "",
        "title": "設計減緩社交焦慮療程之虛擬實境遊戲化系統",
        "speaker": "林旻萱, 馮雅婕, 劉靖絹, 程芙茵"
      },
      {
        "type": "poster",
        "time": "",
        "title": "Mind and Body in VR: Introducing a Detachable and Modularized EEG Device for VR Embodied Cognition Assessment",
        "speaker": "Shou-En Tsai, Li-Jen Chang, Hsin-Yi Shao, Nian-Chia Lee, Ping-Yen Chan, Shao-Wei Lu and Chun-Shu Wei"
      },
      {
        "type": "poster",
        "time": "",
        "title": "運用行動裝置結合擴增實境創建校浪虛實互動訓練系統",
        "speaker": "王綉孋, 楊詠淇, 邱郁棻, 王瑋, 許有真"
      },
      {
        "type": "poster",
        "time": "",
        "title": "Comparing the Effects of Virtual Reality and Real-world Training on Evaluating Children's Motor Coordination",
        "speaker": "Kai-Hsun Chiu, Bo-Jheng Wu, Yu-Hsin Hsu and Yi-Jheng Huang"
      },
      {
        "type": "poster",
        "time": "",
        "title": "以存在催眠治療理論結合生成式AI的療癒型對話機器人",
        "speaker": "莊皓翔, 陳宜秀"
      },
      {
        "type": "poster",
        "time": "",
        "title": "User Interaction Design for Desktop Metaverse",
        "speaker": "Po-Hsiang Hsu, Hong-Rui Qian and Yi-Ping Hung"
      },
      {
        "type": "poster",
        "time": "",
        "title": "提升惜食意識，改善剩食行為：手機應用程式結合智慧冰箱之互動設計",
        "speaker": "卓訢妤, 莊珈毓, 葉聿昕, 何芳語, 許有真"
      },
      {
        "type": "poster",
        "time": "",
        "title": "基於圖像的夢境追蹤系統",
        "speaker": "李景全, 黃薰磊, 程芙茵"
      },
      {
        "type": "poster",
        "time": "",
        "title": "虛擬實境畫面投放效果分析及優化設計",
        "speaker": "Yu-Jung Liu and Neng-Hao Yu"
      },
      {
        "type": "poster",
        "time": "",
        "title": "商用型腦波裝置在腦波超掃描研究中的應用",
        "speaker": "Jen-Yu Huang, Yu-Ting Yen and Fu-Yin Cherng"
      },
      {
        "type": "demo",
        "time": "",
        "title": "虛擬實境中運用傳統布袋戲操偶手勢互動創作",
        "speaker": "彭家駒, 劉人愷, 神雨丹, 顏瑋辰, 羅曉愉, 許峻誠"
      },
      {
        "type": "demo",
        "time": "",
        "title": "Slices-to-Shape: Exploring Layer-based Shape Display for Haptic Rendering in Virtual Reality",
        "speaker": "張峻維, 李佩恩, 袁子晴, 韓秉軒, 吳可久, 曹筱玥"
      },
      {
        "type": "demo",
        "time": "",
        "title": "HomoSpace—基於骨架節點幾何關係與平面影像之空間座標轉換進行視覺上之遠端臨場互動體驗",
        "speaker": "陳昱伶, 蕭以訢, 黃裕雄, 王連晟, 孫士韋"
      },
      {
        "type": "demo",
        "time": "",
        "title": "虛擬實境於模擬舞台演出之應用",
        "speaker": "Ssuhsuan Wu, Kaiting Wang, Chiachen Chiang, Hsinyu Chang, Chengyun Yeh and MinChun Hu"
      },
      {
        "type": "demo",
        "time": "",
        "title": "混合實境輔助語言學習之體驗設計研究",
        "speaker": "Chia Hsu, Yu Chen, Yu-Jung Liu, Yu-Cheng Chang, Min-Jui Lee, Neng-Hao Yu and Mike Y. Chen"
      },
      {
        "type": "demo",
        "time": "",
        "title": "FlipWatch：基於智慧手錶透過手勢和振動輸入文字",
        "speaker": "Shih-Yin Chen and Chi-Fu Huang"
      },
      {
        "type": "demo",
        "time": "",
        "title": "FeltingReel: Density Varying Soft Fabrication with Reeling and Felting (Paper)",
        "speaker": "Ping-Yi Wang and Lung-Pan Cheng"
      },
      {
        "type": "demo",
        "time": "",
        "title": "探討以虛擬實境模擬思覺失調症狀於大眾同理心與態度的影響 (Paper)",
        "speaker": "Jen-Chu Hsu, Wernhuar Tarng and Kuo-Liang Ou"
      }
    ]
  },
  {
    "time": "16:20 - 17:20",
    "title": "Afternoon Keynote",
    "subtitle": "Fun with Creative Technology and Design",
    "link": "/keynote/#2",
    "speaker": "Ellen Yi-Luen Do, Professor, ATLAS Institute at CU Boulder",
    "location": "R103",
    "live": "R101, R102",
    "content": null,
  },
  {
    "time": "18:00 - 21:00",
    "title": "Banquet",
    "subtitle": "ILLUME TAIPEI",
    "link": "https://goo.gl/maps/SNScSfaGNHBbjehh8",
    "speaker": null,
    "location": "ILLUME TAIPEI (茹曦酒店) Sunny Buffet",
    "live": null,
    "content": null,
  }
]

const agenda2 = [
  {
    "time": "09:00 - 09:30",
    "title": "Registration",
    "subtitle": null,
    "speaker": null,
    "location": null,
    "live": null,
    "content": null,
  },
  {
    "time": "09:30 - 10:30",
    "title": "Paper Session",
    "subtitle": "Notification and Negotiation: Understanding User Experience and Perception",
    "speaker": "Chair: Wenn-Chieh (Joe) Tsai",
    "location": "R103",
    "live": "R101, R102, R104",
    "content": [
      {
        "type": "talk",
        "time": "09:30 - 09:42",
        "title": "What Kinds of Experiences Do You Desire? Desired Experiences of Contributors to Location-Based Mobile Crowdsourcing",
        "speaker": "Fang-Yu Lin, Pei-Hua Tsai, Chia-Yi Lee, Yi-Ting Ho, Yao-Kuang Chen, Grace Yu-Chun Yen and Yung-Ju Chang"
      },
      {
        "type": "talk",
        "time": "09:42 - 09:54",
        "title": "Unveiling the Multifaceted Landscape of Family Sleep: Exploring the Impact of Diverse Priorities and Values on Children's Sleep",
        "speaker": "Ju-Yun Tseng, Yang Hong, Yun-Hsuan Fang and Ying-Yu Chen"
      },
      {
        "type": "talk",
        "time": "09:54 - 10:06",
        "title": "NotiSpeculate: Exploring How Knowing The Notification Information In Advance Affects Users Treat Them",
        "speaker": "Tang-Jie Chang, Jie Tsai, Zi-Xun Tang, Li-Ting Su and Yung-Ju Chang"
      },
      {
        "type": "talk",
        "time": "10:06 - 10:18",
        "title": "智慧家居物聯網：親子家庭能源使用之理解與協商",
        "speaker": "Wei-Chien Chang, Yang Hong, En-Kai Chang, Yuan-Chi Cheng and Ying-Yu Chen"
      },
      {
        "type": "talk",
        "time": "10:18 - 10:30",
        "title": "探索ChatGPT在LGBTQ+群體性傾向與情感認同需求中的角色： 期望、挑戰與支持",
        "speaker": "En-Kai Chang and Ying-Yu Chen"
      },
    ],
  },
  {
    "time": "10:30 - 10:50",
    "title": "Coffee Break",
    "subtitle": null,
    "speaker": null,
    "location": null,
    "live": null,
    "content": null,
  },
  {
    "time": "10:50 - 11:50",
    "title": "Paper Session",
    "subtitle": "Interface and Interaction: Enhancing Interactive Experiences",
    "speaker": "Chair: Hsin-Ruey (Ray) Tsai",
    "location": "R103",
    "live": "R101, R102, R104",
    "content": [
      {
        "type": "talk",
        "time": "10:50 - 11:02",
        "title": "BetterMinton Service: Analyzing the Badminton Service using Open Kinetic Chain",
        "speaker": "Eden Xu and Lung-Pan Cheng"
      },
      {
        "type": "talk",
        "time": "11:02 - 11:14",
        "title": "手指人偶：基於手指走路的虛擬替身操作介面",
        "speaker": "梁中瀚, 黃大源, 陳炳宇"
      },
      {
        "type": "talk",
        "time": "11:14 - 11:26",
        "title": "UltrAir：探索使用超聲波和空氣射流提供無接觸式混合觸覺反饋的設計方法",
        "speaker": "孫振國, 高語萱, 蔡青邑, 黃大源, 陳彥仰, 陳炳宇"
      },
      {
        "type": "talk",
        "time": "11:26 - 11:38",
        "title": "Lip-Joystick: using lip as an input modality",
        "speaker": "Yu-Chiao Lo and Liwei Chan"
      },
      {
        "type": "talk",
        "time": "11:38 - 11:50",
        "title": "探討虛擬化身與遊戲化在線上學習對社會臨場感與學習成效之影響",
        "speaker": "黃書藝, 白瑋婷, 陳姿吟"
      },
    ],
  },
  {
    "time": "11:50 - 13:20",
    "title": "Lunch Break",
    "subtitle": null,
    "speaker": null,
    "location": null,
    "live": null,
    "content": null,
  },
  {
    "time": "13:20 - 16:20",
    "title": "Posters and Demos - Day 2",
    "subtitle": null,
    "speaker": null,
    "location": "Hallway, R105, R107",
    "live": null,
    "content": [
      {
        "type": "poster",
        "time": "",
        "title": "原宇宙的未來偶像！虛擬直播主互動下的滿意度初探",
        "speaker": "陳心葳, 陳信佑, 吳紘珺"
      },
      {
        "type": "poster",
        "time": "",
        "title": "MOBA類手遊新手教程之使用者經驗研究:以傳說對決為例",
        "speaker": "顏得育"
      },
      {
        "type": "poster",
        "time": "",
        "title": "擴增實境行銷方式對消費者購買意願的影響與使用者經驗研究—以L’Oreal 智慧美妝為例",
        "speaker": "林煜萁"
      },
      {
        "type": "poster",
        "time": "",
        "title": "對話機器人結合提問策略探究大學生批判思考意向—以柬埔寨人口販賣事件為例",
        "speaker": "Ya-Ting Chang and Guan-Ze Liao"
      },
      {
        "type": "poster",
        "time": "",
        "title": "Non-identity Specific vs. Identity Specific Read Receipts: How They Influence Satisfaction and Emotion in Work and Friends Group Chats",
        "speaker": "Shih-Han Wang and Natasha Kulawik"
      },
      {
        "type": "poster",
        "time": "",
        "title": "Understanding How Chatbots that Support People being Ghosted in Dating Apps Should be Designed",
        "speaker": "Cai-Ling Wang, Shu-Ting Chen and Yuan-Chi Tseng"
      },
      {
        "type": "poster",
        "time": "",
        "title": "以享樂與實用模型探索元宇宙廣告遊戲元素與顧客基礎品牌權益",
        "speaker": "王威, 白瑋婷, 黃書藝"
      },
      {
        "type": "poster",
        "time": "",
        "title": "An Explorative Study of User Behaviors in ChatGPT and Google Search",
        "speaker": "Hung-Chun Chang, Cheng-Yu Kuan, Tien-Yu Hsu, Han-Jhen Huang and Ruei-Siang Lin"
      },
      {
        "type": "poster",
        "time": "",
        "title": "「有愛無礙」即時通訊軟體Line群組作為線上支持團體與 帕金森氏症患者的互動",
        "speaker": "Wen-Ling Wang"
      },
      {
        "type": "poster",
        "time": "",
        "title": "以使用者經驗研究探討對話機器人輔助媒體識讀之可行性",
        "speaker": "蔡幸潔, 李峻德, 廖冠智"
      },
      {
        "type": "poster",
        "time": "",
        "title": "數位親子服務雛形設計與製作：以金融主題為探究領域",
        "speaker": "Yu-Nung Tsang, Shin-Yo Chen and Shu Yi Huang"
      },
      {
        "type": "poster",
        "time": "",
        "title": "AdJustMoment: Customize Your Ad Watching Experience",
        "speaker": "Yu-Rou Lin, Li-Lun Lin, Cheng-Hsun Wang and Yung-Ju Chang"
      },
      {
        "type": "poster",
        "time": "",
        "title": "食物的擬人化探索——以chatGPT為甜甜圈講故事為例",
        "speaker": "Bowen Kong and Rung-Huei Liang"
      },
      {
        "type": "poster",
        "time": "",
        "title": "虛擬代理人對話中的即饋行為對人信任之影響",
        "speaker": "Yu-An Chen and Yi-Hsiu Chen"
      },
      {
        "type": "poster",
        "time": "",
        "title": "探討機台設備人機介面設計軟體之需求—以新代科技公司 eHMI 人機客製軟體為例",
        "speaker": "蕭宇彤, 嚴霖, 成文瑄, 蔡欣樺, 吳家輝"
      },
      {
        "type": "poster",
        "time": "",
        "title": "Gen Z 使用者投資台股概況與 APP 使用行為調查",
        "speaker": "Wen Hsin Hsu and Chien Hui Liu"
      },
      {
        "type": "poster",
        "time": "",
        "title": "現今排班模式存在的溝通耗竭感及電子化如何提升效率之研究",
        "speaker": "朱韻年, 卓訢妤, 劉慧瑄, 王慧婷, 邱沛語"
      },
      {
        "type": "poster",
        "time": "",
        "title": "運動應用程式的使用者體驗對自我效能之影響 — 以walkr及pikmin bloom為例",
        "speaker": "Hsu Chuan Tsai, Shu Yi Huang and Yu Tung Hsiao"
      },
      {
        "type": "poster",
        "time": "",
        "title": "體育賽事主題遊戲設計元素對球迷自我實現與歸屬感影響之研究",
        "speaker": "白瑋婷, 陳信祐, 陳心葳"
      },
      {
        "type": "poster",
        "time": "",
        "title": "Digital Design Cards System: Facilitating Inter-Student Collaboration and Communication in Ideation",
        "speaker": "Cai-Ling Wang, Ya-Ching Chang and Yuan-Chi Tseng"
      },
      {
        "type": "poster",
        "time": "",
        "title": "青老高齡者使用社群媒體Facebook美食圖片貼文行為與動機之探討",
        "speaker": "Chiao-Ling Kuo 郭蕎菱, Hsiu-Ping Yueh 岳修平 and Weijane Lin 林維真"
      },
      {
        "type": "poster",
        "time": "",
        "title": "導航提升空間認知應用於汽車顯示",
        "speaker": "吳又成, 周述君, 田雅今, 呂定豪, 程芙茵"
      },
      {
        "type": "poster",
        "time": "",
        "title": "收證者在社群平台上的使用偏好：證書價值認知對分享習慣之影響",
        "speaker": "Hong Jiun Wu, Yu Kang Lai, En Kai Chang, Chia Yu Hung and Ling Chun Liu"
      },
      {
        "type": "poster",
        "time": "",
        "title": "IRB/REC審查申請使用者需求與偏好研究 -使用者經驗分析",
        "speaker": "鄭雅任, 蔡旭娟, 莊珈毓, 王采翎, 陳亮唯"
      },
      {
        "type": "OPEN HCI",
        "time": "",
        "title": "WORKA",
        "speaker": "陳育陞, 張恩愷, 徐芊綺, 林佳嫺, 周貞宜"
      },
      {
        "type": "OPEN HCI",
        "time": "",
        "title": "術術順心",
        "speaker": "郭宛欣, 邢恒馨, 藍于涵, 鄭知耘, 周知頤, 邱品蓉"
      },
      {
        "type": "OPEN HCI",
        "time": "",
        "title": "心球",
        "speaker": "何明明, 黃彌祐, 梁勝傑, 李昀潔, 蔡荺翎, 温詠淳"
      },
      {
        "type": "OPEN HCI",
        "time": "",
        "title": "SOUNDFIT",
        "speaker": "梁勝傑, 黃泊豪, 陳冠元, 陳奕瑄, 陳士茵, 郭宛欣, 陳暐臻, 李佩恩"
      },
      {
        "type": "OPEN HCI",
        "time": "",
        "title": "ALARM",
        "speaker": "陳信祐, 許育綸, 林瑞苓, 王彥婷, 鄭芳雯, 黃韻文, 張懿萱, 葉光筠"
      }
    ],
  },
  {
    "time": "15:20 - 16:20",
    "title": "Paper Session",
    "subtitle": "Simulacra and Simulation: Explore Diverse Virtual Worlds",
    "speaker": "Chair: Ping-Hsuan Han",
    "location": "R103",
    "live": "R101, R102, R104",
    "content": [
      {
        "type": "talk",
        "time": "15:20 - 15:32",
        "title": "虛擬代理人的相互性行為對信任之影響",
        "speaker": "Ting-Yu Lin, Yihsiu Chen and Chun-Feng Liao"
      },
      {
        "type": "talk",
        "time": "15:32 - 16:44",
        "title": "探討以虛擬實境模擬思覺失調症狀於大眾同理心與態度的影響",
        "speaker": "Jen-Chu Hsu, Wernhuar Tarng and Kuo-Liang Ou"
      },
      {
        "type": "talk",
        "time": "16:44 - 16:56",
        "title": "Confrontation in a Virtual World: Reactions in Virtual and Face-to-Face Interactions",
        "speaker": "Kuan-Yu Chou and Yu-Chen Hsu"
      },
      {
        "type": "talk",
        "time": "16:56 - 16:08",
        "title": "群際接觸於虛擬實境降低物種主義與肉食意願",
        "speaker": "陳鵬遠, 許有真"
      },
      {
        "type": "talk",
        "time": "16:08 - 16:20",
        "title": "探索虛擬場景變異性及時間限制視覺化對虛擬實境創意激發的影響",
        "speaker": "紀玥綺, 林云雲, 李旻叡, 畢南怡, 陳炳宇"
      },
    ],
  },
  {
    "time": "16:20 - 17:20",
    "title": "Closing Keynote",
    "subtitle": "Heads-Up Computing: Towards the Next Generation Interactive Computing Interaction",
    "link": "/keynote/#3",
    "speaker": "Shengdong Zhao, Associate Professor, National University of Singapore",
    "location": "R103",
    "live": "R101, R102, R104",
    "content": null,
  },
  {
    "time": "17:40 - 18:00",
    "title": "Award Ceremony and Closing Remarks",
    "subtitle": null,
    "speaker": null,
    "location": null,
    "live": null,
    "content": null,
  }
]

const RenderAccordion = (day, item, index, showPoster, setShowPoster, showDemo, setShowDemo, showOPEN, setShowOPEN) => {
  return (
    <Accordion
      key={index}
      style={{ 
        background: 'linear-gradient(90deg, rgba(244, 208, 63, 0.75) 0%, rgba(65, 150, 98, 0.75) 33.33%, rgba(0, 0, 0, 0.75) 100%)',
        border: '0.5px solid #fff',
        borderRadius: '16px',
        padding: '8px',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
        id={item.title}
      >
        <div className="flex flex-row w-full text-white items-center">
          <div className={classnames(aldrich.className, "basis-1/3 md:basis-1/5 md:text-center")}>
            {item.time}
          </div>
          <div className="flex flex-col basis-2/3 md:basis-4/5 gap-2">
            <div className="md:text-lg font-bold">
              {item.title}
            </div>
            <div className="flex flex-col md:flex-row gap-x-8 text-xs md:text-sm">
            {
              item.location && 
              <div className="flex flex-row items-center gap-1">
                <LocationOnIcon sx={{ width: "16px" }}/>
                {item.location}
              </div>
            }
            {
              item.live && 
              <div className="flex flex-row items-center gap-1">
                <LiveTvIcon sx={{ width: "16px" }}/>
                {item.live}
              </div>
            }
            </div>
          </div>
        </div>
      </AccordionSummary>
      {
        <AccordionDetails>
          {
            ( item.subtitle || item.speaker || item.content ) && 
            <div className="flex flex-row text-white px-4 md:px-8 py-4 rounded-xl items-center justify-between" style={{ background: "rgba(75, 75, 75, 0.33)" }}>
              <div className="flex flex-col gap-1">
                {
                  item.subtitle && 
                  (
                    item.link ? <div className="underline text-lg"><a href={item.link}>{item.subtitle}</a></div> : <div className="text-lg">{item.subtitle}</div>
                  )
                }
                {
                  item.speaker && 
                  <div className="text-sm text-slate-200">
                    {item.speaker}
                  </div>
                }
                {
                  item.content && 
                  (item.content[0].type === "poster" || item.content[0].type === "demo" || item.content[0].type === "OPEN HCI" ) &&
                  <div className="flex flex-row w-full items-center justify-center gap-1 my-4 font-bold">
                    <FilterAltIcon className="mr-0 md:mr-4" />
                    <Chip label="Poster" color="secondary" variant={showPoster ? "contained" : "outlined"} onClick={() => setShowPoster(!showPoster)}/>
                    <Chip label="Demo" color="secondary" variant={showDemo ? "contained" : "outlined"} onClick={() => setShowDemo(!showDemo)}/>
                    <Chip label="OPEN" color="secondary" variant={showOPEN ? "contained" : "outlined"} onClick={() => setShowOPEN(!showOPEN)}/>
                  </div>
                }
              </div>
              <ICalendarLink 
                event={
                  {
                    title: "TAICHI 23 | " + item.title,
                    description: item.title + ", " + item.speaker + "; location: " + item.location + ", live:" + item.live,
                    startTime: "2023-08-" + day + "T"+ item.time.split(" - ")[0] +":00+08:00",
                    endTime: "2023-08-" + day + "T" + item.time.split(" - ")[1] + ":00+08:00"
                  }
                }
              >
                <EventIcon sx={{ width: "20px" }} />
              </ICalendarLink>
            </div>
          }
          {
            item.content &&
            <div className="text-white">
              {
                item.content.filter(x => 
                  (showPoster && x.type === "poster" || showDemo && x.type === "demo" || showOPEN && x.type === "OPEN HCI") || (x.type === "talk")
                ).map((subitem, index) => {
                  return (
                    <div className="flex flex-row w-full my-4 items-center mt-6 pb-6" style={{ borderBottom: "0.5px solid #fff" }} key={index}>
                      <div className={classnames(aldrich.className, "basis-1/4 md:basis-1/5 md:text-center")}>
                        {
                          subitem.type === "talk" ? (
                            subitem.time
                          ) : (
                            subitem.type
                          )
                        }
                      </div>
                      <div className="flex flex-col text-sm md:text-base basis-3/4 md:basis-4/5 gap-2">
                        <div className="flex flex-row gap-x-1 items-center">
                          {
                            subitem.award && <div className="flex flex-row gap-x-1 items-center px-2 py-1 bg-slate-500 rounded"><StarIcon />{subitem.award}</div>
                          }
                          {subitem.title}
                        </div>
                        <div className="text-xs md:text-sm text-slate-200">
                          {subitem.speaker}
                        </div>
                      </div>
                      {
                        subitem.type === "talk" &&
                        <ICalendarLink 
                          event={
                            {
                              title: "TAICHI 23 | " + item.title + " - " + subitem.title,
                              description: subitem.title + ", " + subitem.speaker + "; location: " + item.location + ", live:" + item.live,
                              startTime: "2023-08-" + day + "T"+ subitem.time.split(" - ")[0] +":00+08:00",
                              endTime: "2023-08-" + day + "T" + subitem.time.split(" - ")[1] + ":00+08:00"
                            }
                          }
                          className="mr-1"
                        >
                          <EventIcon sx={{ width: "20px" }} />
                        </ICalendarLink>
                      }
                    </div>
                  )
                })
              }
            </div>
          }
        </AccordionDetails>
      }
    </Accordion>
  )
}

const Agenda = () => {
  const [value, setValue] = useState(0);
  const [showPoster, setShowPoster] = useState(true)
  const [showDemo, setShowDemo] = useState(true)
  const [showOPEN, setShowOPEN] = useState(true)
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setShowPoster(true);
    setShowDemo(true);
    setShowOPEN(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { borderRadius: "16px", backgroundColor: "rgba(0, 0, 0, 0.90)", } }}
      >
        <DialogContent>
          <div className="flex flex-col gap-4 md:gap-6 text-white py-4 px-2">
            <div className="flex flex-row gap-4">
              <ExpandMoreIcon />
              Expand agenda block
            </div>
            <div className="flex flex-row gap-4">
              <LocationOnIcon />
              Location for physical event
            </div>
            <div className="flex flex-row gap-4">
              <LiveTvIcon />
              Location for live broadcast
            </div>
            <div className="flex flex-row gap-4">
              <EventIcon />
              Download event information
            </div>
            <div className="flex flex-row gap-4">
              <FilterAltIcon />
              Filter poster, demo, and OPEN HCI demo
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className={classnames(styles.background)}>
        <NavBar />
        <div className="container mx-auto px-6 md:px-8 py-8 md:py-24 lg:py-36 relative">

          <SectionTitle titleZh="詳細議程" titleEn="Agenda" />
          
          <div className="flex flex-row w-full justify-between items-center mb-6 md:mb-10">
            <Tabs value={value} onChange={handleChange} textColor="white" indicatorColor="primary">
              <Tab label="Day 1" />
              <Tab label="Day 2" />
            </Tabs>
            <div className="mr-6">
              <HelpIcon onClick={() => setOpen(true)} style={{ cursor: "pointer" }} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
          {
            value == 0 &&
            agenda1.map((item, index) => RenderAccordion("19", item, index, showPoster, setShowPoster, showDemo, setShowDemo, showOPEN, setShowOPEN))
          }
          {
            value == 1 &&
            agenda2.map((item, index) => RenderAccordion("20", item, index, showPoster, setShowPoster, showDemo, setShowDemo, showOPEN, setShowOPEN))
          }
          </div>

        </div>
      </div>
    </ThemeProvider>
  )
}

export default Agenda