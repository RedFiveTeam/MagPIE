import * as React from 'react';
import theme from '../theme';

const pathD1 = 'M8.32812 14.8672H6.59375V11.7422H8.32812C8.84375 11.7422 9.23438 11.8828 9.5 12.1641C9.76562 12.4401 ' +
  '9.89844 12.8229 9.89844 13.3125C9.89844 13.8021 9.76562 14.1849 9.5 14.4609C9.23958 14.7318 8.84896 14.8672 8.3281' +
  '2 14.8672Z';

const pathD2 = 'M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.715' +
  '73 30 15 30ZM6.59375 16.9844H8.07812L10.0859 21H13.0234V20.8828L10.6484 16.2969C11.3307 15.974 11.8307 15.5521 12.' +
  '1484 15.0312C12.4714 14.5104 12.6328 13.8542 12.6328 13.0625C12.6328 11.9688 12.2526 11.1224 11.4922 10.5234C10.73' +
  '18 9.92448 9.67708 9.625 8.32812 9.625H3.85156V21H6.59375V16.9844ZM17.0312 16.4688H21.4531V14.3594H17.0312V11.7422' +
  'H21.8984V9.625H14.2891V21H17.0312V16.4688ZM23.2266 21H25.9609V9.625H23.2266V21Z';

interface MyProps {
  active: boolean;
}

const RfiInfoButton: React.FC<MyProps> = ({active}) => {
  return (
    <div>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={pathD1}
              fill={active ? theme.color.toggleActive : theme.color.primaryButton}/>
        <path fillRule={'evenodd'} clipRule={'evenodd'} d={pathD2}
              fill={active ? theme.color.toggleActive : theme.color.primaryButton}/>
      </svg>
    </div>
  );
};

export default RfiInfoButton;
