import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import theme from '../../resources/theme';
import { TextField } from '@material-ui/core';
import classNames from 'classnames';
import UserIcon from '../../resources/icons/UserIcon';
import MagpieFullLogo from '../../resources/icons/MagpieFullLogo';
import { useCookies } from 'react-cookie';

interface MyProps {
  className?: string;
}

// export const useStyles = makeStyles((localTheme: Theme) =>
//   createStyles({
//     input: {
//       textAlign: 'right',
//       background: theme.color.backgroundInput,
//       height: '48px',
//       borderRadius: '8px',
//       display: 'flex',
//     },
//     end: {
//       background: theme.color.backgroundUsernameSuffix,
//       height: '44px',
//       width: '127px',
//       borderBottomRightRadius: '7px',
//       borderTopRightRadius: '7px',
//     },
//   }),
// );

const cookieValidTimeInMS: number = 24*60*60*1000;

export const LoginDashboard: React.FC<MyProps> = (props) => {
  const [username, setUsername] = useState('');
  // const classes = useStyles();
  const [, setUserCookie] = useCookies(['username']);

  // setUserCookie('username', 'billy.bob.joe', {});

  const login = () => {
    setUserCookie(
      'username',
      username,
      {expires: new Date(new Date().getTime() + cookieValidTimeInMS)},
    );
  };

  return (
    <div className={props.className}>
      <div className={'login-container'}>
        <MagpieFullLogo/>
        <form className={'login-form'}
              onKeyPress={(e) => {
                if (e.which === 13) {
                  login();
                }
              }}
        >
          <div className={'username-row'}>
            <UserIcon className={'username-icon'}/>
            <TextField
              autoFocus
              className={classNames('username-input')}
              value={username}
              placeholder={'Enter SIPR Email'}
              InputProps={{
                disableUnderline: true,
              }}
              onChange={(event) => setUsername(event.target.value)}
            />
            <div className={'username-suffix'}><span>@mail.smil.mil</span></div>
          </div>
          <div
            className={classNames('no-select', 'submit-button')}
            onClick={login}
          >
            <span>Sign In</span>
          </div>
          <div
            className={classNames('no-select', 'create-account-button')}
          >
            Don't have an account?
          </div>
        </form>
      </div>
    </div>
  );
};

export const StyledLoginDashboard = styled(LoginDashboard)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: ${theme.color.backgroundLoading};
  font-family: ${theme.font.familyRow};
  font-weight: ${theme.font.weightMedium};
  font-size: ${theme.font.sizeRegion};
  color: ${theme.color.fontActive};
  
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .username-row {
    background: ${theme.color.backgroundInput};
    height: 48px;
    width: 384px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 2px;
    border-radius: 8px;
    margin-top: 10px;
  }
  
  .username-icon {
    margin: 16px;
  }
  
  .username-input {
    width: 199px;
  }
  
  input {
    text-align: right;
  }
  
  .username-suffix {
    background: ${theme.color.backgroundUsernameSuffix};
    height: 44px;
    width: 127px;
    border-bottom-right-radius: 7px;
    border-top-right-radius: 7px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: ${theme.color.fontUsernameSuffix};
  }
  
  .submit-button {
    background: ${theme.color.backgroundInput};
    height: 48px;
    width: 384px;
    margin-top: 28px;
    margin-bottom: 28px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    
    :hover {
      background: ${theme.color.backgroundUsernameSuffix};
    }
  }
  
  .create-account-button {
    text-align: center;
    color: ${theme.color.loginIcon};
    cursor: pointer;
    
    :hover {
      text-shadow: 0 0 8px rgba(8, 114, 179, 0.75);
    }
  }
`;
