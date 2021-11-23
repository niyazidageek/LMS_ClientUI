import * as Yup from "yup";

const gradeSubmissionSchema = Yup.object().shape({
  grade: Yup.number().min(0,"Grade can't be less than 0!").required("Required!")
});

export default gradeSubmissionSchema;