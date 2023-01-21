import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// material core
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// material icon
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// configs
import { USER_ROLE } from 'configs';

// actions
import { login } from 'actions/auth.action';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  // const [role, setRole] = useState('ADMIN');

  const _onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) setIsNameValid(false);
    else setIsNameValid(true);

    if (!password) setIsPasswordValid(false);
    else setIsPasswordValid(true);

    if (!name || !password) return;
    dispatch(login(name, 'USER', history));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={_onSubmit}>
          <TextField
            error={!isNameValid}
            helperText={!isNameValid ? 'Name must not be empty' : ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="User Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <br />
          <TextField
            error={!isPasswordValid}
            helperText={!isPasswordValid ? 'Password must not be empty' : ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}

          />
          {/* <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
            <Select
              fullWidth
              value={role}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) => setRole(e.target.value as string)}
              label="Role"
            >
              <MenuItem value={USER_ROLE.ADMIN}>Admin</MenuItem>
              <MenuItem value={USER_ROLE.LEAD}>Lead</MenuItem>
              <MenuItem value={USER_ROLE.GUEST}>Guest</MenuItem>
            </Select>
          </FormControl> */}
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
