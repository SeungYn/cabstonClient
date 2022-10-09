import React, { useEffect, useState } from 'react';
import styles from './login.module.css';

import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { InputAdornment } from '@mui/material';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const Login = ({
  onSignUp,
  onLogin,
  idDuplicateVerification,
  onEmailVerification,
  onAuthenticationNumberVerification,
}) => {
  //나중에 시간남아돌때 파트별로 객체로 묶어주기
  const [signup, setSignup] = useState(false);
  const [nickname, setNickname] = useState('');

  const [loginId, setloginId] = useState('');
  const [loginIdError, setLoginIdError] = useState(false);
  const [duplicateError, setduplicateError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVerification, setPasswordVerification] = useState('');
  const [passwordVerificationError, setPasswordVerificationError] =
    useState(false);

  const [sex, setSex] = useState('');
  const [university, setUniversity] = useState('');

  const [email, setEmail] = useState('');
  //이메일형식이 맞는지 확인
  const [emailVerification, setEmailVerification] = useState(false);
  //인증번호 받기를 누르면 인증번호 입력창 활성화
  const [authenicationAtivation, setAuthenticationAtivation] = useState(false);

  const [authenticationNumber, setAuthenticationNumber] = useState('');
  //인증번호가 맞는지 아닌지
  const [
    authenticationNumberVerification,
    setAuthenticationNumberVerification,
  ] = useState(false);
  const [dept, setDept] = useState('');
  const [sno, setSno] = useState('17');
  console.log('login.jsx');
  const onChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;

    switch (name) {
      case 'nickname':
        return setNickname(value);
      case 'loginId':
        if (signup) {
          idDuplicateVerification(value).then((data) => {
            console.log(data);
            console.log(data == 'false');
            return data === 'false'
              ? setduplicateError(true)
              : setduplicateError(false);
          });

          //setduplicateError(true);
        }
        return setloginId(value);
      case 'password':
        return setPassword(value);
      case 'passwordVerification':
        setPasswordVerification(value);
        if (value != password) {
          return setPasswordVerificationError(true);
        } else {
          return setPasswordVerificationError(false);
        }

      case 'sex':
        return setSex(value);
      case 'email':
        setEmail(value);
        if (emailValidation(value)) {
          return setEmailVerification(true);
        } else return setEmailVerification(false);

      case 'university':
        return setUniversity(value);
      case 'dept':
        return setDept(value);
      case 'sno':
        return setSno(value);
      case 'authenticationNumber':
        return setAuthenticationNumber(value);
      case 'signup':
        setloginId('');
        setPassword('');
        return setSignup(checked);
      default:
    }
  };

  //이메일 인증번호 받기 눌렀을때 활성화
  const onAuthenticationAtivate = async () => {
    onEmailVerification(email);
    setAuthenticationAtivation(true);
  };

  //이메일 정규식 체크
  const emailValidation = (value) => {
    const reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    return reg.test(value);
  };

  //인증번호가 맞는지 체크
  const onAuthenticationNumberVerification1 = async () => {
    console.log(authenticationNumber);
    const data = await onAuthenticationNumberVerification(authenticationNumber);
    console.log(data);
    data
      ? setAuthenticationNumberVerification(true)
      : setAuthenticationNumberVerification(false);
  };

  const submit = (e) => {
    e.preventDefault();

    if (signup) {
      if (duplicateError) return;
      onSignUp(nickname, loginId, password, email, sex, university, dept, sno)
        .then((data) => {
          console.log(data);
          if (data === 'true') {
            console.log('true');
            setSignup(false);
            setloginId('');
            setPassword('');
          }
        })
        .catch(console.log);
    } else {
      console.log(loginId, password);
      onLogin(loginId, password).catch(console.log);
    }
    console.log(1);
  };

  return (
    <section className={styles.container}>
      <form className={styles.authForm} onSubmit={submit}>
        <h2 className={styles.authTitle}>Node Server</h2>
        <div className={styles.authForm__itemList}>
          <div className={styles.authForm__item}>
            <TextField
              name='loginId'
              required
              error={loginIdError || duplicateError}
              helperText={
                duplicateError
                  ? '아이디가 중복 되었습니다.'
                  : loginIdError
                  ? '아이디나 비밀번호가 일치하지 않습니다.'
                  : ''
              }
              id='standard-required'
              label='아이디'
              variant='standard'
              value={loginId}
              onChange={onChange}
              type='text'
              fullWidth
            />
          </div>
          <div className={styles.authForm__item}>
            <TextField
              id='standard-password-input'
              name='password'
              value={password}
              label='비밀번호'
              onChange={onChange}
              variant='standard'
              type='password'
              fullWidth
              required
            />
          </div>

          {signup && (
            <div className={styles.authForm__item}>
              <TextField
                name='passwordVerification'
                required
                error={passwordVerificationError}
                helperText={
                  passwordVerificationError
                    ? '비밀번호가 일치하지 않습니다.'
                    : ''
                }
                label='비밀번호확인'
                variant='standard'
                value={passwordVerification}
                onChange={onChange}
                fullWidth
              />
            </div>
          )}
          {signup && (
            <div className={styles.authForm__item}>
              <TextField
                name='nickname'
                required
                label='닉네임'
                variant='standard'
                value={nickname}
                onChange={onChange}
                fullWidth
              />
            </div>
          )}
          {signup && (
            <div className={styles.authForm__emailGroup}>
              <div className={styles.emailGroup__top}>
                <TextField
                  name='email'
                  required
                  label='이메일'
                  type='email'
                  variant='standard'
                  value={email}
                  onChange={onChange}
                  fullWidth
                />
                <button
                  type='button'
                  className={styles.emailBtn}
                  disabled={!emailVerification}
                  onClick={onAuthenticationAtivate}
                >
                  인증번호
                </button>
              </div>
            </div>
          )}
          {signup && authenicationAtivation && (
            <div className={styles.authForm__emailGroup}>
              <div className={styles.emailGroup__top}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CheckIcon
                          color={
                            authenticationNumberVerification ? 'success' : ''
                          }
                        />
                      </InputAdornment>
                    ),
                  }}
                  error={!authenticationNumberVerification}
                  id='standard-number-input'
                  name='authenticationNumber'
                  value={authenticationNumber}
                  label='인증번호'
                  onChange={onChange}
                  variant='standard'
                  type='text'
                  fullWidth
                  required
                />
                <button
                  type='button'
                  className={styles.emailBtn}
                  disabled={!authenticationNumber}
                  onClick={onAuthenticationNumberVerification1}
                >
                  확인
                </button>
              </div>
            </div>
          )}
          {signup && (
            <div className={styles.authForm__item}>
              <InputLabel id='university'>대학교</InputLabel>
              <Select
                labelId='university'
                name='university'
                value={university}
                onChange={onChange}
                fullWidth
                variant='standard'
              >
                <MenuItem value='한신대'>한신대</MenuItem>
              </Select>
            </div>
          )}
          {signup && (
            <div className={styles.authForm__item}>
              <TextField
                name='dept'
                required
                label='학과'
                type='text'
                variant='standard'
                value={dept}
                onChange={onChange}
                fullWidth
              />
            </div>
          )}
          {signup && (
            <div className={styles.sno_gender}>
              <div className={styles.authForm__item}>
                <InputLabel id='sno'>학번</InputLabel>
                <Select
                  labelId='sno'
                  name='sno'
                  value={sno}
                  onChange={onChange}
                  fullWidth
                  variant='standard'
                >
                  <MenuItem value='17'>17</MenuItem>
                  <MenuItem value='18'>18</MenuItem>
                  <MenuItem value='19'>19</MenuItem>
                  <MenuItem value='20'>20</MenuItem>
                  <MenuItem value='21'>21</MenuItem>
                  <MenuItem value='22'>22</MenuItem>
                  <MenuItem value='23'>23</MenuItem>
                </Select>
              </div>
              <div className={styles.gender__container}>
                <FormLabel id='demo-controlled-radio-buttons-group'>
                  성별
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='demo-controlled-radio-buttons-group'
                  name='sex'
                  value={sex}
                  onChange={onChange}
                >
                  <div className={styles.groupItems}>
                    <FormControlLabel
                      value='FEMALE'
                      control={<Radio />}
                      label='Female'
                    />
                    <FormControlLabel
                      value='MALE'
                      control={<Radio />}
                      label='Male'
                    />
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </div>
        <div className={styles.form_signup}>
          <input
            name='signup'
            id='signup'
            type='checkbox'
            onChange={onChange}
            checked={signup}
          />
          <label htmlFor='signup'> Create a new account?</label>
        </div>
        <button className={styles.auth_btn} type='submit'>
          {signup ? '회원가입' : '로그인'}
        </button>
      </form>
    </section>
  );
};

export default Login;
