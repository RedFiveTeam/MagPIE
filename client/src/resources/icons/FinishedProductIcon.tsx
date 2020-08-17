import * as React from 'react';
import theme from '../theme';

export const FinishedProductIcon: React.FC = () => {
  const pathD = 'M8.56641 14.5L9.12891 13.8828L10.3398 16H11.9648L10.043 12.8281L11.9648 10.3125H10.2695L9.04297 12.0' +
    '977L8.56641 12.8203V10.3125H7.19531V16H8.56641V14.5Z';
  const pathD1 = 'M15.3828 14.2695L14.1133 10.3125H12.3125V16H13.6836V14.6719L13.5508 11.9492L14.9297 16H15.8359L17.2' +
    '109 11.9531L17.0781 14.6719V16H18.4531V10.3125H16.6484L15.3828 14.2695Z'
  const pathD2 = 'M23.0859 14.9453H20.6992V10.3125H19.3281V16H23.0859V14.9453Z';
  const pathD3 = 'M6.53518 0C6.20083 0 5.8886 0.167101 5.70313 0.4453L4 3H1C0.447715 3 0 3.44772 0 4V22C0 22.5523 0.4' +
    '47716 23 1 23H29C29.5523 23 30 22.5523 30 22V4C30 3.44772 29.5523 3 29 3H16L14.2969 0.4453C14.1114 0.167101 13.7' +
    '992 0 13.4648 0H6.53518ZM5.07037 5L7.07037 2H12.9296L14.9296 5H28V21H2V5H5.07037Z';

  return (
    <svg width='30' height='23' viewBox='0 0 30 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d={pathD} fill={theme.color.primaryButton}/>
      <path d={pathD1} fill={theme.color.primaryButton}/>
      <path d={pathD2} fill={theme.color.primaryButton}/>
      <path fillRule={'evenodd'} clipRule={'evenodd'} d={pathD3} fill={theme.color.primaryButton}/>
    </svg>
  )
}
