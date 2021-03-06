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
import { Button } from '@mui/material';

const Login = ({ onSignUp, onLogin, idDuplicateVerification }) => {
  const [signup, setSignup] = useState(false);
  const [nickname, setNickname] = useState('');

  const [loginId, setLoginId] = useState('');
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
  const [emailVerification, setEmailVerification] = useState(false);
  const [dept, setDept] = useState('');
  const [sno, setSno] = useState('17');
  const [isAlert, setIsAlert] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;

    switch (name) {
      case 'nickname':
        return setNickname(value);
      case 'loginId':
        if (signup) {
          idDuplicateVerification(value).then((data) => console.log(data));
        }
        return setLoginId(value);
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
        return setEmail(value);
      case 'university':
        return setUniversity(value);
      case 'dept':
        return setDept(value);
      case 'sno':
        return setSno(value);
      case 'signup':
        setLoginId('');
        setPassword('');
        return setSignup(checked);
      default:
    }
  };

  const submit = (e) => {
    e.preventDefault();

    console.log(1);
  };

  return (
    <section className={styles.container}>
      <form className={styles.authForm} onSubmit={submit}>
        <h2 className={styles.authTitle}>???????????????</h2>
        <div className={styles.authForm__item}>
          <TextField
            name='loginId'
            required
            error={loginIdError || duplicateError}
            helperText={
              duplicateError
                ? '???????????? ?????? ???????????????.'
                : loginIdError
                ? '???????????? ??????????????? ???????????? ????????????.'
                : ''
            }
            id='standard-required'
            label='?????????'
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
            label='????????????'
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
                passwordVerificationError ? '??????????????? ???????????? ????????????.' : ''
              }
              label='??????????????????'
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
              label='?????????'
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
                label='?????????'
                type='email'
                variant='standard'
                value={email}
                onChange={onChange}
                fullWidth
              />
              <Button variant='contained' disabled={false}>
                Outlined
              </Button>
            </div>
          </div>
        )}
        {signup && (
          <div className={styles.authForm__item}>
            <InputLabel id='university'>?????????</InputLabel>
            <Select
              labelId='university'
              name='university'
              value={university}
              onChange={onChange}
              fullWidth
              variant='standard'
            >
              <MenuItem value='?????????'>?????????</MenuItem>
            </Select>
          </div>
        )}
        {signup && (
          <div className={styles.authForm__item}>
            <TextField
              name='dept'
              required
              label='??????'
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
              <InputLabel id='sno'>??????</InputLabel>
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
                ??????
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
                    value='female'
                    control={<Radio />}
                    label='Female'
                  />
                  <FormControlLabel
                    value='male'
                    control={<Radio />}
                    label='Male'
                  />
                </div>
              </RadioGroup>
            </div>
          </div>
        )}
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
          {signup ? '????????????' : '?????????'}
        </button>
      </form>
    </section>
  );
};

export default Login;
