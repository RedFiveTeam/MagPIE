import * as React from 'react';
import styled from 'styled-components';

interface MyProps {
  className?: string
}

const MagpieFullLogo: React.FC<MyProps> = (props: MyProps) => {
  return (
    <Wrapper className={props.className}>
      <svg width="126" height="209" viewBox="0 0 126 209" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M63.4389 164.501C86.7359 164.501 105.622 145.615 105.622 122.318C105.622 99.0207 86.7359 80.1348 63.4389 80.1348C40.1418 80.1348 21.2559 99.0207 21.2559 122.318C21.2559 145.615 40.1418 164.501 63.4389 164.501ZM63.4389 159.355C83.8943 159.355 100.477 142.773 100.477 122.317C100.477 101.862 83.8943 85.2795 63.4389 85.2795C42.9835 85.2795 26.4011 101.862 26.4011 122.317C26.4011 142.773 42.9835 159.355 63.4389 159.355Z"
              fill="url(#paint0_linear)"/>
        <path d="M84.6624 115.73L95.1868 118.55L82.3711 124.281L84.6624 115.73Z" fill="url(#paint1_linear)"/>
        <path d="M68.5242 100.243L84.6487 115.783L77.9403 140.819L53.7305 156.901L68.5242 100.243Z"
              fill="url(#paint2_linear)"/>
        <path d="M43.6621 111.874L69.3104 135.954L61.154 144.641L44.8014 129.289L43.6621 111.874Z"
              fill="url(#paint3_linear)"/>
        <path d="M58.6494 138.155L64.77 139.768L55.5932 193.356L39.9824 208.205L58.6494 138.155Z"
              fill="url(#paint4_linear)"/>
        <path d="M57.5 141.2L61.27 128.004L73.5901 119.195L81.6524 126.965L77.8674 141.09L62.7516 150.858L57.5 141.2Z"
              fill="url(#paint5_linear)"/>
        <path d="M12.3281 108.543L56.3598 112.258L55.3866 123.794L27.3133 121.425L12.3281 108.543Z" fill="#212E32"/>
        <path
          d="M3.86719 82.1343L58.1446 113.575L61.0334 128.198L46.7588 123.002L33.7497 115.796L16.4469 105.773L3.86719 82.1343Z"
          fill="#243237"/>
        <path d="M11.9707 57.1436L65.7216 111.001L63.5397 119.5L61.2697 128.001L19.0637 96.0692L11.9707 57.1436Z"
              fill="#374449"/>
        <path
          d="M42.2116 64.522L56.6835 92.3499L65.7222 111.004L63.8024 118.505L61.2728 128.006L49.3752 108.964L40.1484 91.2216L42.2116 64.522Z"
          fill="#4B575B"/>
        <path d="M17 194H67V196H17V194Z" fill="#009EFF"/>
        <path
          d="M34.1328 190H32.1758V178.727C32.1758 177.836 32.2305 176.746 32.3398 175.457H32.293C32.1055 176.215 31.9375 176.758 31.7891 177.086L26.0469 190H25.0859L19.3555 177.18C19.1914 176.805 19.0234 176.23 18.8516 175.457H18.8047C18.8672 176.129 18.8984 177.227 18.8984 178.75V190H17V173H19.6016L24.7578 184.914C25.1562 185.812 25.4141 186.484 25.5312 186.93H25.6016C25.9375 186.008 26.207 185.32 26.4102 184.867L31.6719 173H34.1328V190Z"
          fill="#009EFF"/>
        <path fillRule="evenodd" clipRule="evenodd"
              d="M51.5 190H49.3203L47.5391 185.289H40.4141L38.7383 190H36.5469L42.9922 173H45.0312L51.5 190ZM46.8945 183.52L44.3008 176C44.2148 175.766 44.1289 175.391 44.043 174.875H43.9961C43.918 175.352 43.8281 175.727 43.7266 176L41.0703 183.52H46.8945Z"
              fill="#009EFF"/>
        <path
          d="M67 188.57C65.3125 189.523 63.4375 190 61.375 190C58.9766 190 57.0352 189.117 55.5508 187.57C54.0742 186.023 53.3555 184.453 53.3555 181.906C53.3555 179.305 54.1758 177.172 55.8164 175.508C57.4648 173.836 59.5508 173 62.0742 173C63.9023 173 65.4375 173.297 66.6797 173.891V176.07C65.3203 175.211 63.7109 174.781 61.8516 174.781C59.9688 174.781 58.4258 175.43 57.2227 176.727C56.0195 178.023 55.418 179.703 55.418 181.766C55.418 183.891 55.957 185.195 57.0742 186.414C58.1914 187.625 59.707 188.23 61.6211 188.23C62.9336 188.23 64.0703 187.969 65.0312 187.445V182.734H61.3516V180.953H67V188.57Z"
          fill="#009EFF"/>
        <path fillRule="evenodd" clipRule="evenodd"
              d="M73.6699 187.307V196H71V173H77.2616C79.6985 173 81.5844 173.599 82.9193 174.796C84.2649 175.994 84.9377 177.683 84.9377 179.865C84.9377 182.046 84.1907 183.832 82.6968 185.222C81.2135 186.612 79.2058 187.307 76.6736 187.307H73.6699ZM73.6699 175.438V184.869H76.467C78.3105 184.869 79.7143 184.447 80.6785 183.602C81.6532 182.746 82.1406 181.543 82.1406 179.993C82.1406 176.956 80.3606 175.438 76.8007 175.438H73.6699Z"
              fill="white"/>
        <path d="M94.1394 173V175.31H91.9144V193.69H94.1394V196H87.0196V193.69H89.2445V175.31H87.0196V173H94.1394Z"
              fill="white"/>
        <path d="M110 196H97.9218V173H110V175.438H100.592V183.089H109V185.51H100.592V193.562H110V196Z" fill="white"/>
        <defs>
          <linearGradient id="paint0_linear" x1="21.2107" y1="105.329" x2="101.176" y2="149.192"
                          gradientUnits="userSpaceOnUse">
            <stop offset="0.09375" stopColor="#003C61"/>
            <stop offset="0.395833" stopColor="#1A86C9"/>
            <stop offset="0.854167" stopColor="#1A86C9"/>
            <stop offset="1" stopColor="#87C7EE"/>
          </linearGradient>
          <linearGradient id="paint1_linear" x1="82.3607" y1="115.795" x2="95.2962" y2="127.084"
                          gradientUnits="userSpaceOnUse">
            <stop stopColor="#09527F"/>
            <stop offset="1" stopColor="#409DD6"/>
          </linearGradient>
          <linearGradient id="paint2_linear" x1="67.5158" y1="104.391" x2="79.9168" y2="125.886"
                          gradientUnits="userSpaceOnUse">
            <stop stopColor="#595E6B"/>
            <stop offset="1" stopColor="#686F86"/>
          </linearGradient>
          <linearGradient id="paint3_linear" x1="43.5398" y1="115.966" x2="58.421" y2="142.421"
                          gradientUnits="userSpaceOnUse">
            <stop stopColor="#2E313A"/>
            <stop offset="1" stopColor="#72798E"/>
          </linearGradient>
          <linearGradient id="paint4_linear" x1="64.1786" y1="139.609" x2="45.4088" y2="209.659"
                          gradientUnits="userSpaceOnUse">
            <stop stopColor="#3D414E"/>
            <stop offset="0.796875" stopColor="#757B91"/>
          </linearGradient>
          <linearGradient id="paint5_linear" x1="62.5264" y1="151.507" x2="69.1514" y2="109.344"
                          gradientUnits="userSpaceOnUse">
            <stop stopColor="#5FAFDF"/>
            <stop offset="1" stopColor="#0067A7" stopOpacity="0.88"/>
          </linearGradient>
        </defs>
      </svg>
    </Wrapper>
  );
};

export default MagpieFullLogo;

const Wrapper = styled('div')`
  svg {
    filter: drop-shadow(-4px 2px 10px #000000);  
  }
`;
