import * as Yup from 'yup';

const signInSchema = Yup.object().shape(
    {

        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),

        password: Yup.string()
            .required('No password provided')
            .min(7, 'Password is too short - should be 7 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    }
);

export default signInSchema;