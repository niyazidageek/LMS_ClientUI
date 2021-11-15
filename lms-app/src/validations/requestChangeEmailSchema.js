import * as Yup from 'yup';

const requestChangeEmailSchema = Yup.object().shape(
    {

        email: Yup.string()
            .email('Invalid email address!')
            .required('Required!'),
    }
);

export default requestChangeEmailSchema;