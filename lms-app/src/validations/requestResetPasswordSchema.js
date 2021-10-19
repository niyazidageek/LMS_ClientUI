import * as Yup from 'yup';

const requestResetPasswordSchema = Yup.object().shape(
    {

        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
    }
);

export default requestResetPasswordSchema;